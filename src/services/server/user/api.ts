import http from "@/lib/axios";
import { AuthResponse } from "./type";
import SuccessResponse from "@/types/success.response.type";

export const loginApiRequest = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return http.post<AuthResponse>("/v1/api/user/login", {
    email,
    password,
  });
};

export const getProfileApiRequest = () => {
  return http.get<SuccessResponse<string>>("/v1/user/profile");
};

export const logoutApiRequest = () => {
  return http.post("/v1/api/user/logout");
};
