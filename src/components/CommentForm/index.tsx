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
import { Loader2 } from "lucide-react";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface Props {
  isLoading?: boolean;
  data?: CommentType;
  onCancel?: () => void;
  submit: (values: CommentType) => void;
}
export default function CommentForm({
  isLoading = false,
  data,
  onCancel,
  submit,
}: Props) {
  const form = useForm<CommentType>({
    resolver: zodResolver(CommentSchema),
    values: data,
  });
  const {
    formState: { errors },
  } = form;
  // function onCancel() {
  //   alert('dsfds')
  // }
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
                  <Editor
                    height="auto"
                    fieldName="content"
                    type="minimal"
                    form={form}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button
              className="block"
              onClick={() => {
                form.resetField("content");
                if (typeof onCancel !== "undefined") {
                  onCancel()
                };
              }}
              type="button"
            >
              Cannel
            </Button>
            <Button className="block" type="submit">
              {isLoading == true ? (
                <div className="flex">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Comment</span>
                </div>
              ) : (
                "Comment"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
