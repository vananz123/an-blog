import { z } from "zod";
const QuestionSchema = z.object({
  question_title:z.string(),
  question_tag:z.any(),
  question_content: z
    .string()
    .min(1, {
      message: "Content must be at least 1 characters.",
    })
});
export default QuestionSchema;
export type QuestionType = z.infer<typeof QuestionSchema>;
