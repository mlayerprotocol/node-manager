"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";

export default function NewsletterForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { control } = form;
  return (
    <Form {...form}>
      <form method="POST">
        <div className="flex items-stretch">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow min-w-0" {...field}>
                <FormControl>
                  <Input
                    className="border-[#A9A9C2] border rounded-full h-[46px] placeholder:text-[#B9B8BB] text-white px-5 rounded-r-none border-r-0"
                    placeholder="Enter your email address"
                    type="email"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="p-0 shrink-0 w-[46px] h-[46px] rounded-full rounded-l-none border border-primary">
            <IoMdSend size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
}
