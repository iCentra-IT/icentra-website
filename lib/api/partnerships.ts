import { apiPostJson } from "./client";

export type PartnershipInterest = "workforce_capability" | "ai_transformation" | "pmo" | "compliance";

export interface PartnershipInquiryInput {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  organization?: string;
  interest?: PartnershipInterest | "";
  goals?: string;
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

export interface PartnershipInquiryResponse {
  message: string;
  inquiry_id: number;
}

/** POST /api/v1/partnerships/inquiries/ */
export function submitPartnershipInquiry(data: PartnershipInquiryInput): Promise<PartnershipInquiryResponse> {
  return apiPostJson<PartnershipInquiryResponse>("/api/v1/partnerships/inquiries/", data);
}
