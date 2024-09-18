import { useQuery } from "@tanstack/react-query";
import { GetPostsByUserSlugRequest } from "./type";
import {getPostsByUserSlugRequest} from "./api";


export function usePostsByUserSlug(query: GetPostsByUserSlugRequest) {
  return useQuery({
    queryKey: ["posts-for-me", query],
    queryFn: () =>
      getPostsByUserSlugRequest(query).then((e) => {
        return e.data;
      }),
      enabled:!!query.slug 
  });
}