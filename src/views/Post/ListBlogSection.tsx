"use client";
import CardBlog from "@/components/CardBlog";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { LIMIT } from "@/constants/constants";
import useQueryString from "@/services/client/useQueryString ";
import { useGetBlog } from "@/services/server/post/queries";
import { GetBlog } from "@/services/server/post/type";

const ListBlogSection = () => {
  const { queryParams, updateQueryParams } = useQueryString();
  const query: GetBlog = {
    tag: queryParams.get("tag") || undefined,
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data } = useGetBlog(query);
  const posts = data?.metadata.results;
  const paginated = data?.metadata;
  return (
    <div>
      {query.tag && <p className="text-[30px] font-bold mb-10">{query.tag}</p>}
      {query.search && (
        <>
          <p className="text-[30px] font-bold mb-3">Search</p>
          <p className="mb-10">{query.search}</p>
        </>
      )}
      {!query.tag && !query.search && (
        <p className="text-[30px] font-bold mb-10">Blog special</p>
      )}
      {posts && paginated ? (
        <>
          {posts.length > 0 ? (
            <>
              {posts.map((e) => (
                <CardBlog
                  className="mb-3"
                  key={e._id}
                  post={e}
                  link={`/blog/${e.blog_slug}`}
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
            <div>Not exits blog</div>
          )}
        </>
      ) : (
        <>
          <Skeleton className="h-[225px] w-full rounded-xl mb-3" />
          <Skeleton className="h-[225px] w-full rounded-xl mb-3" />
          <Skeleton className="h-[225px] w-full rounded-xl mb-3" />
        </>
      )}
    </div>
  );
};
export default ListBlogSection;
