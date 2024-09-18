"use client";
import { BlogType } from "@/types/blog.type";
import { useNewBlog } from "@/services/server/post/mutation";
import useAuthStore from "@/services/client/useAuthStore";
import { useToast } from "@/components/ui/use-toast";
import BlogForm from "@/components/BlogForm";
import { useRouter } from "next/navigation";
export const NewPostSection = () => {
  const router = useRouter()
  const { toast } = useToast();
  const newPost = useNewBlog();
  const { clientId } = useAuthStore();
  function onSubmit(values: BlogType) {
    console.log(values);
    if (values) {
      newPost
        .mutateAsync({
          payload: {
            blog_userId: clientId,
            blog_body: values.blog_body,
            blog_title: values.blog_title,
            blog_thumb: values.photo || "",
            blog_tag:[values.blog_tag] || []
          },
        })
        .then((data) => {
          toast({
            title: `${data.data.message}`,
            description: "Friday, February 10, 2023 at 5:57 PM",
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            // ),
          });
          router.push('/me/posts')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div className="w-full">
      <div className="">
        <BlogForm isLoading={newPost.isPending} submit={onSubmit} />
      </div>
    </div>
  );
};
