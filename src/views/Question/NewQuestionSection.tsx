"use client";
import { Textarea } from "@/components/ui/textarea";
import { useImmer } from "use-immer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import QuestionSchema, { QuestionType } from "@/types/question.type";
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
import { toast } from "@/components/ui/use-toast";
export const NewQuestionSection = () => {
  const form = useForm<QuestionType>({
    resolver: zodResolver(QuestionSchema),
  });

  function onSubmit(data: QuestionType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-3"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your question here ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
