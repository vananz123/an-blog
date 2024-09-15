"use client"
import { QuestionType } from "@/types/question.type";
import { toast } from "@/components/ui/use-toast";
import QuestionForm from "@/components/QuestionForm";
import useAuthStore from "@/services/client/useAuthStore";
import {
  useNewQuestion,
  useUpdateQuestion,
} from "@/services/server/post/mutation";
import { AxiosError } from "axios";
import ErrorResponse from "@/types/error.response.type";
import { useParams } from "next/navigation";
import { useGetQuestionById } from "@/services/server/post/queries";
function QuestionEditSection() {
  const { clientId } = useAuthStore();
  const { id } = useParams();
  const {data ,refetch} = useGetQuestionById(id as string)
  const question = data?.metadata
  console.log(question)
  const updateQuestion = useUpdateQuestion();
  function onSubmit(values: QuestionType) {
    if (clientId && values && question) {
      updateQuestion
        .mutateAsync({
          userId: clientId,
          questionId: question._id,
          payload: {
            question_content: values.question_content,
            question_title: values.question_title,
            question_tag: [values.question_tag],
          },
        })
        .then((data) => {
          refetch()
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data.data.message, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .catch((error: AxiosError<ErrorResponse<string>>) => {
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(error.response?.data.message, null, 2)}
                </code>
              </pre>
            ),
          });
        });
    }
  }
  return (
    <div>
     {question && ( <QuestionForm data={question} submit={onSubmit} />)}
    </div>
  );
}

export default QuestionEditSection;
