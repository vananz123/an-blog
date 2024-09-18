"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetBlogBySlug } from "@/services/server/post/queries";
import {
  Bookmark,
  BookmarkCheck,
  Ellipsis,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import BlogCommentSection from "../Comment/BlogCommentSection";
import useAuthStore from "@/services/client/useAuthStore";
import { useFollow } from "@/services/server/user/mutation";
import { useBookmarkBlog } from "@/services/server/user/mutation";
import { useHeartBlog } from "@/services/server/post/mutation";
import Link from "next/link";
import TimeAgo from "@/components/TimeAgo";
import ReadingTime from "@/components/ReadingTime";

const BlogDetailSection = () => {
  const router = useRouter();
  const { clientId } = useAuthStore();
  const { slug } = useParams();
  const { data, refetch } = useGetBlogBySlug(slug as string, clientId);
  const post = data?.metadata;
  const user = post?.blog_userId;
  const follow = useFollow();
  const handleFollow = () => {
    if (clientId && user) {
      follow
        .mutateAsync({
          userId: clientId,
          userIdFollow: user._id,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push("/login");
    }
  };
  const bookmark = useBookmarkBlog();
  const handleBookmark = async () => {
    if (clientId && post) {
      bookmark
        .mutateAsync({
          userId: clientId,
          blogId: post._id,
        })
        .then((data) => {
          refetch();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const heart = useHeartBlog();
  const handleHeart = async () => {
    if (clientId && post) {
      heart
        .mutateAsync({
          userId: clientId,
          blogId: post._id,
        })
        .then((data) => {
          refetch();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full grid justify-items-center relative">
      {post && user && (
        <>
          <div className="absolute top-0 left-0">
            <p className="font-bold mb-3">{user.usr_name}</p>
            <div>
              {post.blog_heart_check ? (
                <div className="flex gap-2 mb-3 cursor-pointer">
                  <Heart
                    onClick={() => handleHeart()}
                    className="text-red-500"
                  />{" "}
                  <p>{post.blog_heart_count}</p>
                </div>
              ) : (
                <div className="flex gap-2 mb-3 cursor-pointer">
                  <Heart onClick={() => handleHeart()} />{" "}
                  <p>{post.blog_heart}</p>
                </div>
              )}
              <BlogCommentSection blogId={post._id}>
                <div className="flex gap-2 mb-3 cursor-pointer">
                  <MessageCircle /> <p>{post.blog_comment}</p>
                </div>
              </BlogCommentSection>
            </div>
          </div>
          <div className="w-full md:w-[700px]">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Link href={`/${user.usr_slug}`}>
                  <Avatar>
                    <AvatarImage
                      src={
                        user.usr_avatar
                          ? user.usr_avatar
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <div className="flex gap-3">
                    <Link href={`/${user.usr_slug}`}>
                      {" "}
                      <p>{user.usr_name}</p>
                    </Link>
                    {/* {user._id != clientId && (
                      <a
                        className="text-sm text-blue-400 mt-[2px] cursor-pointer"
                        onClick={() => handleFollow()}
                      >
                        Follow
                      </a>
                    )} */}
                  </div>
                  <div className="text-[14px]">
                    <TimeAgo className="mr-2" timestamp={post.created_at}/>
                    <ReadingTime content={post.blog_body}/>
                  </div>
                </div>
              </div>
              <div className="w-[80px] flex justify-end gap-3 items-center">
                {!post.blog_bookmark_check ? (
                  <Bookmark
                    className="cursor-pointer"
                    onClick={() => handleBookmark()}
                  />
                ) : (
                  <BookmarkCheck
                    className="cursor-pointer text-red-500"
                    onClick={() => handleBookmark()}
                  />
                )}
                <Ellipsis />
              </div>
            </div>
            <h1 className="text-[31px] font-bold py-8">{post.blog_title}</h1>
            <div className="not-tailwind">
              <p dangerouslySetInnerHTML={{ __html: post.blog_body }}></p>
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
};
export default BlogDetailSection;
