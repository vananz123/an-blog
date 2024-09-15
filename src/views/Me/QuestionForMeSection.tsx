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
function QuestionForMeSection() {
  const { clientId } = useAuthStore();
  const { data, refetch } = usePostsForMe({ userId: clientId ,postType:"question"});
  const questons = data?.metadata as QuestionResulf[];
  console.log(questons)
  return (
    <div>
      {questons ? (
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
            </>
          ) : (
            <div>not</div>
          )}{" "}
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default QuestionForMeSection;