import { useMutation } from "@tanstack/react-query";
import { followRequest , bookmartBlogRequest, updateProfileApiRequest} from "./api";

export function useFollow() {
  return useMutation({
    mutationFn: followRequest,
  });
}
export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfileApiRequest,
  });
}
export function useBookmarkBlog(){
  return useMutation({
    mutationFn:bookmartBlogRequest,
  })
}