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
import BlogSchema, {BlogType} from "@/types/blog.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useImmer } from "use-immer";
import Image from "next/image";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface Props {
  data?: BlogType;
  submit: (values: BlogType) => void;
}
export default function BlogForm({ data, submit }: Props) {
  const [imageUrl, setImageUrl] = useImmer<string>("");
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
    setImageUrl("");
  };
  return (
    <>
      {imageUrl != "" && (
        <div className="relative z-10 w-[250px] h-[150px] group/item hover:bg-gray-100">
          <Trash
            className="absolute cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover/item:visible"
            onClick={() => removeImageUrl()}
          />
          <Image
            src={imageUrl}
            className="w-full h-full object-fill object-center"
            width={0}
            height={0}
            alt="test"
          />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          onChange={() => {
            const file: Array<any> = form.getValues("blog_thumb");
            if (file && file.length > 0) {
              const url = URL.createObjectURL(file[0]);
              setImageUrl(url);
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
                  defaultValue={data?.blog_tag ? field.value[0] : field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Front-end">Front-end</SelectItem>
                    <SelectItem value="Ubuntu">Ubuntu</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your
                </FormDescription>
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
          <Button className="block" type="submit">
            Publish
          </Button>
        </form>
      </Form>
    </>
  );
}
