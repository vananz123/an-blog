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
import { BlogResult, QuestionResulf } from "@/services/server/post/type";
import { useParams, useRouter } from "next/navigation";
import useQueryString from "@/services/client/useQueryString ";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { LIMIT } from "@/constants/constants";
import { usePostsByUserSlug } from "@/services/server/profile/queries";
import { GetPostsByUserSlugRequest } from "@/services/server/profile/type";
import TimeAgo from "@/components/TimeAgo";
import { EyeIcon, Heart } from "lucide-react";
function ProfileQuestionsSection() {
  const { slug } = useParams();
  const { clientId } = useAuthStore();
  const { queryParams, updateQueryParams } = useQueryString();
  const query: GetPostsByUserSlugRequest = {
    postType: "question",
    slug: slug as string,
    search: queryParams.get("search") || undefined,
    limit: LIMIT.TEN,
    offset: Number(queryParams.get("page")) || 1,
  };
  const { data, refetch } = usePostsByUserSlug(query);
  const posts = data?.metadata.results as QuestionResulf[];
  const paginated = data?.metadata;
  return (
    <div>
      {posts && paginated ? (
        posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Card key={post._id}>
                <div className="mt-5"/>
                <Link href={`/question/${post.question_slug}`}>
                  <CardContent>
                    <p>{post.question_title}</p>
                    {post.question_tag && post.question_tag.length > 0 && (
                      <Badge>{post.question_tag[0]}</Badge>
                    )}
                  </CardContent>
                </Link>
                <CardFooter>
                  <div className="w-full flex justify-between">
                    <div>
                      <TimeAgo timestamp={post.created_at}/>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex gap-1">
                        <EyeIcon />
                        <span>{post.question_reader}</span>
                      </div>
                      <div className="flex gap-1">
                        <Heart />
                        <span>{post.question_heart_count}</span>
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
          <p>Not the blog</p>
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

export default ProfileQuestionsSection;
