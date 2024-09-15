"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import LoginSchema, { LoginType } from "@/types/login.type";
import { useRouter } from 'next/navigation'
//build
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/services/server/auth/mutation";
import useAuthStore from "@/services/client/useAuthStore";
import GoogleButton from "@/components/GoogleButton";
import { MessageCircle } from "lucide-react";
import { User } from "@/services/server/auth/type";
export default function LoginPage() {
  const login = useLogin();
  const router = useRouter()
  const { setAccessToken, setClientId, setRefreshToken  ,setUserInfo} = useAuthStore();
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginType) {
    login
      .mutateAsync({ email: values.email, password: values.password })
      .then((data) => {
        const userInfo = data.data.metadata.user as User
        setUserInfo(userInfo)
        setAccessToken(data.data.metadata.tokens.accessToken);
        setRefreshToken(data.data.metadata.tokens.refreshToken);
        setClientId(data.data.metadata.user._id);
        router.push('/blog')
      })
      .catch((error) => console.log(error));

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [test, setTest] = useImmer("This is login");
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[500px] mt-20">
        <Form {...form}>
          <p className="text-center text-[24px] font-bold">Login</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="block w-full" type="submit">
              Login
            </Button>
           
          </form>
        </Form>
        <GoogleButton> <MessageCircle/> </GoogleButton>
      </div>
    </div>
  );
} 