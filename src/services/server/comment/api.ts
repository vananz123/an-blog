import http from "@/lib/axios";
import { CommentResufl, GetCommentBlog, NewComment } from "./type";
import SuccessResponse from "@/types/success.response.type";
export const newCommentRequest = ({
  type='blog',
  userId,
  blogId,
  content,
  parentId = null,
}: NewComment) => {
  return http.post<SuccessResponse<any>>(`/v1/api/comment?type=${type}`, {
    userId,
    blogId,
    content,
    parentId,
  });
};
export const updateCommentRequest = ({
  type='blog',
  commentId,
  content
}: {commentId:string,content:string, type?:"blog"| "question"}) => {
  return http.patch<SuccessResponse<any>>(`/v1/api/comment?type=${type}`, {
    commentId,
    content
  });
};
export const getComment = ({
  type='blog',
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
  return http.get<SuccessResponse<CommentResufl[]>>(`/v1/api/comment?type=${type}`, {
    params: params,
  });
};
export const deleteComment = ({
  type='blog',
  blogId,
  commentId,
}: {
  blogId: string;
  commentId: string;
  type?:"blog"| "question";
}) => {
  const params = {
    blogId: blogId,
    commentId: commentId,
  };
  return http.delete<SuccessResponse<CommentResufl>>(`/v1/api/comment?type=${type}`, {
    params: params,
  });
};
