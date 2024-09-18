"use client";

import CardQuestion from "@/components/CardQuestion";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { LIMIT } from "@/constants/constants";
import useQueryString from "@/services/client/useQueryString ";
import { useGetQuestion } from "@/services/server/post/queries";
import { GetBlog } from "@/services/server/post/type";
export default function ListQuestionSection() {
  const { queryParams, updateQueryParams } = useQueryString();
  const query: GetBlog = {
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data } = useGetQuestion(query);
  const question = data?.metadata.results;
  const paginated = data?.metadata;
  return (
    <div className="gap-4">
      {question && paginated ? (
        <>
          {question.length > 0 ? (
            <>
              {" "}
              {question.map((e) => (
                <CardQuestion
                  question={e}
                  className="mb-5"
                  link={`/question/${e.question_slug}`}
                  key={e._id}
                />
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
            <div>not</div>
          )}
        </>
      ) : (
        <>{
          Array.from({length:4}).map((_,index)=> (
            <Skeleton key={index} className="w-full h-[200px] mb-3"/>
          ))
        }</>
      )}
    </div>
  );
}
