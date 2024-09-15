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
import QuestionSchema, {QuestionType} from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
interface Props {
  data?: QuestionType;
  submit: (values: QuestionType) => void;
}
export default function QuestionForm({ data, submit }: Props) {
  const form = useForm<QuestionType>({
    resolver: zodResolver(QuestionSchema),
    values: data,
  });
  const {
    formState: { errors },
  } = form;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name='question_title'
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
            name='question_tag'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={data ? field.value[0] : field.value}
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
          </div>
          <FormField
            control={form.control}
            name='question_content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor fieldName="question_content" type='minimal' form={form} />
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
