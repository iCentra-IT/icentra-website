"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContactInquiry, type ContactInquiryInput } from "@/lib/api/contact";

/** Shared across every form that lands on the generic contact-inquiry endpoint. */
export function useSubmitContactInquiry() {
  return useMutation({
    mutationFn: (data: ContactInquiryInput) => submitContactInquiry(data),
  });
}
