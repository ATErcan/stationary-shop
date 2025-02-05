"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
import { ProfileFormValidation } from "@/lib/validation";
import { updateProfile } from "@/lib/tools/api";
import { useAuth } from "../context/AuthContext";

export default function ProfileForm() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileFormValidation>>({
    resolver: zodResolver(ProfileFormValidation),
    defaultValues: {
      name: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.data.name);
      form.setValue("lastName", user.data.lastName || "");
    }
  }, [user]);

  async function onSubmit(values: z.infer<typeof ProfileFormValidation>) {
    try {
      const res = await updateProfile(values);
      if(res) {
        form.setValue("name", res.data.name);
        form.setValue("lastName", res.data.lastName || "");
        toast.success("Profile updated!", { id: "profile-update" });
        router.refresh();
        setUser(res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Avatar className="w-16 h-16 mx-auto text-3xl my-6 md:w-24 md:h-24 md:text-5xl">
        <AvatarFallback className="bg-zinc-800 text-white">
          {user?.data.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-80 mx-auto space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-0 m-0">
                <FormLabel>First Name</FormLabel>
                <FormControl className="m-0">
                  <Input
                    placeholder="John"
                    className="m-0"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormLabel className="mt-2">Email</FormLabel>
            <Input disabled type="email" placeholder={user?.data.email} />
          </div>
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
