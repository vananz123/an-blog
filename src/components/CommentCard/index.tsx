import CommentForm from "@/components/CommentForm";
import Avatar from "@/components/Avatar";
import useAuthStore from "@/services/client/useAuthStore";
import {
  useDeleteComment,
  useNewComment,
  useUpdateComment,
} from "@/services/server/comment/mutation";
import { useGetComment } from "@/services/server/comment/queries";
import { CommentType } from "@/types/commet.type";
import { Ellipsis, MessageCircle, ThumbsUp } from "lucide-react";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useImmer } from "use-immer";
import { CommentResufl } from "@/services/server/comment/type";
import TimeAgo from "../TimeAgo";
interface Props {
  isLoading?: boolean;
  postType?: "blog" | "question";
  data: CommentResufl;
  blogId: string;
  refetch: () => void;
  refetchReplay: () => void;
}
function CommentCard({
  isLoading = false,
  postType,
  data,
  blogId,
  refetch,
  refetchReplay,
}: Props) {
  const { clientId } = useAuthStore();
  const user = data.comment_userId;
  const updateComment = useUpdateComment();
  const delComment = useDeleteComment();
  function deleteComment(commentId: string) {
    console.log(blogId, commentId);
    delComment
      .mutateAsync({ type: postType, blogId: blogId, commentId: commentId })
      .then(() => {
        refetch();
      });
  }
  const [showEditForm, setShowEditForm] = useImmer<boolean>(false);
  const [commentEdit, setCommentEdit] = useImmer<{
    _id: string;
    content: string;
  }>({ _id: "", content: "" });
  function onSubmitEditComment(values: CommentType) {
    if (commentEdit._id !== "") {
      updateComment
        .mutateAsync({
          type: postType,
          commentId: commentEdit._id,
          content: values.content,
        })
        .then((data) => {
          refetch();
          setShowEditForm(false);
        });
    }
  }
  const comment = useNewComment();
  const [replayForm, setReplayForm] = useImmer<{
    show: boolean;
    _id: string;
    content: string;
  }>({
    show: false,
    _id: "",
    content: "",
  });
  function onSubmitReplayComment(values: CommentType) {
    if (replayForm._id !== "" && clientId !== "") {
      comment
        .mutateAsync({
          type: postType,
          userId: clientId,
          blogId: blogId,
          content: values.content,
          parentId: replayForm._id,
        })
        .then(() => {
          setReplayForm((draft) => {
            draft.show = false;
          });
          refetchReplay();
        });
    }
  }
  return (
    <div className="mb-3">
      <Avatar
        description={(<TimeAgo className='text-[14px]' timestamp={data.created_at} />)}
        user={user}
      ></Avatar>
      <p
        className="mt-3 not-tailwind w-full text-left"
        dangerouslySetInnerHTML={{ __html: data.comment_content }}
      ></p>
      <div className="flex justify-between mt-3">
        <div className="flex gap-3">
          <ThumbsUp size={14} className="cursor-pointer" />
          <MessageCircle
            size={14}
            className="cursor-pointer"
            onClick={() => {
              setReplayForm((draft) => {
                const newShow = !replayForm.show;
                draft.show = newShow;
                if (newShow == true) {
                  draft._id = data._id;
                  draft.content = `<i style="color:hsl(210, 75%, 60%);">@${user.usr_name}</i>`;
                }
              });
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user._id === clientId && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    if (data._id !== commentEdit._id) {
                      setShowEditForm(true);
                    } else {
                      setShowEditForm(!showEditForm);
                    }
                    setCommentEdit({
                      _id: data._id,
                      content: data.comment_content,
                    });
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteComment(data._id)}>
                  Delete
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showEditForm && commentEdit._id === data._id && (
        <div className="my-2 w-full">
          <CommentForm
            onCancel={() => {
              setShowEditForm(false);
            }}
            isLoading={updateComment.isPending}
            data={{ content: commentEdit.content }}
            submit={onSubmitEditComment}
          />
        </div>
      )}
      {replayForm.show && (
        <div className="my-2 flex">
          <div className="h-full w-10 bg-black"></div>
          <div className="w-full">
            <CommentForm
              onCancel={() => {
                setReplayForm((draft) => {
                  draft.show = false;
                });
              }}
              isLoading={comment.isPending}
              data={{ content: replayForm.content }}
              submit={onSubmitReplayComment}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
