"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import CommentSchema, { CommentType } from "@/types/commet.type";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface Props {
  data?: CommentType;
  submit: (values: CommentType) => void;
}
export default function CommentForm({ data, submit }: Props) {
  const form = useForm<CommentType>({
    resolver: zodResolver(CommentSchema),
    values: data,
  });
  const {
    formState: { errors },
  } = form;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor height="auto" fieldName="content" type="minimal" form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="block" type="submit">
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
