import { create } from 'zustand';

export default create((set, get) => ({
  search: '',
  searching: false,
  setSearch: (search) => set({ search }),
  setSearching: (searching) => set({ searching }),

  hovered: { item: null, type: null },
  setHovered: (hovered, type) => {
    const { isCameraMoving, isCameraRotating } = get();
    if (isCameraMoving || isCameraRotating) return;

    set({ hovered: { item: hovered, type: type } });
  },

  group: null,
  setGroup: (group) => set({ group }),

  isCameraMoving: false,
  setIsCameraMoving: (isCameraMoving) => set({ isCameraMoving }),
  isCameraRotating: false,
  setIsCameraRotating: (isCameraRotating) => set({ isCameraRotating }),
}));
