import { useQuery } from "@tanstack/react-query";
import { GetPostsForMeRequest } from "./type";
import { getPostsRequest, getPostBookmarksRequest, getProfileBuSlugRequest, getAuthorsRequest } from "./api";

export function useProfileBySlug(slug: string , userId?:string) {
  return useQuery({
    queryKey: ["profile-by-slug", slug, userId],
    queryFn: () =>
      getProfileBuSlugRequest(slug , userId).then((e) => {
        return e.data;
      }),
      enabled:!!slug
  });
}

export function usePostsForMe(query: GetPostsForMeRequest) {
  return useQuery({
    queryKey: ["posts-for-me", query],
    queryFn: () =>
      getPostsRequest(query).then((e) => {
        return e.data;
      }),
      enabled:query.userId != ""
  });
}
export function usePostBookmarkForMe(query: GetPostsForMeRequest) {
  return useQuery({
    queryKey: ["post-bookmark-for-me", query],
    queryFn: () =>
      getPostBookmarksRequest(query).then((e) => {
        return e.data;
      }),
      enabled:query.userId != ""
  });
}
export function useGetAuthors(query: {userId?:string,limit?:number,offset?:number}) {
  return useQuery({
    queryKey: ["authors", query],
    queryFn: () =>
      getAuthorsRequest(query).then((e) => {
        return e.data;
      })
  });
}