"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import SignUpSchema, { SignUpType } from "@/types/sign-up.type";
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
import { useSignUp } from "@/services/server/auth/mutation";
import { error } from "console";
export default function SignUp() {
  const form = useForm<SignUpType>({ resolver: zodResolver(SignUpSchema) });
  const signUp = useSignUp();
  function onSubmit(values: SignUpType) {
    signUp
      .mutateAsync(values)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[500px] mt-20">
        <Form {...form}>
          <p className="text-center text-[24px] font-bold">Sign Up</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your email.
                  </FormDescription> */}
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
                  {/* <FormDescription>This is your password.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="block w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
