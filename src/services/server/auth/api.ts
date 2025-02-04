import http from "@/lib/axios";
import { AuthResponse } from "./type";
import SuccessResponse from "@/types/success.response.type";
import { SignUpType } from "@/types/sign-up.type";
export const signUpApiRequest = (user: SignUpType) => {
  return http.post<AuthResponse>("/v1/api/user/signup", user);
};
export const loginApiRequest =async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => { 
  return await http.post<AuthResponse>("/v1/api/user/login", {
    email,
    password,
  });
};
export const loginGoogleApiRequest = async (credential:string) => { 
  return await http.post<AuthResponse>("/v1/api/user/login-google", {
    credential:credential
  });
};
export const getProfileApiRequest = () => {
  return http.get<SuccessResponse<string>>("/v1/user/profile");
};

export const logoutApiRequest = () => {
  return http.post("/v1/api/user/logout");
};
