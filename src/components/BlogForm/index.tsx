"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BlogSchema, { BlogType } from "@/types/blog.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useImmer } from "use-immer";
import Image from "next/image";
import { Loader2, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadImage } from "@/services/server/upload/mutation";
import { POST_TAG } from "@/constants/constants";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface Props {
  isLoading?: boolean;
  data?: BlogType;
  submit: (values: BlogType) => void;
}
export default function BlogForm({ isLoading = false, data, submit }: Props) {
  const form = useForm<BlogType>({
    resolver: zodResolver(BlogSchema),
    values: data,
  });
  const {
    register,
    formState: { errors },
  } = form;
  const removeImageUrl = () => {
    form.resetField("blog_thumb");
  };
  const uploadImage = useUploadImage();
  return (
    <>
      <div className="relative z-10 w-[250px] h-[150px] group/item hover:bg-gray-100">
        {uploadImage.isPending ? (
          <div className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover/item:visible">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Trash
            className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover/item:visible"
            onClick={() => removeImageUrl()}
          />
        )}

        <Image
          src={
            form.getValues("photo") != ""
              ? form.getValues("photo")
              : "/test.png"
          }
          className="w-full h-full object-fill object-center"
          width={100}
          height={100}
          alt="test"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          onChange={() => {
            const file: Array<any> = form.getValues("blog_thumb");
            console.log(file);
            if (file && file.length > 0) {
              //const url = URL.createObjectURL(file[0]);
              uploadImage
                .mutateAsync(file[0])
                .then((data) => {
                  console.log(data);
                  form.setValue("photo", data.metadata.url);
                })
                .catch((error) => {
                  console.log(error);
                });
              //setImageUrl(url);
            }
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="blog_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blog_thumb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbail</FormLabel>
                  <FormControl>
                    <Input type="file" {...register("blog_thumb")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="blog_tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={data?.blog_tag && data.blog_tag[0]}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {POST_TAG.map((e) => (
                      <SelectItem key={e.id} value={e.value}>
                        {e.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>You can add tag for your blog</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blog_body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor fieldName="blog_body" form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading == true ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              "Publish"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
