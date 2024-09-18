"use client";
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
import Link from "next/link";
import { Search } from "lucide-react";
import { useImmer } from "use-immer";
import useQueryString from "@/services/client/useQueryString ";
export default function Header() {
  const router = useRouter();
  const logout = useLogout();
  const {queryParams, createQueryParams , deleteQueryParam} = useQueryString()
  const { clearAuth, clientId, userInfo } = useAuthStore();
  const [searchValue, setSearchValue] = useImmer('')
  const handleLogout = () => {
    logout
      .mutateAsync()
      .then((data) => {
        clearAuth();
        router.push("/login");
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const data = [
    {
      key: 0,
      text: (
        <p
          onClick={() => {
            router.push("/new-post");
          }}
        >
          New post
        </p>
      ),
      link: "",
    },
    {
      key: 1,
      text: (
        <p
          onClick={() => {
            router.push("/setting");
          }}
        >
          Setting
        </p>
      ),
      link: "",
    },
    {
      key: 2,
      text: (
        <p
          onClick={() => {
            router.push("/me/posts");
          }}
        >
          My posts
        </p>
      ),
      link: "/me/posts",
    },
    {
      key: 3,
      text: (
        <p
          onClick={() => {
            router.push("/me/bookmarks");
          }}
        >
          My bookmark
        </p>
      ),
      link: "/me/bookmarks",
    },
    {
      key: 4,
      text: (
        <p
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </p>
      ),
      link: "",
    },
  ];
  return (
    <div className="h-[70px] px-6 py-3 shadow-lg">
      <div className="flex justify-between items-center">
        <div>Logo</div>
        <Nav />
        <div className="flex gap-6">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" value={searchValue} onChange={(value)=>{
              setSearchValue(value.target.value)
            }} placeholder="Search" />
            <Button onClick={()=> {
              if(searchValue){
                createQueryParams({search:searchValue})
              }
            }}> <Search/> </Button>
          </div>
          {clientId != "" && clientId && userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      userInfo.usr_avatar != ""
                        ? userInfo.usr_avatar
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/${userInfo.usr_slug}`}>
                  <DropdownMenuItem className=" flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          userInfo.usr_avatar != ""
                            ? userInfo.usr_avatar
                            : "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{userInfo.usr_name}</p>
                  </DropdownMenuItem>
                </Link>
                {data.map((e) => (
                  <DropdownMenuItem key={e.key}>{e.text}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant={"secondary"}
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          )}
          <ButtonThem />
        </div>
      </div>
    </div>
  );
}
