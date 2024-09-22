import { EyeIcon, Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { QuestionResulf } from "@/services/server/post/type";
import Avatar from "../Avatar";
import { Badge } from "../ui/badge";
import TimeAgo from "../TimeAgo";
const CardQuestion = ({
  className,
  question,
  link,
}: {
  question: QuestionResulf;
  className?: string;
  link: string;
}) => {
  const user = question.question_userId;
  return (
    <div>
      <Card className={className}>
        <CardHeader>
          <div className='flex justify-between'>
            <Avatar user={user} />
            <div className="flex gap-3">
              <div className="flex gap-1">
                <EyeIcon />
                <span>{question.question_reader}</span>
              </div>
              <div className="flex gap-1">
                <Heart />
                <span>{question.question_heart_count}</span>
              </div>
            </div>
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
          <div className="w-full">
            <div className="">
             <TimeAgo timestamp={question.created_at}/>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default CardQuestion;
