import { create } from "zustand";
import { persist } from "zustand/middleware";
import { injectAuthStore } from "@/api/client";

interface AuthType {
  isConnected: boolean;
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  name: string | null;

  setToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  connect: () => void;
  disconnect: () => void;
}

export const useAuth = create<AuthType>()(
  persist(
    (set, get) => ({
      token: "",
      refreshToken: "",
      email: "",
      name: "",
      isConnected: false,

      setToken: (value) => set({ token: value }),
      setRefreshToken: (value) => set({ refreshToken: value }),
      setEmail: (value) => set({ email: value }),
      setName: (value) => set({ name: value }),
      connect: () => set({ isConnected: true }),
      disconnect: () => set({ isConnected: false }),
    }),
    {
      name: "authcallback-localstorage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        email: state.email,
        name: state.name,
        isConnected: state.isConnected,
      }),
    },
  ),
);

injectAuthStore({
  getAccessToken: () => useAuth.getState().token,
  getRefreshToken: () => useAuth.getState().refreshToken,
  setTokens: (access, refresh) => {
    useAuth.getState().setToken(access);
    useAuth.getState().setRefreshToken(refresh);
  },
  disconnect: () => useAuth.getState().disconnect(),
});
