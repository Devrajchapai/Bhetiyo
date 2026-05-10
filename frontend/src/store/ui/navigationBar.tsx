import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { NavigationBarType } from "@/types/ui/components/navigation_bar.ts";

export const useNavigationBar = create<NavigationBarType>()(
  persist(
    (set) => ({
      //variables
      isConnected: false,
      isSigningUp: false,
      currentTab: "",

      //actions
      connect: () => set({ isConnected: true }),
      disconnect: () => set({ isConnected: false }),
      signingUp: () => set((state) => ({ isSigningUp: !state.isSigningUp })),
      changeTab: (newTab) => set({ currentTab: newTab }),
    }),
    {
      name: "navigationBar-storage",
      partialize: (state) => ({
        //only store this values in localStorage
        isConnected: state.isConnected,
        isSigningUp: state.isSigningUp,
        currentTab: state.currentTab,
      }),
    },
  ),
);
