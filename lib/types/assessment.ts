/**
 * Config shape for the reusable per-solution lead-gen assessment tool.
 * One engine (components/sections/solutions/assessment-tool.tsx), driven by
 * data — each Solutions sub-page gets its own AssessmentConfig once the
 * real questions and scoring come from iCentra's service-line SMEs.
 */
export interface AssessmentOption {
  label: string;
  value: number;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: AssessmentOption[];
}

export interface AssessmentResultTier {
  /** Inclusive score range this tier covers. */
  minScore: number;
  maxScore: number;
  label: string;
  description: string;
}

export interface AssessmentConfig {
  /** Shown as the tool's heading, e.g. "Digital Transformation Readiness Check". */
  title: string;
  intro: string;
  questions: AssessmentQuestion[];
  resultTiers: AssessmentResultTier[];
  /** Used to tag the lead in the contact-inquiry subject line. */
  topicLabel: string;
}
