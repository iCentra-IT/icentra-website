"use client";

import { useMutation } from "@tanstack/react-query";
import { submitSolutionInquiry, type SolutionInquiryInput } from "@/lib/api/solutions";

export function useSubmitSolutionInquiry() {
  return useMutation({ mutationFn: (data: SolutionInquiryInput) => submitSolutionInquiry(data) });
}
