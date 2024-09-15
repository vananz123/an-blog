"use client";
import {
  Bookmark,
  Ellipsis,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import Image from "next/image";
import { BlogResult } from "@/services/server/post/type";
import { Badge } from "../ui/badge";

const CardBlog = ({
  post,
  className,
  link,
}: {
  post: BlogResult;
  className?: string;
  link: string;
}) => {
  const [showAnswers, setShowAnswers] = useImmer<boolean>(false);
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
              <Bookmark />
              <Ellipsis />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-auto grid grid-cols-3 items-start gap-3">
            <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
              <Link href={link}>
                <p className="text-[18px] font-bold">{post.blog_title}</p>
              </Link>
              {post.blog_tag.length > 0 && post.blog_tag.map((e,index)=> (
                  <Badge key={index}>{e}</Badge>
              ))}
            </div>
            <div className="">
              <Link href={link}>
                <Image
                  className="object-fill h-[125px] rounded"
                  src={"/test.png"}
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
            <div>2 thangs</div>
            <div>4 phut doc</div>
          </div>
        </CardFooter>
      </Card>
      {showAnswers && (
        <>
          <div className="flex pt-3 pl-6 gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card>
              <CardHeader>
                <p>Do van an</p>
              </CardHeader>
              <CardContent>
                Use the col-start-* and col-end-* utilities to make an element
                start or end at the nth grid line. These can also be combined
                with the col-span-* utilities to span a specific number of
                columns.
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
export default CardBlog;
