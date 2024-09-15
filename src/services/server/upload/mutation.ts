import { useMutation } from "@tanstack/react-query";
import { uploadImageRequest } from "./api";
export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImageRequest,
  });
}
