"use client";
import { QuestionType } from "@/types/question.type";
import { toast } from "@/components/ui/use-toast";
import QuestionForm from "@/components/QuestionForm";
import useAuthStore from "@/services/client/useAuthStore";
import { useNewQuestion } from "@/services/server/post/mutation";
import { AxiosError } from "axios";
import ErrorResponse from "@/types/error.response.type";
export const NewQuestionSection = () => {
  const {clientId}= useAuthStore()
  const newQuestion = useNewQuestion()
  function onSubmit(values: QuestionType) {
    if(clientId && values){
      newQuestion.mutateAsync({
        payload:{
          question_content:values.question_content,
          question_title:values.question_title,
          question_userId:clientId,
          question_tag:[values.question_tag]
        }
      }).then((data)=> {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data.data.message, null, 2)}</code>
            </pre>
          ),
        });
      }).catch((error:AxiosError<ErrorResponse<string>>)=> {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(error.response?.data.message, null, 2)}</code>
            </pre>
          ),
        });
      })
    }
  }
  return (
    <div>
      <QuestionForm submit={onSubmit}/>
    </div>
  );
};
