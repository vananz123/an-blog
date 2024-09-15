"use client";
import {  ButtonProps } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import {  useLoginGoogle } from "@/services/server/auth/mutation";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import useAuthStore from "@/services/client/useAuthStore";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/services/client/type";

interface GoogleButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
  onSuccessfulLogin?: () => void;
}

const GoogleButton = ({
  children,
  className,
  variant = "ghost",
  onSuccessfulLogin,
}: GoogleButtonProps) => {
  const router = useRouter()
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const { setAccessToken, setRefreshToken, setClientId , setUserInfo } = useAuthStore();
  const login = useLoginGoogle()
  const loginE = async (credentialResponse: any) => {
    handleLogin(credentialResponse.credential)
    console.log(credentialResponse);
  };
  const handleLogin = async (token: string) => {
    login
      .mutateAsync(token)
      .then((data) => {
        const userInfo = data.data.metadata.user as UserInfo
        setUserInfo(userInfo)
        setAccessToken(data.data.metadata.tokens.accessToken);
        setRefreshToken(data.data.metadata.tokens.refreshToken);
        setClientId(data.data.metadata.user._id);
        router.push('/blog')
      })
      .catch((error) => console.log(error));
  };
  // const { signIn } = useGoogleLogin({
  //   clientId: clientId!,
  //   onFailure: (e) => console.log("Google Login: ", e),
  //   onSuccess: async (tokenResponse) => {
  //     const token = (tokenResponse as any).tokenId;
  //     handleLogin(token);
  //     return;
  //   },
  // });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    if (window !== undefined) {
      gapi.load("client:auth2", start);
    }
  }, [clientId]);

  return (
    <div>
      <GoogleLogin
        shape="rectangular"
        type='standard'
        theme="outline"
        auto_select={true}
        useOneTap={true}
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          loginE(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleButton;
