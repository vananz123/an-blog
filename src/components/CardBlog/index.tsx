"use client";
import { Bookmark, Ellipsis, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import Image from "next/image";
import { BlogResult } from "@/services/server/post/type";
import { Badge } from "../ui/badge";
import TimeAgo from "../TimeAgo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const CardBlog = ({
  post,
  className,
  link,
}: {
  post: BlogResult;
  className?: string;
  link: string;
}) => {
  console.log(post);
  const user = post.blog_userId;
  return (
    <div>
      <Card className={className}>
        <CardHeader>
          <div className="flex justify-between">
            <Link href={`/${user.usr_slug}`}>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      user.usr_avatar != ""
                        ? user.usr_avatar
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{user.usr_name}</p>
              </div>
            </Link>
            <div className="flex justify-between gap-2">
              <div className="flex gap-1"><Heart /> <p>{post.blog_heart.length}</p> </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-auto grid grid-cols-3 items-start gap-3">
            <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
              <Link href={link}>
                <p className="text-[18px] font-bold">{post.blog_title}</p>
              </Link>
              {post.blog_tag.length > 0 &&
                post.blog_tag.map((e, index) => <Badge key={index}>{e}</Badge>)}
            </div>
            <div className="">
              <Link href={link}>
                <Image
                  className="object-fill h-[125px] rounded"
                  src={post.blog_thumb != "" ? post.blog_thumb : "/test.png"}
                  alt="test thumbv"
                  width={200}
                  height={110}
                />
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-4">
            <div>
              <TimeAgo timestamp={post.created_at} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default CardBlog;
