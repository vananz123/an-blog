import { useQuery } from "@tanstack/react-query";
import { GetCommentBlog } from "./type";
import { getCommentByBlogId } from "./api";

export function useGetCommentBlog(query: GetCommentBlog) {
    return useQuery({
      queryKey: ["comment-blog", query],
      queryFn: () =>
        getCommentByBlogId(query).then((e) => {
          return e.data;
        }),
    });
  }