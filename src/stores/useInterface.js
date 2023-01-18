import { create } from 'zustand';

export default create((set) => ({
  isOverlayVisible: true,
  setIsOverlayVisible: (value) => set(() => ({ isOverlayVisible: value })),

  // Stats drawer
  drawer: {
    isOpen: false,
    data: null,
    type: null,
  },
  setDrawer: (e, data, type) => {
    if (e) e.stopPropagation();
    set(() => ({ drawer: { isOpen: true, data, type } }));
  },
  closeDrawer: () =>
    set(() => ({ drawer: { isOpen: false, data: null, type: null } })),
}));
