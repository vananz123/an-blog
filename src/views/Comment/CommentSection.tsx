import CommentForm from "@/components/CommentForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore from "@/services/client/useAuthStore";
import { useNewComment } from "@/services/server/comment/mutation";
import { useGetComment } from "@/services/server/comment/queries";
import { CommentType } from "@/types/commet.type";
import { Fragment, ReactNode } from "react";
interface Props {
  postType?: "blog" | "question";
  postId: string;
  children: ReactNode;
}
import { useImmer } from "use-immer";
import CommentCard from "@/components/CommentCard";
import Link from "next/link";
function CommentSection({ postType, postId, children }: Props) {
  const { data, refetch } = useGetComment({ type: postType || 'blog', blogId: postId });
  const comments = data?.metadata;
  const { clientId } = useAuthStore();
  const comment = useNewComment();
  function onSubmit(values: CommentType) {
    if (clientId) {
      comment
        .mutateAsync({
          type: postType,
          userId: clientId,
          blogId: postId,
          content: values.content,
          parentId: null,
        })
        .then(() => {
          refetch();
        });
    }
  }
  const [commentReplay, setCommentReplay] = useImmer<{
    show: boolean;
    _id: string;
    content: string;
  }>({ show: false, _id: "", content: "" });
  const { data: dataReplay, refetch: refetchReplay } = useGetComment({
    type:postType || 'blog',
    blogId: postId,
    parentId: commentReplay._id,
  });
  const commentReplaies = dataReplay?.metadata;
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-[640px] overflow-auto">
          <SheetHeader>
            {clientId != '' ? (
              <>
                <SheetTitle>Comment</SheetTitle>
                <SheetDescription>
                  <div className="mb-3">
                    <CommentForm isLoading={comment.isPending} submit={onSubmit} />
                  </div>
                </SheetDescription>
              </>
            ):(
              <Link className="my-5 text-center" href={'/login'}>Please login to comment</Link>
            )}
            {comments ? (
              <>
                {comments.length > 0 ? (
                  comments.map((e) => (
                    <Fragment key={e._id}>
                      <CommentCard
                        data={e}
                        postType={postType}
                        blogId={postId}
                        refetch={refetch}
                        refetchReplay={refetchReplay}
                      />
                      {commentReplay._id == e._id &&
                        commentReplay.show == true &&
                        commentReplaies &&
                        commentReplaies.length > 0 &&
                        commentReplaies.map((k) => (
                          <div className="my-2 flex" key={k._id}>
                            <div className="h-full w-10 bg-black"></div>
                            <div className="w-full">
                              <CommentCard
                                data={k}
                                blogId={postId}
                                refetch={refetch}
                                refetchReplay={refetchReplay}
                              />
                            </div>
                          </div>
                        ))}
                      {e.comment_replies && e.comment_replies.length > 0 && (
                        <div
                          className="w-full text-left text-sm text-cyan-500 cursor-pointer"
                          onClick={() => {
                            setCommentReplay((draft) => {
                              const newShow = !commentReplay.show;
                              draft.show = newShow;
                              if (newShow == true) {
                                draft._id = e._id;
                                refetchReplay();
                              }
                            });
                          }}
                        >
                          {e.comment_replies.length} answer
                        </div>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <div>not comment</div>
                )}
              </>
            ) : (
              <div>loading</div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CommentSection;
