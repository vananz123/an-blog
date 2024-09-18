import http from "@/lib/axios";
import { AuthResponse, GetPostsForMeRequest } from "./type";
import SuccessResponse, { Pagination } from "@/types/success.response.type";
import { BlogResult, QuestionResulf } from "../post/type";
import { User } from "../auth/type";

export const bookmartBlogRequest = ({
  userId,
  blogId,
}: {
  userId: string;
  blogId: string;
}) => {
  return http.post<SuccessResponse<any>>("/v1/api/me/blog/bookmark", {
    userId,
    blogId,
  });
};
export const followRequest = async ({
  userId,
  userIdFollow,
}: {
  userId: string;
  userIdFollow: string;
}) => {
  return await http.post<SuccessResponse<BlogResult[]>>(`/v1/api/me/follow`, {
    userId,
    userIdFollow,
  });
};
export const updateProfileApiRequest = ({
  userId,
  payload,
}: {
  userId: string;
  payload: any;
}) => {
  return http.patch<SuccessResponse<string>>("/v1/api/profile/update-own",{
    userId:userId,
    payload:payload
  });
};
export const getProfileApiRequest = () => {
  return http.get<SuccessResponse<string>>("/v1/user/profile");
};
export const getProfileBuSlugRequest = (slug: string, userId?: string) => {
  const params = {
    userId: userId,
  };
  return http.get<SuccessResponse<User>>(`/v1/api/profile/${slug}`, {
    params: params,
  });
};
export const getPostsRequest = async ({
  userId,
  postType,
  limit = 10,
  offset = 1,
}: GetPostsForMeRequest) => {
  const params = {
    userId: userId,
    postType: postType,
    limit: limit,
    offset: offset,
  };
  if (postType && postType == "question") {
    return await http.get<SuccessResponse<Pagination<QuestionResulf>>>(
      `/v1/api/me/posts`,
      {
        params: params,
      }
    );
  }
  return await http.get<SuccessResponse<Pagination<BlogResult>>>(`/v1/api/me/posts`, {
    params: params,
  });
};

export const getPostBookmarksRequest = async ({
  userId,
  postType,
  limit = 10,
  offset = 1,
}: GetPostsForMeRequest) => {
  const params = {
    userId: userId,
    postType: postType,
    limit: limit,
    offset: offset,
  };
  if (postType && postType == "question") {
    return await http.get<SuccessResponse<Pagination<QuestionResulf>>>(
      `/v1/api/me/post/bookmarks`,
      {
        params: params,
      }
    );
  }
  return await http.get<SuccessResponse<Pagination<BlogResult>>>(
    `/v1/api/me/post/bookmarks`,
    {
      params: params,
    }
  );
};

export const getAuthorsRequest = async ({
  userId,
  search,
  limit = 10,
  offset = 1,
}: {search?:String; userId?:string,limit?:number,offset?:number}) => {
  const params = {
    userId: userId,
    search:search,
    limit: limit,
    offset: offset,
  };
  return await http.get<SuccessResponse<Pagination<User>>>(
    `/v1/api/author`,
    {
      params: params,
    }
  );
};

