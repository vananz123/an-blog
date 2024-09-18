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
import { BlogResult, QuestionResulf } from "@/services/server/post/type";
import Avatar from "@/components/Avatar";
import Pagination from "@/components/Pagination";
import useQueryString from "@/services/client/useQueryString ";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GetPostsForMeRequest } from "@/services/server/user/type";
import { LIMIT } from "@/constants/constants";
function QuestionBookmarkForMeSection() {
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
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data, refetch } = usePostBookmarkForMe(query);
  const questions = data?.metadata.results as QuestionResulf[];
  const paginated = data?.metadata;
  return (
    <div>
      {questions && paginated ? (
        questions.length > 0 ? (
          <>
            {questions.map((question) => (
              <Card key={question._id} className="mb-3">
                <CardHeader>
                  <Avatar user={question.question_userId}></Avatar>
                </CardHeader>
                <CardContent>
                  <div className="h-auto grid grid-cols-3 items-start gap-3">
                    <div className="h-[125px] overflow-hidden text-ellipsis px-2 col-span-2">
                      <Link href={`/blog/${question.question_slug}`}>
                        <p className="text-[18px] font-bold">
                          {question.question_title}
                        </p>
                      </Link>
                  
                    </div>
                    <div className="">
                      
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

export default QuestionBookmarkForMeSection;
