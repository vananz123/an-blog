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