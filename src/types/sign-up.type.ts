import { z } from "zod";
const SignUpSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 4 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email({
    message:"Not format email"
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export default SignUpSchema;
