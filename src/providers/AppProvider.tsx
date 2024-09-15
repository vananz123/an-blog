"use client";

import { localStorageEventTarget } from "@/lib/auth";
import useAuthStore from "@/services/client/useAuthStore";
import { useEffect } from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { clearAuth } = useAuthStore();

  useEffect(() => {
    localStorageEventTarget.addEventListener("clearLS", clearAuth);

    return () => {
      localStorageEventTarget.removeEventListener("clearLS", clearAuth);
    };
  }, [clearAuth]);
  return <>{children}</>;
};

export default AppProvider;
