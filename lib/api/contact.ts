import { apiPostJson } from "./client";

export interface ContactInquiryInput {
  first_name: string;
  last_name?: string;
  email: string;
  organization?: string;
  industry?: string;
  phone?: string;
  subject?: string;
  message: string;
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

export interface ContactInquiryResponse {
  message: string;
  inquiry: { status: string };
}

/** POST /api/v1/contact/inquiries/ */
export function submitContactInquiry(data: ContactInquiryInput): Promise<ContactInquiryResponse> {
  return apiPostJson<ContactInquiryResponse>("/api/v1/contact/inquiries/", data);
}
