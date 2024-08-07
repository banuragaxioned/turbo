"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@repo/supabase/client";
import type { User } from "@repo/supabase/schema";
import { Button } from "@repo/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(50).optional(),
  username: z.string().min(2).max(30).optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export default function AccountForm({ user }: { user: User }) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email || "",
      fullName: "",
      username: "",
      website: "",
    },
  });

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, website, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        form.reset({
          email: user.email,
          fullName: data.full_name || undefined,
          username: data.username || undefined,
          website: data.website || undefined,
        });
      }
    } catch (error) {
      toast.error("Error getting the profile data. Please try again later.");
    }
  }, [user, supabase, form]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: values.fullName,
        username: values.username,
        website: values.website,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating the data:", error);
      toast.error("Error updating the profile. Please try again later.");
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid || isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
