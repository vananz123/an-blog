export type AuthStore = {
  isLoaded: boolean;
  accessToken: string;
  refreshToken: string;
  clientId: string;
  maxSubmited: boolean;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setClientId:(clientId:string) => void;
  clearAuth: () => void;
  setLoaded: () => void;
  setMaxSubmited: () => void;
};
