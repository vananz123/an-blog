"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useAuthStore from "@/services/client/useAuthStore";
import { usePostBookmarkForMe } from "@/services/server/user/queries";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { BlogResult } from "@/services/server/post/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function BlogBookmarkForMeSection() {
  const { clientId } = useAuthStore();
  const { data, refetch } = usePostBookmarkForMe({ userId: clientId });
  const blogs = data?.metadata as BlogResult[];
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        <>
          {blogs.map((blog) => (
            <Card key={blog._id} className="mb-3">
              <CardHeader>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        blog.blog_userId.usr_avatar != ""
                          ? blog.blog_userId.usr_avatar
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{blog.blog_userId.usr_name}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-auto grid grid-cols-3 items-start gap-3">
                  <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
                    <Link href={`/blog/${blog.blog_slug}`}>
                      <p className="text-[18px] font-bold">{blog.blog_title}</p>
                    </Link>
                    {blog.blog_tag.map((e: string, index: number) => (
                      <Badge key={index}>{e}</Badge>
                    ))}
                  </div>
                  <div className="">
                    <Link href={`/blog/${blog.blog_slug}`}>
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
          ))}
        </>
      ) : (
        <p>
          Chưa có bản nháp nào. Bạn có thể viết bài mới hoặc đọc bài viết khác
          trên F8 nhé.
        </p>
      )}
    </div>
  );
}

export default BlogBookmarkForMeSection;
