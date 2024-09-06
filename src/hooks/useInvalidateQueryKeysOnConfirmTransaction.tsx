"use client";
import React, { useCallback } from "react";
import useOnConfirmTransaction, {
  useOnConfirmTransactionProps,
} from "./useOnConfirmTransaction";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

type useInvalidateQueryKeysOnConfirmTransactionProps = Omit<
  useOnConfirmTransactionProps,
  "onConfirm"
> & {
  queryKeys: QueryKey[];
};

export default function useInvalidateQueryKeysOnConfirmTransaction({
  queryKeys,
  ...props
}: useInvalidateQueryKeysOnConfirmTransactionProps) {
  const queryClient = useQueryClient();
  return useOnConfirmTransaction({
    ...props,
    onConfirm: useCallback(() => {
      queryKeys.map((query) =>
        queryClient.invalidateQueries({ queryKey: query })
      );
    }, [queryKeys, queryClient]),
  });
}
