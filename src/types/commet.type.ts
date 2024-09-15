import { z } from "zod";
const CommentSchema = z.object({
  content: z.string().min(1, {
    message: "Content must be at least 1 characters.",
  }),
});
export default CommentSchema;
export type CommentType = z.infer<typeof CommentSchema>;
