"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { IoMdInformationCircle } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type DelegateLicenseModalProps = DialogProps;

export default function DelegateLicenseModal({
  ...props
}: DelegateLicenseModalProps) {
  const form = useForm({
    defaultValues: {
      hash: "",
    },
  });
  const { control } = form;
  return (
    <Dialog {...props}>
      <DialogContent className="py-7 px-14 bg-layout !rounded-2xl max-w-[476px]">
        <DialogHeader className="text-left">
          <DialogTitle>Delegate Sentry License to A Node Operator</DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form method="POSt">
              <div className="space-y-4 mt-[57px]">
                <div className="flex items-center gap-3 font-bold text-white">
                  <span>License ID:</span>
                  <span>105</span>
                </div>
                <div className="flex items-center gap-3 font-bold text-white">
                  <span>Delegate Hash</span>
                  <IoMdInformationCircle size={20} />
                </div>
                <FormField
                  control={control}
                  name="hash"
                  render={({ field }) => (
                    <FormItem {...field}>
                      <FormControl>
                        <Textarea
                          className="h-[82px] text-white border border-white/80 rounded placeholder:text-[#B9B8BB] py-3 px-4"
                          placeholder="Paste Hash here"
                        ></Textarea>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button className="mt-[84px] flex rounded-full w-full">
                Delegate
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
