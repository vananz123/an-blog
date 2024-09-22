export interface NewComment {
  type?:'blog' | 'question',
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
  comment_replies?:any[];
  created_at:string;
}
export interface GetCommentBlog {
  type:'blog' | 'question',
  blogId?: string;
  parentId?:string | null;
  limit?: number;
  offset?: number;
}
import SuccessResponse from "@/types/success.response.type";import { User } from "../auth/type";

