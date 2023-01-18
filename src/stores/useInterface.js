import { create } from 'zustand';

export default create((set) => ({
  isInterfaceVisible: true,
  setIsInterfaceVisible: (value) => set(() => ({ isInterfaceVisible: value })),
}));
