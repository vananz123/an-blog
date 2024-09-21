"use client";
import { useParams } from "next/navigation";
import { Bookmark, Check, EyeIcon, Heart, MessageCircle } from "lucide-react";
import Avatar from "@/components/Avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useImmer } from "use-immer";
import { useGetQuestionBySlug } from "@/services/server/post/queries";
import { useBookmarkQuestion } from "@/services/server/user/mutation";
import { useHeartQuestion } from "@/services/server/post/mutation";
import useAuthStore from "@/services/client/useAuthStore";
import CommentSection from "../Comment/CommentSection";
const QuestionDetailSection = () => {
  const { clientId } = useAuthStore();
  const [showAnswers, setShowAnswers] = useImmer(false);
  const { slug } = useParams();
  const { data, refetch } = useGetQuestionBySlug(slug as string, clientId);
  const question = data?.metadata;
  const user = question?.question_userId;
  console.log(question);
  const bookmark = useBookmarkQuestion();
  const handleBookmark = async () => {
    if (clientId != "" && question) {
      bookmark
        .mutateAsync({
          userId: clientId,
          questionId: question._id,
        })
        .then((data) => {
          refetch();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const heart = useHeartQuestion();
  const handleHeart = async () => {
    if (clientId && question) {
      heart
        .mutateAsync({
          userId: clientId,
          questionId: question._id,
        })
        .then((data) => {
          refetch();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {question && user && (
        <>
          <Card className={""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Avatar user={user} />
                <div
                  className={`${
                    question.question_bookmark_check && "text-red-500"
                  } cursor-pointer`}
                >
                  <Bookmark onClick={() => handleBookmark()} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[31px] mb-3">{question.question_title}</p>
              <p
                className="not-tailwind"
                dangerouslySetInnerHTML={{ __html: question.question_content }}
              ></p>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="flex gap-1">
                      <EyeIcon />
                      <span>{question.question_reader}</span>
                    </div>
                    <div className="flex gap-1">
                      <Heart
                        onClick={() => handleHeart()}
                        className={`${
                          question.question_heart_check && "text-red-500"
                        } cursor-pointer`}
                      />
                      <span>{question.question_heart_count}</span>
                    </div>
                  </div>
                  <CommentSection postType='question' postId={question._id}>
                    <div className="flex gap-1">
                      <MessageCircle />
                      <span>{question.question_comment}</span>
                    </div>
                  </CommentSection>
                </div>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};
export default QuestionDetailSection;
