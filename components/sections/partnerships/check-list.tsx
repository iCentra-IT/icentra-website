import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

interface CheckListProps {
  items: string[];
  columns?: 1 | 2;
  variant?: "check" | "cross";
}

/**
 * CheckList
 * Reusable checkmark (or cross, for "not a fit" lists) bullet list used
 * across the Partnerships pages.
 */
export default function CheckList({ items, columns = 2, variant = "check" }: CheckListProps) {
  const isCross = variant === "cross";
  return (
    <StaggerGroup
      className={`grid grid-cols-1 ${columns === 2 ? "lg:grid-cols-2" : ""} gap-x-8 gap-y-4`}
    >
      {items.map((item) => (
        <StaggerItem key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              isCross ? "bg-[#F7F9FC]" : "bg-[#EAF3FB]"
            }`}
          >
            {isCross ? (
              <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
