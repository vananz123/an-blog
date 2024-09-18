"use client";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Eye, MessageCircle, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useGetAuthors } from "@/services/server/user/queries";

const test = Array.from({ length: 5 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
interface Props {
  children: React.ReactNode;
}
export default function LeftSide({ children }: Props) {
  const { data } = useGetAuthors({ limit: 3, offset: 1 });
  const authors = data?.metadata.results;
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="">
        <div className="sticky top-0">
          <ScrollArea className="h-screen rounded-md border">
            <div className="p-4">
              {/* <p className="mb-4 text-lg font-medium leading-none">
                Lastest questions
              </p>

              {test.map((e) => (
                <React.Fragment key={e}>
                  <Separator className="my-3" />
                  <div className="h-auto w-full">
                    <p className="font-bold text-[18px]">
                      Cau hoi moi nha aaaaaaa
                    </p>
                    <div className="flex gap-2">
                      <Eye size={16} />
                      <MessageCircle size={16} />
                    </div>
                  </div>
                </React.Fragment>
              ))} */}

              {authors && authors.length > 0 && (
                <>
                  <Link href={'/authors'}>
                    <p className="mt-2 mb-4 text-lg font-medium leading-none">
                      Author special
                    </p>
                  </Link>
                  {authors.map((e) => (
                    <React.Fragment key={e._id}>
                      <Separator className="my-3" />
                      <div className="h-auto w-full">
                        <div className="flex gap-3">
                          <Link href={`/${e.usr_slug}`}>
                            <Avatar>
                              <AvatarImage
                                src={
                                  e.usr_avatar
                                    ? e.usr_avatar
                                    : "https://github.com/shadcn.png"
                                }
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </Link>
                          <Link  href={`/${e.usr_slug}`}>
                            <p>{e.usr_name}</p>
                          </Link>
                        </div>
                        <div className="flex gap-1 items-center mt-1">
                          <UserPlus size={14}/> 
                          <p className="text-[14px]">{e.usr_follower_count}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      <main className="col-span-2">{children}</main>
    </section>
  );
}
