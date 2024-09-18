import { Bookmark, Check, EyeIcon, Heart, MessageCircle } from "lucide-react";
import { Avatar as AvatarU, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { useImmer } from "use-immer";
import { QuestionResulf } from "@/services/server/post/type";
import Avatar from "../Avatar";
import { Badge } from "../ui/badge";
const CardQuestion = ({
  className,
  question,
  link,
}: {
  question: QuestionResulf;
  className?: string;
  link: string;
}) => {
  const [showAnswers, setShowAnswers] = useImmer(false);
  const user = question.question_userId;
  return (
    <div>
      <Card className={className}>
        <CardHeader>
          <div>
            <Avatar user={user} />
          </div>
        </CardHeader>
        <Link href={link}>
          <CardContent>
            <p>{question.question_title}</p>
            {question.question_tag && question.question_tag.length > 0 && (
              <Badge>{question.question_tag[0]}</Badge>
            )}
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
          <AvatarU>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </AvatarU>
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
      )}
    </div>
  );
};
export default CardQuestion;
