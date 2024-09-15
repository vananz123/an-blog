"use client";
import CardQuestion from "@/components/CardQuestion";
import { useParams } from "next/navigation";
import { Bookmark, Check, EyeIcon, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import { QuestionResulf } from "@/services/server/post/type";
import { useGetQuestionBySlug } from "@/services/server/post/queries";
const QuestionDetailSection = () => {
  const [showAnswers, setShowAnswers] = useImmer(false);
  const { slug } = useParams();
  const { data } = useGetQuestionBySlug(slug as string);
  const question = data?.metadata;
  const user = question?.question_userId;
  return (
    <div>
      {question && user && (
        <><Card className={""}>
        <CardHeader>
          <div>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src={
                    user.usr_avatar != ""
                      ? user.usr_avatar
                      : "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{user.usr_name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <p className="text-[31px] mb-3">{question.question_title}</p>
            <p dangerouslySetInnerHTML={{__html:question.question_content}}></p>
        </CardContent>
        <CardFooter>
          <div className="w-full grid grid-cols-3">
            <div className="flex gap-3 col-span-2">
              <div className="flex gap-1">
                <EyeIcon />
                <span>12</span>
              </div>
              <div className="flex gap-1">
                <Heart />
                <span>12</span>
              </div>
              <div className="flex gap-1">
                <Bookmark />
                <span>12</span>
              </div>
              <div
                className="flex gap-1"
                onClick={() => setShowAnswers(!showAnswers)}
              >
                <MessageCircle />
                <span>12</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      {showAnswers && (
        <div className="flex pt-3 pl-6 gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Card>
            <CardHeader>
              <p>Do van an</p>
            </CardHeader>
            <CardContent>
              Use the col-start-* and col-end-* utilities to make an element
              start or end at the nth grid line. These can also be combined with
              the col-span-* utilities to span a specific number of columns.
            </CardContent>
          </Card>
        </div>
      )}</>
      )}
    </div>
  );
};
export default QuestionDetailSection;
