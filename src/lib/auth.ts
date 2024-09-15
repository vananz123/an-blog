import { UserInfo } from "@/services/client/type";

export const localStorageEventTarget = new EventTarget();

export function getAuthFromLS() {
  const defaultToken = { accessToken: "", refreshToken: "", clientId: "" };

  if (typeof window === "undefined") {
    return defaultToken;
  }
  
  const store = localStorage.getItem("auth-store");
  if (!store) {
    return defaultToken;
  }

  const parsedStore = JSON.parse(store);
  return {
    accessToken: parsedStore.state.accessToken as string,
    refreshToken: parsedStore.state.refreshToken as string,
    clientId: parsedStore.state.clientId as string,
  };
}
type AuthType = "accessToken" | "refreshToken" | "clientId" | "userInfo";
export function setAuthToLS(authType: AuthType, auth: string | UserInfo) {
  if (typeof window === "undefined") {
    return;
  }

  const store = localStorage.getItem("auth-store");
  if (!store) {
    return;
  }
  const parsedStore = JSON.parse(store);
  parsedStore.state[authType] = auth;
  localStorage.setItem("auth-store", JSON.stringify(parsedStore));
}

export function removeAuthFromLS() {
  if (typeof window === "undefined") {
    return;
  }

  const store = localStorage.getItem("auth-store");
  if (!store) {
    return;
  }

  const parsedStore = JSON.parse(store);
  parsedStore.state.accessToken = "";
  parsedStore.state.refreshToken = "";
  parsedStore.state.clientId = "";
  localStorage.setItem("auth-store", JSON.stringify(parsedStore));
  const clearLSEvent = new Event("clearLS");
  localStorageEventTarget.dispatchEvent(clearLSEvent);
}
