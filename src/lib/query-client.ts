import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError(error) {
        console.error(error);
        if (typeof window === "undefined") {
          return;
        }
        toast.error(error.message, {
          duration: 5000,
        });
      },
    }),
    mutationCache: new MutationCache({
      onError(error) {
        console.error(error);
        if (typeof window === "undefined") {
          return;
        }
        toast.error(error.message, {
          duration: 5000,
        });
      },
    }),
  });
}
