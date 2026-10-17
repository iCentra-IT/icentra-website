"use client";

import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { withFreshToken, SessionExpiredError } from "@/lib/admin/session";

/**
 * React Query wrappers for the staff (Bearer-token) API. Centralizes the
 * "refresh once, then bounce to /admin/login" handling so individual pages
 * don't each re-implement the withFreshToken/SessionExpiredError dance.
 */
export function useStaffQuery<T>(
  queryKey: unknown[],
  fn: (accessToken: string) => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  const router = useRouter();
  return useQuery<T>({
    queryKey,
    queryFn: () =>
      withFreshToken(fn).catch((err) => {
        if (err instanceof SessionExpiredError) router.replace("/admin/login");
        throw err;
      }),
    ...options,
  });
}

export function useStaffMutation<TVariables, TResult = unknown>(
  fn: (accessToken: string, variables: TVariables) => Promise<TResult>,
  options?: Omit<UseMutationOptions<TResult, Error, TVariables>, "mutationFn">
) {
  const router = useRouter();
  return useMutation<TResult, Error, TVariables>({
    mutationFn: (variables) =>
      withFreshToken((token) => fn(token, variables)).catch((err) => {
        if (err instanceof SessionExpiredError) router.replace("/admin/login");
        throw err;
      }),
    ...options,
  });
}
