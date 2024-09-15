"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId!}>{children}</GoogleOAuthProvider>
  );
};

export default GoogleProvider;
