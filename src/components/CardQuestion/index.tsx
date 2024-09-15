import { Bookmark, Check, EyeIcon, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import { QuestionResulf } from "@/services/server/post/type";

const CardQuestion = ({
  className,
  question,
  link,
}: {
  question:QuestionResulf,
  className?: string;
  link: string;
}) => {
  const [showAnswers, setShowAnswers] = useImmer(false);
  const user = question.question_userId
  return (
    <div>
      <Card className={className}>
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
        <Link href={link}>
            <CardContent>
              {question.question_title}
            </CardContent>
          </Link>
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
              <div className="flex gap-1" onClick={()=> setShowAnswers(!showAnswers)}>
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
              <CardContent>Use the col-start-* and col-end-* utilities to make an element start or end at the nth grid line. These can also be combined with the col-span-* utilities to span a specific number of columns.</CardContent>
            </Card>
          </div>
      )}
    </div>
  );
};
export default CardQuestion;
