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
import { BlogResult } from "@/services/server/post/type";
import Avatar from "@/components/Avatar";
import Pagination from "@/components/Pagination";
import useQueryString from "@/services/client/useQueryString ";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TimeAgo from "@/components/TimeAgo";
import { LIMIT } from "@/constants/constants";
function BlogBookmarkForMeSection() {
  const { clientId } = useAuthStore();
  const router = useRouter()
  useEffect(()=>{
    if(clientId == '') {
      router.push('/login')
    }
  })
  const { queryParams, updateQueryParams } = useQueryString();
  const query = {
    userId:clientId,
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data, refetch } = usePostBookmarkForMe(query);
  const blogs = data?.metadata.results as BlogResult[];
  const paginated = data?.metadata;
  return (
    <div>
      {blogs && paginated ? (
        blogs.length > 0 ? (
          <>
            {blogs.map((blog) => (
              <Card key={blog._id} className="mb-3">
                <CardHeader>
                  <Avatar user={blog.blog_userId}></Avatar>
                </CardHeader>
                <CardContent>
                  <div className="h-auto grid grid-cols-3 items-start gap-3">
                    <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
                      <Link href={`/blog/${blog.blog_slug}`}>
                        <p className="text-[18px] font-bold">
                          {blog.blog_title}
                        </p>
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
                 <TimeAgo timestamp={blog.created_at}/>
                </CardFooter>
              </Card>
            ))}
            <Pagination
              currentPage={query.offset}
              total={paginated.totalPages}
              onPage={(page: number) => {
                updateQueryParams({ page: page.toString() });
              }}
            />
          </>
        ) : (
          <p>
            No the bookmark 
          </p>
        )
      ) : (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[200px] mb-3" />
          ))}
        </>
      )}
    </div>
  );
}

export default BlogBookmarkForMeSection;
