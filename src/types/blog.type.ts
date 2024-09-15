import { z } from "zod";
const BlogSchema = z.object({
  blog_title: z.string(),
  blog_body: z.string().min(1, {
    message: "Content must be at least 1 characters.",
  }),
  blog_thumb: z.any().refine((file) => {
    if (!file) return new Error("Vui lòng chọn file");
    if (file.size > 1024 * 1024)
      return new Error("Kích thước file không được quá 1MB");
    if (!["image/jpeg", "image/png"].includes(file.type))
      return new Error("Chỉ hỗ trợ file ảnh JPEG và PNG");
    return true;
  }, "File không hợp lệ"),
  blog_tag: z.any()
});
export default BlogSchema;
export type BlogType = z.infer<typeof BlogSchema>;
