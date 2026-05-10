import { create } from "zustand";

export const useNavigationBar = create((set, get) => ({
  isConnected: false,
  isSigningUp: false,
  currentTab: "",

  // set functions
  connect: () => set({ isConnected: true }),
  disconnect: () => set({ isConnected: false }),
  signingUp: () => set((state) => ({ isSigningUp: !state.isSigningUp })),
  changeTab: (newTab) => set({ currentTab: newTab }),
}));
