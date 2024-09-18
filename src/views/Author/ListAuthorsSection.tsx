"use client";
import Pagination from "@/components/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useQueryString from "@/services/client/useQueryString ";
import { useGetAuthors } from "@/services/server/user/queries";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ListAuthorsSection() {
  const { queryParams, updateQueryParams } = useQueryString();
  const query = {
    search: queryParams.get("search") || undefined,
    limit: 1,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data } = useGetAuthors(query);
  const authors = data?.metadata.results;
  const paginated = data?.metadata;
  return (
    <div>
      {authors && paginated ? (
        <>
          {authors.length > 0 ? (
            <>
              <p className="mt-2 mb-4 text-lg font-medium leading-none">
                Author special
              </p>
              <div className="grid grid-cols-3">
                {authors.map((e) => (
                  <React.Fragment key={e._id}>
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
                        <Link href={`/${e.usr_slug}`}>
                          <p>{e.usr_name}</p>
                        </Link>
                      </div>
                      <div className="flex gap-1 items-center mt-1">
                        <UserPlus size={14} />
                        <p className="text-[14px]">{e.usr_follower_count}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <Pagination
                currentPage={query.offset}
                total={paginated.totalPages}
                onPage={(page: number) => {
                  updateQueryParams({ page: page.toString() });
                }}
              />
            </>
          ) : (
            <div>
              <p>Not exit authors</p>
            </div>
          )}
        </>
      ) : (
        <>
          <Skeleton className="w-[100px] h-[30px] mb-2" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[50px]" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
