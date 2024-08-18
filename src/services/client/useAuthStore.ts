import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthStore } from "./type";
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoaded: false,
      accessToken: "",
      refreshToken: "",
      clientId:"",
      maxSubmited: false,
      setAccessToken: (accessToken) =>
        set((state) => ({ ...state, accessToken: accessToken })),
      setRefreshToken: (refreshToken) =>
        set((state) => ({ ...state, refreshToken: refreshToken })),
      setClientId: (clientId) =>
        set((state) => ({ ...state, clientId: clientId })),
      clearAuth: () =>
        set((state) => ({
          ...state,
          accessToken: "",
          refreshToken: "",
          clientId:"",
        })),
      setLoaded: () =>
        set((state) => ({
          ...state,
          isLoaded: true,
        })),
      setMaxSubmited: () =>
        set((state) => ({
          ...state,
          maxSubmited: true,
        })),
    }),
    {
      name: "auth-store",
      onRehydrateStorage: () => (state) => state?.setLoaded(),
    }
  )
);
export default useAuthStore;
