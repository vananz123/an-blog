import { useMutation } from "@tanstack/react-query";
import { loginApiRequest, logoutApiRequest } from "./api";

export function useLogin() {
  return useMutation({
    mutationFn: loginApiRequest,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutApiRequest,
  });
}
