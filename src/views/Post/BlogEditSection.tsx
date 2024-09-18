"use client";
import BlogForm from "@/components/BlogForm";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/services/client/useAuthStore";
import { useUpdateBlog } from "@/services/server/post/mutation";
import { useGetBlogById } from "@/services/server/post/queries";
import { BlogType } from "@/types/blog.type";
import { useParams } from "next/navigation";

function BlogEditSection() {
  const { toast } = useToast();
  const {clientId} = useAuthStore()
  const { id } = useParams();
  const { data } = useGetBlogById(id as string);
  const blog = data?.metadata;
  console.log(blog);
  const updatePost =useUpdateBlog()
  function onSubmit(values: BlogType) {
    console.log(values);
    if (values && blog) {
      console.log(values)
      values.blog_thumb = values.photo
      const tag = [values.blog_tag] || []
      updatePost
        .mutateAsync({
          userId: clientId,
          blogId:blog._id,
          payload:{...values , blog_tag:tag}
        })
        .then((data) => {
          toast({
            title: `${data.data.message}`,
            description: "Friday, February 10, 2023 at 5:57 PM",
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            // ),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div>
      <p>edit</p>
      {blog && (
        <BlogForm
          data={{
            blog_tag:blog.blog_tag,
            blog_title: blog.blog_title,
            blog_body: blog.blog_body,
            photo: blog.blog_thumb,
          }}
          submit={onSubmit}
        />
      )}
    </div>
  );
}

export default BlogEditSection;
