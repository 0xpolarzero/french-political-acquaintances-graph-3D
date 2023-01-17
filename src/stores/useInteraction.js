import { create } from 'zustand';

export default create((set, get) => ({
  // Search
  search: '',
  searching: false,
  setSearch: (search) => set({ search }),
  setSearching: (searching) => set({ searching }),
  onSearch: (search) => {},

  // Hovered
  hovered: { item: null, type: null },
  setHovered: (e, hovered, type) => {
    const { isCameraMoving, isCameraRotating, group } = get();
    e.stopPropagation();

    if (isCameraMoving || isCameraRotating) return;

    set({ hovered: { item: hovered, type: type } });
  },

  // Group
  group: null,
  setGroup: (group) => set({ group }),

  // Camera
  isCameraMoving: false,
  setIsCameraMoving: (isCameraMoving) => set({ isCameraMoving }),
  isCameraRotating: false,
  setIsCameraRotating: (isCameraRotating) => set({ isCameraRotating }),
}));
