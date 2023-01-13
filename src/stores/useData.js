import { create } from 'zustand';
import axios from 'axios';
import { parse } from 'papaparse';

const DATA_URL =
  'https://www.data.gouv.fr/fr/datasets/r/092bd7bb-1543-405b-b53c-932ebb49bb8e';
const IMAGES_BASE_URL = '/asset/images';

const GROUPS_INFO = {
  Renaissance: {
    symbol: 'RE',
    maj: true,
    color: '#5D478B',
  },
  'Rassemblement National': {
    symbol: 'RN',
    maj: false,
    color: '#38475B',
  },
  'La France insoumise - Nouvelle Union Populaire écologique et sociale': {
    symbol: 'LFI-NUPES',
    maj: false,
    color: '#CB3826',
  },
  'Les Républicains': {
    symbol: 'LR',
    maj: false,
    color: '#4B63A6',
  },
  'Démocrate (MoDem et Indépendants)': {
    symbol: 'DEM',
    maj: true,
    color: '#BD592A',
  },
  'Socialistes et apparentés (membre de l’intergroupe NUPES)': {
    symbol: 'SOC',
    maj: false,
    color: '#C92B42',
  },
  'Horizons et apparentés': {
    symbol: 'HOR',
    maj: true,
    color: '#5BAFC5',
  },
  'Écologiste - NUPES': {
    symbol: 'ECOLO',
    maj: false,
    color: '#82A95D',
  },
  'Gauche démocrate et républicaine - NUPES': {
    symbol: 'GDR-NUPES',
    maj: false,
    color: '#85231C',
  },
  'Libertés, Indépendants, Outre-mer et Territoires': {
    symbol: 'LIOT',
    maj: false,
    color: '#F0D456',
  },
  'Non inscrit': {
    symbol: 'NI',
    maj: null,
    color: '#FFFFFF',
  },
};

export default create((set, get) => ({
  data: [],
  groups: [],
  loaded: false,

  // Set all the data
  setAll: async () => {
    const { setData, setGroups } = get();
    await setData();
    setGroups();
    set({ loaded: true });
  },

  // Global data
  setData: async () => {
    const result = await axios(DATA_URL);
    const csvData = result.data;

    // const rows = csvData.split('\n');
    // const headers = rows[0].split(',');

    // const formattedData = rows.slice(1).map((row) => {
    //   const values = row.split(',');
    //   const el = headers.reduce((object, header, index) => {
    //     return {
    //       ...object,
    //       [header]: values[index],
    //       image: `${IMAGES_BASE_URL}/deputes/depute_${values[0].replace(
    //         'PA',
    //         '',
    //       )}_webp.webp`,
    //     };
    //   }, {});
    //   return el;
    // });

    const parsedData = parse(csvData, { header: true });
    const headers = parsedData.meta.fields;
    const formattedData = parsedData.data.map((row) => {
      const el = headers.reduce((object, header, index) => {
        return {
          ...object,
          [header]: row[header],
          image: `${IMAGES_BASE_URL}/deputes/depute_${row['id'].replace(
            'PA',
            '',
          )}_webp.webp`,
        };
      }, {});
      return el;
    });
    console.log(formattedData);

    set({ data: formattedData });
  },

  // Groups
  setGroups: () => {
    const { data, getStats } = get();
    let groups = [];

    // Set the groups and the number of items in each group
    data.forEach((d) => {
      if (!groups.includes(d.groupe)) groups.push(d.groupe);
    });

    // Sort the groups by the number of items in each group
    groups.sort((a, b) => {
      const aCount = data.filter((d) => d.groupe === a).length;
      const bCount = data.filter((d) => d.groupe === b).length;
      return bCount - aCount;
    });

    // Remove the undefined group
    const undefinedIndex = groups.indexOf('undefined');
    groups.splice(undefinedIndex, 1);

    // Remove any extra ""  if this is the case e.g. '"Rassemblement National"' -> 'Rassemblement National'
    const formattedGroups = groups.map((group) => {
      if (group[0] === '"') {
        group = group.slice(1);
      }
      if (group[group.length - 1] === '"') {
        group = group.slice(0, group.length - 1);
      }

      return group;
    });

    // For each group, add the related items from data
    const formattedData = groups.map((group, index) => {
      const groupData = data.filter((d) => d.groupe === group);

      return {
        group: formattedGroups[index],
        symbol: GROUPS_INFO[formattedGroups[index]].symbol,
        maj: GROUPS_INFO[formattedGroups[index]].maj,
        color: GROUPS_INFO[formattedGroups[index]].color,
        data: groupData,
      };
    });

    // Get the power stats for each group
    const powerStats = getStats(formattedData);
    // Add the power stats to the groups
    formattedData.forEach((group) => {
      group.stats = powerStats[group.group];
      group.stats.quantity = group.data.length;
    });

    set({ groups: formattedData });
  },

  // Stats
  getStats: (groups) => {
    const { data } = get();

    const getAverageParticipation = () => {
      let missingData = 0;
      let totalParticipation = 0;

      data.forEach((d) => {
        if (isNaN(Number(d.scoreParticipation))) {
          missingData++;
          return;
        }

        totalParticipation += Number(d.scoreParticipation);
      });

      return totalParticipation / (data.length - missingData);
    };

    const getGroupPower = (averageParticipation) => {
      let stats = {};

      // For each group, calculate the power
      groups.forEach((group) => {
        const groupData = group.data;
        let groupPower = 0;
        let missingData = 0;

        groupData.forEach((d) => {
          if (isNaN(Number(d.scoreParticipation))) {
            // If it's not a number, set it to the average participation
            missingData++;
            groupPower += averageParticipation;
          } else {
            // Otherwise, add it to the group power
            groupPower += Number(d.scoreParticipation);
          }
        });

        stats[group.group] = {
          power: {
            value: groupPower,
            missing: missingData,
          },
        };
      });

      // Get all values of power for each group...
      const totalPower = Object.values(stats).reduce((acc, group) => {
        return acc + group.power.value;
      }, 0);

      // ... and set their power percentage based on the total power
      Object.keys(stats).forEach((group) => {
        stats[group].power.percentage = (
          (stats[group].power.value / totalPower) *
          100
        ).toFixed(2);
      });

      return stats;
    };

    // Calculate the average participation for all data
    const averageParticipation = getAverageParticipation();
    // Calculate the power for each group
    const power = getGroupPower(averageParticipation);

    return power;
  },
}));
