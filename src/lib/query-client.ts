import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseError } from "viem";

export function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError(error) {
        console.error(error);
        if (typeof window === "undefined") {
          return;
        }
        toast.error(
          error instanceof BaseError
            ? error.shortMessage || error.message
            : error.message,
          {
            duration: 5000,
          }
        );
      },
    }),
    mutationCache: new MutationCache({
      onError(error) {
        console.error(error);
        if (typeof window === "undefined") {
          return;
        }
        toast.error(
          error instanceof BaseError
            ? error.shortMessage || error.message
            : error.message,
          {
            duration: 5000,
          }
        );
      },
    }),
  });
}
