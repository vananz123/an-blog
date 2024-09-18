
import useAuthStore from "@/services/client/useAuthStore";
import { ReactNode } from "react";

function AuthProvider({children}:{children:ReactNode}) {
    const {clientId , isLoaded} = useAuthStore()
    if(isLoaded) return <div>Loading</div>
    return (clientId && clientId !== "") ? children : '';
}

export default AuthProvider;