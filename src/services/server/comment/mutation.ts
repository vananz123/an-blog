import { useMutation } from "@tanstack/react-query";
import { newCommentForBlogRequest , deleteComment, updateCommentForBlogRequest } from "./api";
export function useNewCommentBlog(){
  return useMutation({
    mutationFn:newCommentForBlogRequest,
  })
}
export function useUpdateCommentBlog(){
  return useMutation({
    mutationFn:updateCommentForBlogRequest,
  })
}
export function useDeleteCommentBlog(){
  return useMutation({
    mutationFn:deleteComment,
  })
}