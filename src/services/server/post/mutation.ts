import { useMutation } from "@tanstack/react-query";
import {
  deleteBlogRequest,
  deleteQuestionRequest,
  heartBlogRequest,
  heartQuestionRequest,
  newBlogRequest,
  newQuestionRequest,
  updateBlogRequest,
  updateQuestionRequest,
} from "./api";
export function useNewBlog() {
  return useMutation({
    mutationFn: newBlogRequest,
  });
}
export function useUpdateBlog() {
  return useMutation({
    mutationFn: updateBlogRequest,
  });
}
export function useDeleteBlog() {
  return useMutation({
    mutationFn: deleteBlogRequest,
  });
}
export function useHeartBlog() {
  return useMutation({
    mutationFn: heartBlogRequest,
  });
}
export function useHeartQuestion() {
  return useMutation({
    mutationFn: heartQuestionRequest,
  });
}
//question
export function useNewQuestion() {
  return useMutation({
    mutationFn: newQuestionRequest,
  });
}
export function useUpdateQuestion() {
  return useMutation({
    mutationFn: updateQuestionRequest,
  });
}
export function useDeleteQuestion() {
  return useMutation({
    mutationFn: deleteQuestionRequest,
  });
}
