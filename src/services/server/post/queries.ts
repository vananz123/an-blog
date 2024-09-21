import { useQuery } from "@tanstack/react-query";
import { getAllBlogRequest, getBlogBySlugRequest  ,getBlogByIdRequest, getAllQuestionRequest, getQuestionBySlugRequest, getQuestionByIdRequest} from "./api";
import { GetBlog } from "./type";

export function useGetQuestion(query: GetBlog) {
  return useQuery({
    queryKey: ["list-question", query],
    queryFn: () =>
      getAllQuestionRequest(query).then((e) => {
        return e.data;
      }),
  });
}
export function useGetQuestionBySlug(slug: string, userId?:string) {
  return useQuery({
    queryKey: ["question", slug, userId],
    queryFn: () =>
      getQuestionBySlugRequest(slug,userId).then((e) => {
        return e.data;
      }),
      enabled:!!slug
  });
}
export function useGetQuestionById(id: string) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () =>
      getQuestionByIdRequest(id).then((e) => {
        return e.data;
      }),
      enabled:!!id
  });
}
export function useGetBlog(query: GetBlog) {
  return useQuery({
    queryKey: ["list-post", query],
    queryFn: () =>
      getAllBlogRequest(query).then((e) => {
        return e.data;
      }),
  });
}
export function useGetBlogBySlug(slug: string ,userId?:string) {
  return useQuery({
    queryKey: ["post", slug,userId],
    queryFn: () =>
      getBlogBySlugRequest(slug, userId).then((e) => {
        return e.data;
      }),
      enabled:!!slug
  });
}
export function useGetBlogById(id: string) {
  return useQuery({
    queryKey: ["post-edit", id],
    queryFn: () =>
      getBlogByIdRequest(id).then((e) => {
        return e.data;
      }),
      enabled:!!id
  });
}
