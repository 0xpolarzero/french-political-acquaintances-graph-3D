import { create } from 'zustand';
import axios from 'axios';
import { parse } from 'papaparse';
import { dataUrls, dataConfig } from '../data-config';

const { deputees: DATA_DEPUTEES_URL, groups: DATA_GROUPS_URL } = dataUrls;
const mappingIndividuals = dataConfig.categories.individuals;
const mappingGroups = dataConfig.categories.groups;

const IMAGES_BASE_URL = '/asset/images';

export default create((set, get) => ({
  data: { deputees: [], groups: [] },
  organizedData: [],
  loaded: false,
  error: false,

  // Set all the data
  setData: async () => {
    const { setDataDeputees, setDataGroups, organizeData } = get();
    try {
      await setDataGroups();
      await setDataDeputees();
      organizeData();
      set({ loaded: true });
    } catch (err) {
      set({ error: true });
    }
  },

  // Global data
  setDataDeputees: async () => {
    const { data } = get();
    const result = await axios(DATA_DEPUTEES_URL);
    const csvData = result.data;

    const parsedData = parse(csvData, { header: true });
    const headers = parsedData.meta.fields;
    const formattedData = parsedData.data.map((row) => {
      const group = data.groups.find((g) => g.shortName === row['groupeAbrev']);

      const el = headers.reduce((object, header, index) => {
        const newKey = mappingIndividuals[header] || header;

        return {
          ...object,
          [newKey]: row[header],
          maj: group?.politicalPosition === 'Majoritaire',
          color: group?.associatedColor,
          image: `${IMAGES_BASE_URL}/deputes/depute_${row['id'].replace(
            'PA',
            '',
          )}_webp.webp`,
        };
      }, {});

      if (el.id) return el;
      return null;
    });

    // Check if there is any null value
    const filteredData = formattedData.filter((d) => d !== null);

    set({ data: { ...data, deputees: filteredData } });
  },

  setDataGroups: async () => {
    const { data } = get();
    const result = await axios(DATA_GROUPS_URL);
    const csvData = result.data;

    const parsedData = parse(csvData, { header: true });
    const headers = parsedData.meta.fields;

    const formattedData = parsedData.data.map((row) => {
      const el = headers.reduce((object, header, index) => {
        const newKey = mappingGroups[header] || header;

        return {
          ...object,
          [newKey]: row[header],
        };
      }, {});

      if (el.id) return el;
      return null;
    });

    // Check if there is any null value
    const filteredData = formattedData.filter((d) => d !== null);

    set({ data: { ...data, groups: filteredData } });
  },

  // Gather data and create groups
  organizeData: () => {
    const { data, getStats } = get();
    let groups = data.groups;

    // For each group, add the members
    groups = groups.map((group) => {
      const members = data.deputees.filter(
        (d) => d.groupShort === group.shortName,
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
      group.stats = {
        ...powerStats[group.shortName],
        quantity: group.data.length,
      };
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
        if (isNaN(Number(g.participationScore))) {
          missingData++;
          return;
        }

        totalParticipation += Number(g.participationScore);
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
          if (isNaN(Number(d.participationScore))) {
            // If it's not a number, set it to the average participation
            missingData++;
            groupPower += averageParticipation;
          } else {
            // Otherwise, add it to the group power
            groupPower += Number(d.participationScore);
          }
        });

        stats[group.shortName] = {
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
