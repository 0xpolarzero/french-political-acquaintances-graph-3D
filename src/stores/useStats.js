import { create } from 'zustand';

export default create((set) => ({
  compareBase: null,
  compareTarget: null,
  resetCompare: () => set({ compareBase: null, compareTarget: null }),
  setCompareBase: (data) => set({ compareBase: data }),

  onSearch: (value, data, at) => {
    if (data.item.firstName) {
      const newObj = { data: data.item, type: 'individual' };
      at === 'base'
        ? set({ compareBase: newObj })
        : set({ compareTarget: newObj });
    } else {
      const newObj = { data: data.item, type: 'group' };
      at === 'base'
        ? set({ compareBase: newObj })
        : set({ compareTarget: newObj });
    }
  },
  onClear: (at) => {
    at === 'base' ? set({ compareBase: null }) : set({ compareTarget: null });
  },
}));
