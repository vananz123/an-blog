export interface NewCommentForBlog {
  userId:string;
  blogId:string;
  content:string;
  parentId:string | null;
}
export interface CommentResufl {
  _id:string;
  comment_userId:User;
  comment_content:string;
  comment_left:number;
  comment_right:string;
  comment_parentId:string | null;
}
export interface GetCommentBlog {
  blogId?: string;
  parentId?:string;
  limit?: number;
  offset?: number;
}
import SuccessResponse from "@/types/success.response.type";import { User } from "../auth/type";

