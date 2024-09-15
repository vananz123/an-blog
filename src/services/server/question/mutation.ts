import { useMutation } from "@tanstack/react-query";
import { newQuestionApi } from "./api";
export function useSignUp() {
  return useMutation({
    mutationFn: newQuestionApi,
  });
}
