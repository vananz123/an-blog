"use client"
import useAuthStore from "@/services/client/useAuthStore";
import { useLogout } from "@/services/server/auth/mutation";
import { useRouter } from "next/navigation";
export default function HomePage() {
    const router = useRouter()
    const logout = useLogout()
    const {clearAuth} = useAuthStore()
    const handleLogout = ()=> {
        logout.mutateAsync().then((data)=> {
           clearAuth()
            router.push('/login')
            console.log(data)
        }).catch((error) => console.log(error))
    }
  return (
    <div>
      <p>BLog lastest</p>
      <div>
        
      </div>
    </div>
  );
}
