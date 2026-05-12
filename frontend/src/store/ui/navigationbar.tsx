import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NavigationBarType {
  isSigningUp: boolean;
  currentTab: string | null;

  signingUp: () => void;
  changeTab: (newTab: string) => void;
}

export const useNavigationBar = create<NavigationBarType>()(
  persist(
    (set) => ({
      //variables
      isConnected: false,
      isSigningUp: false,
      currentTab: "",

      //actions
      signingUp: () => set((state) => ({ isSigningUp: !state.isSigningUp })),
      changeTab: (newTab) => set({ currentTab: newTab }),
    }),
    {
      name: "navigationbar-sessionstorage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        //only store this values

        currentTab: state.currentTab,
      }),
    },
  ),
);
