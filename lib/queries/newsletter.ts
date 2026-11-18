"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listNewsletterCategories,
  subscribeNewsletter,
  unsubscribeNewsletter,
  type NewsletterCategory,
  type NewsletterSubscribeInput,
} from "@/lib/api/newsletter";

export function useNewsletterCategories() {
  return useQuery<NewsletterCategory[]>({
    queryKey: ["newsletter-categories"],
    queryFn: listNewsletterCategories,
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (data: NewsletterSubscribeInput) => subscribeNewsletter(data),
  });
}

export function useUnsubscribeNewsletter() {
  return useMutation({
    mutationFn: ({ email, reason }: { email: string; reason?: string }) => unsubscribeNewsletter(email, reason),
  });
}
