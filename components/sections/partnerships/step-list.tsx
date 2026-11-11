import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { EngagementStep } from "@/lib/data/partnerships";

interface StepListProps {
  steps: EngagementStep[];
  /** "row" lays steps out side by side (used for the hub's 4-step rhythm); "column" stacks them (used for a partnership's longer 5-step process). */
  layout?: "row" | "column";
  italic?: boolean;
}

/**
 * StepList
 * Numbered "01 / title / description" cards — the shared "How It Works"
 * pattern used on the Partnerships hub and every partnership detail page.
 */
export default function StepList({ steps, layout = "column", italic = false }: StepListProps) {
  return (
    <StaggerGroup className={`flex flex-col md:flex-row md:items-stretch gap-4 ${layout === "row" ? "md:flex-row" : ""}`}>
      {steps.map((step, i) => (
        <div key={step.title} className={layout === "row" ? "flex-1 flex items-stretch gap-4 min-w-0" : ""}>
          <StaggerItem
            className={`bg-white rounded-2xl border border-[#DCE0E8] p-6 flex gap-5 items-start flex-1 min-w-0 ${
              layout === "column" ? "flex-col" : ""
            }`}
          >
            <span className="shrink-0 w-11 h-11 rounded-xl bg-[#1A274F] text-white text-base font-extrabold flex items-center justify-center">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="text-[#1A274F] text-base font-bold mb-1.5">{step.title}</h4>
              <p className={`text-[#6B7280] text-sm leading-relaxed ${italic ? "italic" : ""}`}>
                {step.description}
              </p>
            </div>
          </StaggerItem>
          {/* Connecting arrow — row layout only, not after the last step */}
          {layout === "row" && i < steps.length - 1 && (
            <svg className="hidden md:block w-5 h-5 text-[#0066FF]/40 shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </StaggerGroup>
  );
}
