import { create } from 'zustand';

export default create((set) => ({
  isInterfaceVisible: false,
  setIsInterfaceVisible: (value) => set(() => ({ isInterfaceVisible: value })),
}));
