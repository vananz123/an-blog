import { create } from "zustand";
import { persist } from "zustand/middleware";


import { AuthStore } from "./type";
import { setAuthToLS } from "@/lib/auth";
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoaded: false,
      accessToken: "",
      refreshToken: "",
      clientId:"",
      maxSubmited: false,
      setUserInfo:(user) =>{
       // setAuthToLS("userInfo", user);
        set((state) => ({ ...state, userInfo: user }))
      },
      setAccessToken: (accessToken) =>{
      //  setAuthToLS("accessToken", accessToken);
        set((state) => ({ ...state, accessToken: accessToken }))
      },
      setRefreshToken: (refreshToken) =>{
      //  setAuthToLS("refreshToken", refreshToken);
        set((state) => ({ ...state, refreshToken: refreshToken }))
      },
      setClientId: (clientId) =>{
      //  setAuthToLS("clientId",clientId);
        set((state) => ({ ...state, clientId: clientId }))
      },
      clearAuth: () =>
        set((state) => ({
          ...state,
          accessToken: "",
          refreshToken: "",
          clientId:"",
          userInfo:undefined
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
