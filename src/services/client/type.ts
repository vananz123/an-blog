export type UserInfo = {
  _id:string;
  usr_name:string;
  usr_email:string;
  usr_avatar:string;
  usr_slug:string;
}
export type AuthStore = {
  isLoaded: boolean;
  accessToken: string;
  refreshToken: string;
  clientId: string;
  userInfo?:UserInfo;
  maxSubmited: boolean;
  setAccessToken: (accessToken: string) => void;
  setUserInfo:(user:UserInfo)=> void;
  setRefreshToken: (refreshToken: string) => void;
  setClientId:(clientId:string) => void;
  clearAuth: () => void;
  setLoaded: () => void;
  setMaxSubmited: () => void;
};
export type StatePostStore = {
  isLoaded: boolean;
  statePost: string;
  setStatePost: (statePost: string) => void;
  setLoaded: () => void;
};
