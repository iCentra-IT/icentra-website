"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TurnstileWidget, { type TurnstileWidgetHandle } from "@/components/forms/turnstile-widget";
import { IcentraCheckbox } from "@/components/forms/form-component";
import { submitContactInquiry } from "@/lib/api/contact";
import { ApiError } from "@/lib/api/client";
import type { AssessmentConfig } from "@/lib/types/assessment";

interface AssessmentToolProps {
  config: AssessmentConfig;
}

function errorText(err: unknown): string {
  if (err instanceof ApiError) return err.firstFieldError ?? err.message;
  return "Something went wrong. Please try again.";
}

export default function AssessmentTool({ config }: AssessmentToolProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const totalQuestions = config.questions.length;
  const onLeadStep = step === totalQuestions;
  const question = step < totalQuestions ? config.questions[step] : null;

  function selectAnswer(value: number) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setStep((s) => s + 1);
  }

  function score(): number {
    return Object.values(answers).reduce((sum, v) => sum + v, 0);
  }

  function resultTier() {
    const total = score();
    return (
      config.resultTiers.find((t) => total >= t.minScore && total <= t.maxScore) ??
      config.resultTiers[config.resultTiers.length - 1]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const tier = resultTier();
    const breakdown = config.questions
      .map((q) => {
        const selected = q.options.find((o) => o.value === answers[q.id]);
        return `${q.prompt}\n${selected?.label ?? "(unanswered)"}`;
      })
      .join("\n\n");

    try {
      await submitContactInquiry({
        first_name: name,
        email,
        organization,
        subject: `${config.topicLabel} — Assessment Result: ${tier.label}`,
        message: `Score: ${score()}\nResult: ${tier.label} — ${tier.description}\n\n${breakdown}`,
        marketing_consent: agreed,
        ...(turnstileToken && { "cf-turnstile-response": turnstileToken }),
      });
      setSubmitted(true);
    } catch (err) {
      turnstileRef.current?.reset();
      setError(errorText(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const tier = resultTier();
    return (
      <div className="bg-[#EAF3FB] rounded-3xl px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center text-center gap-4">
        <span className="w-14 h-14 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="text-[#1A274F] text-xl font-bold">{tier.label}</h3>
        <p className="text-[#374151] text-sm leading-relaxed max-w-md">{tier.description}</p>
        <p className="text-[#6B7280] text-xs">A member of our team will be in touch at {email} shortly.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[680px] mx-auto bg-[#EAF3FB] rounded-3xl px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-[#1A274F] text-[26px] sm:text-[30px] font-extrabold mb-2 leading-tight">{config.title}</h2>
      <p className="text-[#374151] text-sm leading-relaxed mb-6">{config.intro}</p>

      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-8">
        {[...config.questions, { id: "lead" }].map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#0066FF]" : "bg-black/10"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[#1A274F] text-lg font-semibold mb-5">{question.prompt}</p>
            <div className="flex flex-col gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => selectAnswer(opt.value)}
                  className="text-left px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[#374151] text-sm font-medium hover:border-[#0066FF] hover:bg-[#0066FF]/5 transition-colors cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-5 text-[#6B7280] text-sm font-medium hover:text-[#1A274F] transition-colors cursor-pointer"
              >
                ← Back
              </button>
            )}
          </motion.div>
        )}

        {onLeadStep && (
          <motion.form
            key="lead"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <p className="text-[#1A274F] text-lg font-semibold">Where should we send your result?</p>
            <input
              required
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20"
            />
            <input
              required
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20"
            />
            <input
              type="text"
              placeholder="Company (optional)"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20"
            />
            <IcentraCheckbox checked={agreed} onChange={setAgreed} />
            <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <div className="flex items-center gap-4 mt-1">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-[#6B7280] text-sm font-medium hover:text-[#1A274F] transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 rounded-full bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#25429A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? "Scoring…" : "Get my result"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
