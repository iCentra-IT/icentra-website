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
    <StaggerGroup className={`flex flex-col md:flex-row gap-4 ${layout === "row" ? "md:flex-row" : ""}`}>
      {steps.map((step, i) => (
        <StaggerItem
          key={step.title}
          className={`bg-white rounded-2xl border border-[#DCE0E8] p-6 flex gap-5 items-start ${
            layout === "column" ? "flex-col flex-1" : ""
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
      ))}
    </StaggerGroup>
  );
}
