import { useMutation } from "@tanstack/react-query";
import { loginApiRequest, logoutApiRequest, signUpApiRequest } from "./api";
export function useSignUp(){
  return useMutation({
    mutationFn:signUpApiRequest,
  })
}
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
