"use client";
import CardBlog from "@/components/CardBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlog } from "@/services/server/post/queries";

const ListBlogSection = () => {
  const { data } = useGetBlog({});
  const posts = data?.metadata;
  return (
    <div>
      {posts ? (
          <>
          {posts.length > 0 ? (
            <>
            {posts.map((e) => (
              <CardBlog className="mb-3" key={e._id} post={e} link={`/blog/${e.blog_slug}`} />
            ))}
          </>
          ):(
            <div>Not exits blog</div>
          )}
          </>
      ):(
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
