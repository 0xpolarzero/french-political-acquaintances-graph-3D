import { create } from 'zustand';

export default create((set, get) => ({
  search: '',
  searching: false,
  setSearch: (search) => set({ search }),
  setSearching: (searching) => set({ searching }),

  hovered: null,
  setHovered: (hovered) => {
    const { isCameraMoving, isCameraRotating } = get();
    if (isCameraMoving || isCameraRotating) return;

    set({ hovered });
  },

  group: null,
  setGroup: (group) => set({ group }),

  isCameraMoving: false,
  setIsCameraMoving: (isCameraMoving) => set({ isCameraMoving }),
  isCameraRotating: false,
  setIsCameraRotating: (isCameraRotating) => set({ isCameraRotating }),
}));
