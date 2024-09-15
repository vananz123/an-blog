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
import { useNewCommentBlog } from "@/services/server/comment/mutation";
import { useGetCommentBlog } from "@/services/server/comment/queries";
import { CommentType } from "@/types/commet.type";
import { Fragment, ReactNode } from "react";
interface Props {
  blogId: string;
  children: ReactNode;
}
import { useImmer } from "use-immer";
import CommentCard from "@/components/CommentCard";
function BlogCommentSection({ blogId, children }: Props) {
  const { data, refetch } = useGetCommentBlog({ blogId: blogId });
  const comments = data?.metadata;
  const { clientId } = useAuthStore();
  const comment = useNewCommentBlog();
  function onSubmit(values: CommentType) {
    console.log(values);
    if (clientId) {
      comment
        .mutateAsync({
          userId: clientId,
          blogId: blogId,
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
  const { data: dataReplay, refetch: refetchReplay } = useGetCommentBlog({
    blogId: blogId,
    parentId: commentReplay._id,
  });
  const commentReplaies = dataReplay?.metadata;
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="sm:max-w-[640px] overflow-auto">
          <SheetHeader>
            <SheetTitle>Comment</SheetTitle>
            <SheetDescription>
              <div className="mb-3">
                <CommentForm submit={onSubmit} />
              </div>
            </SheetDescription>
            {comments ? (
              <>
                {comments.length > 0 ? (
                  comments.map((e) => (
                    <Fragment key={e._id}>
                      <CommentCard
                        data={e}
                        blogId={blogId}
                        refetch={refetch}
                        refetchReplay={refetchReplay}
                      />
                      {commentReplay.show == true &&
                        commentReplaies &&
                        commentReplaies.length > 0 &&
                        commentReplaies.map((k) => (
                          <div className="my-2 flex" key={k._id}>
                            <div className="h-full w-10 bg-black"></div>
                            <div className="w-full">
                              <CommentCard
                                data={k}
                                blogId={blogId}
                                refetch={refetch}
                                refetchReplay={refetchReplay}
                              />
                            </div>
                          </div>
                        ))}
                      <div
                        className="text-sm text-cyan-500 cursor-pointer"
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
                        show answer
                      </div>
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

export default BlogCommentSection;
