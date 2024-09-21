export interface NewBlog {
  payload: {
    blog_userId: string;
    blog_title: string;
    blog_body: string;
    blog_thumb?: string;
    blog_tag?: string[];
  };
}
export interface NewQuestion {
  payload: {
    question_userId: string;
    question_title: string;
    question_content: string;
    question_tag?: string[];
  };
}
export interface GetBlog {
  tag?:string;
  search?: string;
  limit: number;
  offset: number;
}
export interface BlogResult extends Timestamps{
  _id: string;
  blog_title: string;
  blog_tag: string[];
  blog_slug: string;
  blog_body: string;
  blog_thumb: string;
  blog_userId: User;
  blog_bookmark: number;
  blog_heart_count:number;
  blog_heart_check:boolean;
  blog_reader: number;
  blog_comment:number;
  blog_bookmark_check:boolean;
}
export interface QuestionResulf extends Timestamps {
  _id: string;
  question_content:string;
  question_tag: string[];
  question_slug: string;
  question_title: string;
  question_userId: User;
  question_heart_check:boolean;
  question_bookmark_check:boolean;
  question_heart_count: number;
  question_comment:number;
  question_reader: number;
}
import SuccessResponse from "@/types/success.response.type";
import { User } from "../auth/type";
import Timestamps from "@/types/timestamps.type";
export type PostResponse = SuccessResponse<BlogResult>;
