import { z } from "zod";
const QuestionSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Content must be at least 1 characters.",
    })
});
export default QuestionSchema;
export type QuestionType = z.infer<typeof QuestionSchema>;
