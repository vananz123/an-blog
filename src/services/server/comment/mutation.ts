import { useMutation } from "@tanstack/react-query";
import { newCommentRequest , deleteComment, updateCommentRequest } from "./api";
export function useNewComment(){
  return useMutation({
    mutationFn:newCommentRequest,
  })
}
export function useUpdateComment(){
  return useMutation({
    mutationFn:updateCommentRequest,
  })
}
export function useDeleteComment(){
  return useMutation({
    mutationFn:deleteComment,
  })
}