
import useAuthStore from "@/services/client/useAuthStore";
import { ReactNode, useEffect } from "react";

function AuthProvider({children}:{children:ReactNode}) {
    const {clientId} = useAuthStore()
    return (clientId && clientId !== "") ? children : '';
}

export default AuthProvider;