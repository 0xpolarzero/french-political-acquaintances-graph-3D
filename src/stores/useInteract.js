import { create } from 'zustand';

export default create((set) => ({
  search: '',
  searching: false,
  setSearch: (search) => set({ search }),
  setSearching: (searching) => set({ searching }),

  hovered: null,
  setHovered: (hovered) => set({ hovered }),
}));
