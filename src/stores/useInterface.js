import { create } from 'zustand';

export default create((set) => ({
  isOverlayVisible: true,
  setIsOverlayVisible: (value) => set(() => ({ isOverlayVisible: value })),
}));
