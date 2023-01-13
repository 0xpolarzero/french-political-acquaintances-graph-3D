import { create } from 'zustand';
import { isMobile } from 'react-device-detect';

export default create((set) => ({
  highQuality: !isMobile,
  setHighQuality: (highQuality) => set({ highQuality }),
}));
