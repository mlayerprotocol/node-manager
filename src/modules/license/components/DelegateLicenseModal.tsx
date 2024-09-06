"use client";
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
import {
  useReadSubnetContractAddressInfo,
  useWriteSentryNodeContractRegisterOperatorBytes,
  useWriteValidatorNodeContractRegisterOperatorBytes,
} from "@mlayer-contracts";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import useInvalidateQueryKeysOnConfirmTransaction from "@/hooks/useInvalidateQueryKeysOnConfirmTransaction";

export type DelegateLicenseModalProps = DialogProps & {
  license?: { id: BigInt; type: "sentry" | "validator" };
};

export default function DelegateLicenseModal({
  license,
  ...props
}: DelegateLicenseModalProps) {
  const form = useForm({
    defaultValues: {
      hash: "",
    },
  });
  const { control, handleSubmit } = form;
  const {
    writeContractAsync: registerSentryOperator,
    data: registerSentryOperatorData,
  } = useWriteSentryNodeContractRegisterOperatorBytes();
  const {
    writeContractAsync: registerValidatorOperator,
    data: registerValidatorOperatorData,
  } = useWriteValidatorNodeContractRegisterOperatorBytes();
  const { address, isConnected } = useAccount();
  const { queryKey: getAddressInfoQueryKey } = useReadSubnetContractAddressInfo(
    {
      args: address && [address],
      query: {
        enabled: isConnected,
      },
    }
  );
  useInvalidateQueryKeysOnConfirmTransaction({
    queryKeys: [getAddressInfoQueryKey],
    hash: registerSentryOperatorData,
  });
  useInvalidateQueryKeysOnConfirmTransaction({
    queryKeys: [getAddressInfoQueryKey],
    hash: registerValidatorOperatorData,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (license?.type === "sentry") {
      await registerSentryOperator({
        args: [data.hash as Address, [BigInt(license.id.toString())]],
      });
    }

    if (license?.type === "validator") {
      await registerValidatorOperator({
        args: [data.hash as Address, [BigInt(license.id.toString())]],
      });
    }
    form.reset();
    toast.success("License delegated successfully");
    props.onOpenChange?.(false);
  });

  return (
    <Dialog {...props}>
      <DialogContent className="py-7 px-14 bg-layout !rounded-2xl max-w-[476px]">
        <DialogHeader className="text-left">
          {license?.type === "sentry" && (
            <DialogTitle>
              Delegate Sentry License to A Node Operator
            </DialogTitle>
          )}
          {license?.type === "validator" && (
            <DialogTitle>
              Delegate Validator License to A Node Operator
            </DialogTitle>
          )}
        </DialogHeader>

        <div>
          <Form {...form}>
            <form method="POST" onSubmit={onSubmit}>
              <div className="space-y-4 mt-5">
                <div className="flex items-center gap-3 font-bold text-white">
                  <span>License ID:</span>
                  <span>{license?.id?.toString()}</span>
                </div>
                <div className="flex items-center gap-3 font-bold text-white">
                  <span>Delegate Hash</span>
                  <IoMdInformationCircle size={20} />
                </div>
                <FormField
                  control={control}
                  name="hash"
                  rules={{ required: "This field is required" }}
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

              <div className="pt-5 pb-16 min-h-[84px]">
                {form.formState.errors.hash && (
                  <p className="text-destructive ">
                    {form.formState.errors.hash.message}
                  </p>
                )}
              </div>

              <Button
                className="flex rounded-full w-full"
                loading={form.formState.isSubmitting}
              >
                Delegate
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
