import SuccessResponse from "@/types/success.response.type";
export interface User {
    _id:string;
    usr_name:string;
    usr_email:string;
    usr_avatar:string;
    usr_follower_count:number;
    usr_following_count:number;
    usr_slug:string;
    usr_follower_check:boolean;
}
interface AuthResult {
    user:User,
    tokens:{
        accessToken:string;
        refreshToken:string;
    }
}
export type AuthResponse  = SuccessResponse<AuthResult>