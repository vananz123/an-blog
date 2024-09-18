"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useAuthStore from "@/services/client/useAuthStore";
import { usePostsForMe } from "@/services/server/user/queries";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBlog } from "@/services/server/post/mutation";
import { AxiosError } from "axios";
import ErrorResponse from "@/types/error.response.type";
import { useToast } from "@/components/ui/use-toast";
import { BlogResult } from "@/services/server/post/type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useQueryString from "@/services/client/useQueryString ";
import { GetPostsForMeRequest } from "@/services/server/user/type";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { LIMIT } from "@/constants/constants";
import TimeAgo from "@/components/TimeAgo";
function BlogForMeSection() {
  const { clientId } = useAuthStore();
  const router = useRouter()
  useEffect(()=>{
    if(clientId == '') {
      router.push('/login')
    }
  })
  const { queryParams, updateQueryParams } = useQueryString();
  const query: GetPostsForMeRequest = {
    userId:clientId,
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data ,refetch} = usePostsForMe(query);
  const delBlog = useDeleteBlog()
  const posts = data?.metadata.results as BlogResult[];
  const paginated = data?.metadata;
  const { toast } = useToast();
  return (
    <div>
      {posts && paginated ? (
        posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Card key={post._id} className="mb-3">
                <CardHeader>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Ellipsis className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/blog/edit/${post._id}`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={()=>{
                          if(clientId && post){
                            delBlog.mutateAsync({
                              userId:clientId,
                              blogId:post._id
                            }).then((data)=>{
                              refetch()
                            }).catch((error:AxiosError<ErrorResponse<string>>)=>{
                              toast({
                                title: "You submitted the following values:",
                                description: (
                                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">{JSON.stringify(error.response?.data.message, null, 2)}</code>
                                  </pre>
                                ),
                              });
                            })
                          }
                        }}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <TimeAgo timestamp={post.created_at}/>
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

export default BlogForMeSection;
