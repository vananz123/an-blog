import http from "@/lib/axios";
import { CommentResufl, GetCommentBlog, NewCommentForBlog } from "./type";
import SuccessResponse from "@/types/success.response.type";
export const newCommentForBlogRequest = ({
  userId,
  blogId,
  content,
  parentId = null,
}: NewCommentForBlog) => {
  return http.post<SuccessResponse<any>>("/v1/api/comment", {
    userId,
    blogId,
    content,
    parentId,
  });
};

export const updateCommentForBlogRequest = ({
  commentId,
  content
}: {commentId:string,content:string}) => {
  return http.patch<SuccessResponse<any>>("/v1/api/comment", {
    commentId,
    content
  });
};
export const getCommentByBlogId = ({
  blogId,
  parentId,
  limit = 10,
  offset = 1,
}: GetCommentBlog) => {
  const params = {
    blogId: blogId,
    parentId:parentId,
    limit: limit,
    offset: offset,
  };
  return http.get<SuccessResponse<CommentResufl[]>>("/v1/api/comment", {
    params: params,
  });
};
export const deleteComment = ({
  blogId,
  commentId,
}: {
  blogId: string;
  commentId: string;
}) => {
  const params = {
    blogId: blogId,
    commentId: commentId,
  };
  return http.delete<SuccessResponse<CommentResufl>>("/v1/api/comment", {
    params: params,
  });
};
