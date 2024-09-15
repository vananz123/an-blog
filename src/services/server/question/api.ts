import http from "@/lib/axios";
import { AuthResponse } from "../auth/type";
import SuccessResponse from "@/types/success.response.type";
import { SignUpType } from "@/types/sign-up.type";
export const signUpApiRequest = (user: SignUpType) => {
  return http.post<AuthResponse>("/v1/api/user/signup", user);
};
export const newQuestionApi = ({
  userId,
  content,
}: {
  userId: string;
  content: string;
}) => {
  return http.post<AuthResponse>("/v1/api/question", {
    userId,
    content,
  });
};

export const getQuestionApi = () => {
  return http.get<SuccessResponse<string>>("/v1/api/question");
};

