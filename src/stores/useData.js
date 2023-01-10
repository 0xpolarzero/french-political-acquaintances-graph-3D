import { create } from 'zustand';
import axios from 'axios';

const DATA_URL =
  'https://www.data.gouv.fr/fr/datasets/r/092bd7bb-1543-405b-b53c-932ebb49bb8e';
const IMAGES_BASE_URL = '/asset/images';

export default create((set) => ({
  data: [],
  setData: async () => {
    const result = await axios(DATA_URL);
    const csvData = result.data;
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    const formattedData = rows.slice(1).map((row) => {
      const values = row.split(',');
      const el = headers.reduce((object, header, index) => {
        return {
          ...object,
          [header]: values[index],
          image: `${IMAGES_BASE_URL}/deputes/depute_${values[0].replace(
            'PA',
            '',
          )}_webp.webp`,
        };
      }, {});
      return el;
    });

    set({ data: formattedData });
  },
}));
