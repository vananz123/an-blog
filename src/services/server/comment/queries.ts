import { useQuery } from "@tanstack/react-query";
import { GetCommentBlog } from "./type";
import { getComment } from "./api";

export function useGetComment(query: GetCommentBlog) {
    return useQuery({
      queryKey: ["comment-blog", query],
      queryFn: () =>
        getComment(query).then((e) => {
          return e.data;
        }),
    });
  }