"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogInFormValidation } from "@/lib/validation";
import { login } from "@/lib/tools/api";
import { setCookie } from "@/lib/tools/cookies";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LogInFormValidation>>({
    resolver: zodResolver(LogInFormValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof LogInFormValidation>) {
    try {
      const res = await login(values);
      setCookie(process.env.NEXT_PUBLIC_TOKEN_NAME!, res.jwt.token);
      toast.success("Login successful!", { id: "login-success" });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: "login-error" });
      } else {
        toast.error("Something went wrong. Please try again.", { id: "login-server-error" });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-80 mx-auto space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
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
                <Input
                  placeholder="*********"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
