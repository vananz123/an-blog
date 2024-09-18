import http from "@/lib/axios";
import { AuthResponse, GetPostsByUserSlugRequest } from "./type";
import SuccessResponse, { Pagination } from "@/types/success.response.type";
import { BlogResult, QuestionResulf } from "../post/type";
import { User } from "../auth/type";

export const getProfileBuSlugRequest = (slug: string, userId?: string) => {
  const params = {
    userId: userId,
  };
  return http.get<SuccessResponse<User>>(`/v1/api/profile/${slug}`, {
    params: params,
  });
};
export const getPostsByUserSlugRequest = async ({
  slug,
  search,
  postType,
  limit = 10,
  offset = 1,
}: GetPostsByUserSlugRequest) => {
  const params = {
    search:search,
    postType: postType,
    limit: limit,
    offset: offset,
  };
  if (postType && postType == "question") {
    return await http.get<SuccessResponse<Pagination<QuestionResulf>>>(
      `/v1/api/profile/${slug}/posts`,
      {
        params: params,
      }
    );
  }
  return await http.get<SuccessResponse<Pagination<BlogResult>>>(`/v1/api/profile/${slug}/posts`, {
    params: params,
  });
};