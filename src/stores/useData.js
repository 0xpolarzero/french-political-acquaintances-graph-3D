import { create } from 'zustand';
import axios from 'axios';
import { parse } from 'papaparse';
import GROUPS_INFO from '../systems/data/groups.json';

const DATA_DEPUTEES_URL =
  'https://www.data.gouv.fr/fr/datasets/r/092bd7bb-1543-405b-b53c-932ebb49bb8e';
const DATA_GROUPS_URL =
  'https://www.data.gouv.fr/fr/datasets/r/4612d596-9a78-4ec6-b60c-ccc1ee11f8c0';
const IMAGES_BASE_URL = '/asset/images';

export default create((set, get) => ({
  data: { deputees: [], groups: [] },
  organizedData: [],
  loaded: false,

  // Set all the data
  setData: async () => {
    const { setDataDeputees, setDataGroups, organizeData } = get();
    await setDataDeputees();
    await setDataGroups();
    organizeData();
    set({ loaded: true });
  },

  // Global data
  setDataDeputees: async () => {
    const { data } = get();
    const result = await axios(DATA_DEPUTEES_URL);
    const csvData = result.data;

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

    set({ data: { ...data, deputees: formattedData } });
  },

  setDataGroups: async () => {
    const { data } = get();
    const result = await axios(DATA_GROUPS_URL);
    const csvData = result.data;

    const parsedData = parse(csvData, { header: true });
    const headers = parsedData.meta.fields;
    const formattedData = parsedData.data.map((row) => {
      const el = headers.reduce((object, header, index) => {
        return {
          ...object,
          [header]: row[header],
        };
      }, {});
      return el;
    });

    set({ data: { ...data, groups: formattedData } });
  },

  // Gather data and create groups
  organizeData: () => {
    const { data, getStats } = get();
    let groups = data.groups;

    // For each group, add the members
    groups = groups.map((group) => {
      const members = data.deputees.filter(
        (d) => d.groupeAbrev === group.libelleAbrev,
      );
      return {
        ...group,
        data: members,
      };
    });

    // Get the power stats for each group
    const powerStats = getStats(groups);
    // Add the power stats to the groups
    groups.forEach((group) => {
      group.stats = powerStats[group.group];
      group.stats.quantity = group.data.length;
    });

    set({ organizedData: groups });
  },

  // Stats
  getStats: (groups) => {
    const { data } = get();

    const getAverageParticipation = () => {
      let missingData = 0;
      let totalParticipation = 0;

      groups.forEach((g) => {
        if (isNaN(Number(g.scoreParticipation))) {
          missingData++;
          return;
        }

        totalParticipation += Number(g.scoreParticipation);
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
