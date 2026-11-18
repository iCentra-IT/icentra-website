"use client";

import { useMutation } from "@tanstack/react-query";
import { submitPartnershipInquiry, type PartnershipInquiryInput } from "@/lib/api/partnerships";

export function useSubmitPartnershipInquiry() {
  return useMutation({ mutationFn: (data: PartnershipInquiryInput) => submitPartnershipInquiry(data) });
}
