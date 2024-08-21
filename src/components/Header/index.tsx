"use client"
import { ButtonThem } from "../ButtonTheme";
import useAuthStore from "@/services/client/useAuthStore";
import { useLogout } from "@/services/server/auth/mutation";
import { useRouter } from "next/navigation";
import { Nav } from "../Nav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export default function Header() {
    const router = useRouter()
    const logout = useLogout()
    const {clearAuth , clientId} = useAuthStore()
    const handleLogout = ()=> {
        logout.mutateAsync().then((data)=> {
           clearAuth()
            router.push('/login')
            console.log(data)
        }).catch((error) => console.log(error))
    }
    const data = [
        {
          key: 1,
          text: "profile",
          link: "",
        },
        {
          key: 2,
          text: "settings",
          link: "",
        },
        {
          key: 3,
          text: (<p onClick={()=> {handleLogout()}}>Logout</p>),
          link: "",
        },
      ];
  return (
    <div className="h-[70px] px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
            Logo
        </div>
        <Nav/>
        <div className="flex gap-4">
            <Input type="text" placeholder="search" className="max-w-[350px]"/>
            {clientId != "" && clientId ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {data.map((e) => (
                    <DropdownMenuItem key={e.key}>{e.text}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ):(
                <Button variant={'secondary'} onClick={()=>{
                    router.push('/login')
                }} >Login</Button>
            )}
            <ButtonThem/>
        </div>
      </div>
    </div>
  );
}
