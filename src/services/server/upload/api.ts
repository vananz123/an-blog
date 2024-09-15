import http from "@/lib/axios";
import SuccessResponse from "@/types/success.response.type";
export const uploadImageRequest = (image: any) => {
  const data = new FormData();
  data.append("file", image);
  return http
    .post<SuccessResponse<{ url: string }>>("/v1/api/upload/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      return data.data;
    });
};
