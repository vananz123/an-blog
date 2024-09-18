import http from "@/lib/axios";
import {
  GetBlog,
  NewBlog,
  PostResponse,
  BlogResult,
  NewQuestion,
  QuestionResulf,
} from "./type";
import SuccessResponse, { Pagination } from "@/types/success.response.type";
import { BlogType } from "@/types/blog.type";
import { QuestionType } from "@/types/question.type";
import { QueriesResults } from "@tanstack/react-query";
export const newBlogRequest = ({ payload }: NewBlog) => {
  return http.post<PostResponse>("/v1/api/blog", { payload: payload });
};
export const updateBlogRequest = ({
  userId,
  blogId,
  payload,
}: {
  userId: string;
  blogId: string;
  payload: BlogType;
}) => {
  return http.patch<PostResponse>(
    "/v1/api/blog                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
    {
      userId: userId,
      blogId: blogId,
      payload: payload,
    }
  );
};
export const deleteBlogRequest = ({
  userId,
  blogId,
}: {
  userId: string;
  blogId: string;
}) => {
  const params = {
    userId: userId,
    blogId: blogId,
  };
  return http.delete<SuccessResponse<any>>("/v1/api/blog", { params });
};

export const getAllBlogRequest = ({ search, limit, offset }: GetBlog) => {
  const params = {
    search: search,
    limit: limit,
    offset: offset,
  };
  return http.get<SuccessResponse<Pagination<BlogResult>>>("/v1/api/blog", {
    params,
  });
};
export const getBlogBySlugRequest = (slug: string , userId?:string) => {
  return http.get<SuccessResponse<BlogResult>>(`/v1/api/blog/${slug}`,{params:{userId:userId}});
};
export const getBlogByIdRequest = (id: string) => {
  return http.get<SuccessResponse<BlogResult>>(`/v1/api/blog/get-by-id/${id}`);
};

export const heartBlogRequest = ({
  userId,
  blogId,
}: {
  userId: string;
  blogId: string;
}) => {
  return http.post<SuccessResponse<any>>("/v1/api/blog/heart", {
    userId,
    blogId,
  });
};
//question
export const newQuestionRequest = ({ payload }: NewQuestion) => {
  return http.post<PostResponse>("/v1/api/question", { payload: payload });
};
export const updateQuestionRequest = ({
  userId,
  questionId,
  payload,
}: {
  userId: string;
  questionId: string;
  payload: QuestionType;
}) => {
  return http.patch<PostResponse>(
    "/v1/api/question                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
    {
      userId: userId,
      questionId: questionId,
      payload: payload,
    }
  );
};
export const deleteQuestionRequest = ({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}) => {
  const params = {
    userId: userId,
    questionId: questionId,
  };
  return http.delete<SuccessResponse<any>>("/v1/api/question", { params });
};
export const getAllQuestionRequest = ({ search, limit, offset }: GetBlog) => {
  const params = {
    search: search,
    limit: limit,
    offset: offset,
  };
  return http.get<SuccessResponse<Pagination<QuestionResulf>>>("/v1/api/question", {
    params,
  });
};
export const getQuestionBySlugRequest = (slug: string) => {
  return http.get<SuccessResponse<QuestionResulf>>(`/v1/api/question/${slug}`);
};
export const getQuestionByIdRequest = (id: string) => {
  return http.get<SuccessResponse<QuestionResulf>>(
    `/v1/api/question/get-by-id/${id}`
  );
};
