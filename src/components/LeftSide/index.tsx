import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Eye, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const test = Array.from({ length: 5 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function LeftSide({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="">
        <div className="sticky top-0">
          <ScrollArea className="h-screen rounded-md border">
            <div className="p-4">
              <p className="mb-4 text-lg font-medium leading-none">
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
              ))}
              <p className="mt-10 mb-4 text-lg font-medium leading-none">
                Author special
              </p>
             
              {test.map((e) => (
                <React.Fragment key={e}>
                   <Separator className="my-3" />
                  <div className="h-auto w-full">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>an</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <main className="col-span-2">{children}</main>
    </section>
  );
}
