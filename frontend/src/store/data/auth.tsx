import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthType {
  isConnected: boolean;
  token: string | null;
  email: string | null;
  name: string | null;

  setToken: (value: string) => void;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  connect: () => void;
  disconnect: () => void;
}

export const useAuth = create<AuthType>()(
  persist(
    (set) => ({
      token: "",
      email: "",
      name: "",
      isConnected: false,

      setToken: (value) => set({ token: value }),
      setEmail: (value) => set({ email: value }),
      setName: (value) => set({ name: value }),
      connect: () => set({ isConnected: true }),
      disconnect: () => set({ isConnected: false }),
    }),
    {
      name: "authcallback-localstorage",
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        name: state.name,
        isConnected: state.isConnected,
      }),
    },
  ),
);
