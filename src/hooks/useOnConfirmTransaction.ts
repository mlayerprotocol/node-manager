"use client";
import React, { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { Address, WaitForTransactionReceiptParameters } from "viem";
import { toast } from "sonner";

export type useOnConfirmTransactionProps = Omit<
  WaitForTransactionReceiptParameters,
  "hash"
> & {
  message?: string;
  onConfirm: () => void;
  hash?: Address;
};

export default function useOnConfirmTransaction({
  message,
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
      if (message) {
        toast.success(message, {
          id: "confirm-transaction",
        });
      } else {
        toast.dismiss("confirm-transaction");
      }
    }
  }, [isFetching, message]);

  useEffect(() => {
    if (isSuccess) {
      onConfirm();
    }
  }, [isSuccess, onConfirm]);

  return result;
}
