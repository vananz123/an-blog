import { useMutation } from "@tanstack/react-query";
import { loginApiRequest, loginGoogleApiRequest, logoutApiRequest, signUpApiRequest } from "./api";
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
export function useLoginGoogle() {
  return useMutation({
    mutationFn: loginGoogleApiRequest,
  });
}
export function useLogout() {
  return useMutation({
    mutationFn: logoutApiRequest,
  });
}
