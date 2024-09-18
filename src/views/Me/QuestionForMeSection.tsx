"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/services/client/useAuthStore";
import { usePostsForMe } from "@/services/server/user/queries";
import {
  Bookmark,
  Check,
  Ellipsis,
  EyeIcon,
  Heart,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import { QuestionResulf } from "@/services/server/post/type";
import { GetPostsForMeRequest } from "@/services/server/user/type";
import useQueryString from "@/services/client/useQueryString ";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
function QuestionForMeSection() {
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
    postType:"question",
    search: queryParams.get("search") || undefined,
    limit: 1,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data, refetch } = usePostsForMe(query);
  const questons = data?.metadata.results as QuestionResulf[];
  const paginated = data?.metadata;
  return (
    <div>
      {questons && paginated ?  (
        <>
          {questons.length > 0 ? (
            <>
              {questons.map((e) => (
                <Card className={"mb-3"} key={e._id}>
                  <CardHeader>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Ellipsis className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/question/edit/${e._id}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                          <DropdownMenuItem
                            // onClick={() => {
                            //   if (clientId && post) {
                            //     delBlog
                            //       .mutateAsync({
                            //         userId: clientId,
                            //         blogId: post._id,
                            //       })
                            //       .then((data) => {
                            //         refetch();
                            //       })
                            //       .catch(
                            //         (
                            //           error: AxiosError<ErrorResponse<string>>
                            //         ) => {
                            //           toast({
                            //             title:
                            //               "You submitted the following values:",
                            //             description: (
                            //               <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            //                 <code className="text-white">
                            //                   {JSON.stringify(
                            //                     error.response?.data.message,
                            //                     null,
                            //                     2
                            //                   )}
                            //                 </code>
                            //               </pre>
                            //             ),
                            //           });
                            //         }
                            //       );
                            //   }
                            // }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/question/${e.question_slug}`}>
                      <div>{e.question_title}</div>
                    </Link>
                  </CardContent>

                  <CardFooter>
                    <div className="w-full grid grid-cols-3">
                      <div className="flex gap-3 col-span-2">
                        <div className="flex gap-1">
                          <EyeIcon />
                          <span>12</span>
                        </div>
                        <div className="flex gap-1">
                          <Heart />
                          <span>12</span>
                        </div>
                        <div className="flex gap-1">
                          <Bookmark />
                          <span>12</span>
                        </div>
                        <div className="flex gap-1">
                          <MessageCircle />
                          <span>12</span>
                        </div>
                      </div>
                    </div>
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
            <div>No the question</div>
          )}{" "}
        </>
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

export default QuestionForMeSection;
