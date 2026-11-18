import { apiPostJson } from "./client";

export type SolutionInterest =
  | "enterprise_transformation"
  | "cybersecurity_grc"
  | "strategy_execution"
  | "learning_talent";

export interface SolutionInquiryInput {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  organization?: string;
  interest?: SolutionInterest | "";
  goals?: string;
  marketing_consent?: boolean;
  "cf-turnstile-response"?: string;
}

export interface SolutionInquiryResponse {
  message: string;
  inquiry_id: number;
}

/** POST /api/v1/solutions/inquiries/ */
export function submitSolutionInquiry(data: SolutionInquiryInput): Promise<SolutionInquiryResponse> {
  return apiPostJson<SolutionInquiryResponse>("/api/v1/solutions/inquiries/", data);
}
