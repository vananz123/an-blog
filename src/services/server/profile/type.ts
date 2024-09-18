import SuccessResponse from "@/types/success.response.type";

interface AuthResult {
    user:{
        _id:string;
        name:string;
        email:string;
    },
    tokens:{
        accessToken:string;
        refreshToken:string;
    }
}
export type AuthResponse  = SuccessResponse<AuthResult>
export interface PagingRequest {
    limit:number;
    offset:number;
}
type PostType = "question" | "blog"
export interface GetPostsByUserSlugRequest  extends PagingRequest{
    slug?: string;
    search?:string;
    postType?:PostType;
}