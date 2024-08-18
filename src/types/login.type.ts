import { z } from "zod";
const LoginSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export default LoginSchema