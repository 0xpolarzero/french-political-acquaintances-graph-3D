import { create } from 'zustand';
import axios from 'axios';
import { parse } from 'papaparse';
import { dataUrls, dataConfig } from 'src/data-config';
import { getAverage, getGroupPower } from 'src/systems';
import { getGlobalAverage } from 'src/systems/stats';

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

    // For each group, add the members
    const associatedData = data.groups.map((group) => {
      const members = data.deputees.filter(
        (d) => d.groupShort === group.shortName,
      );
      return {
        ...group,
        data: members,
      };
    });

    // Get the power stats for each group
    const stats = getStats(associatedData);
    // Add the power stats to the groups
    associatedData.forEach((group) => {
      group.stats = {
        average: {
          ...stats.averages[group.shortName],
          power: stats.powers[group.shortName],
        },
        global: stats.globalAverages,
      };
    });

    set({ organizedData: associatedData });
  },

  // Stats
  getStats: (groups) => {
    // Calculate the average stats for some data
    const averages = getAverage(groups);
    const powers = getGroupPower(groups, averages);
    const globalAverages = getGlobalAverage(averages, powers);

    return {
      averages,
      powers,
      globalAverages,
    };
  },
}));
