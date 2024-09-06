"use client";
import React, { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { Address, WaitForTransactionReceiptParameters } from "viem";
import { toast } from "sonner";

export type useOnConfirmTransactionProps = Omit<
  WaitForTransactionReceiptParameters,
  "hash"
> & {
  onConfirm: () => void;
  hash?: Address;
};

export default function useOnConfirmTransaction({
  onConfirm,
  hash,
  ...props
}: useOnConfirmTransactionProps) {
  const result = useWaitForTransactionReceipt({
    ...props,
    hash,
    query: {
      enabled: Boolean(hash),
      structuralSharing: false,
    },
  });
  const { isSuccess, isFetching } = result;

  useEffect(() => {
    if (isFetching) {
      toast.loading("Confirming transaction...", {
        id: "confirm-transaction",
        duration: 0,
      });
    } else {
      toast.dismiss("confirm-transaction");
    }
  }, [isFetching]);

  useEffect(() => {
    if (isSuccess) {
      onConfirm();
    }
  }, [isSuccess, onConfirm]);

  return result;
}
