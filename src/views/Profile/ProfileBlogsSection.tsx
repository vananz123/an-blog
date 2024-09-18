"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useAuthStore from "@/services/client/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { BlogResult } from "@/services/server/post/type";
import { useParams, useRouter } from "next/navigation";
import useQueryString from "@/services/client/useQueryString ";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { LIMIT } from "@/constants/constants";
import { usePostsByUserSlug } from "@/services/server/profile/queries";
import { GetPostsByUserSlugRequest } from "@/services/server/profile/type";
import TimeAgo from "@/components/TimeAgo";
function ProfileBlogsSection() {
  const {slug} = useParams()
  const { clientId } = useAuthStore();
  const { queryParams, updateQueryParams } = useQueryString();
  const query: GetPostsByUserSlugRequest = {
    slug:slug as string,
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data ,refetch} = usePostsByUserSlug(query);
  const posts = data?.metadata.results as BlogResult[];
  const paginated = data?.metadata;
  return (
    <div>
      {posts && paginated ? (
        posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Card key={post._id} className="mb-3">
                <CardHeader>
                  <div className="flex justify-end">
                    
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-auto grid grid-cols-3 items-start gap-3">
                    <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
                      <Link href={`/blog/${post.blog_slug}`}>
                        <p className="text-[18px] font-bold">{post.blog_title}</p>
                      </Link>
                      {post.blog_tag.map((e:string, index:number) => (
                        <Badge key={index}>{e}</Badge>
                      ))}
                    </div>
                    <div className="">
                      <Link href={`/blog/${post.blog_slug}`}>
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
                  <TimeAgo timestamp={post.created_at} />
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
            Not the blog
          </p>
        )
      ):(
        <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[200px] mb-3" />
        ))}
      </>
      )}
    </div>
  );
}

export default ProfileBlogsSection;
