import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { ComparisonRow } from "@/lib/data/partnerships";

interface ComparisonTableProps {
  rows: ComparisonRow[];
}

/**
 * ComparisonTable
 * "Project vs. Partnership" row comparison used on the Partnerships hub.
 */
export default function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="rounded-2xl border border-[#DCE0E8] overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] bg-white border-b border-[#DCE0E8]">
        <div className="px-6 py-4">
          <span className="text-[#6B7280] text-sm font-bold uppercase tracking-[0.05em]">Project</span>
        </div>
        <div className="px-4 py-4" />
        <div className="px-6 py-4 bg-[#EAF3FB]">
          <span className="text-[#0066FF] text-sm font-bold uppercase tracking-[0.05em]">Partnership</span>
        </div>
      </div>

      <StaggerGroup>
        {rows.map((row, i) => (
          <StaggerItem
            key={row.project}
            className={`grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch sm:items-center ${
              i !== 0 ? "border-t border-[#DCE0E8]" : ""
            }`}
          >
            <div className={`px-6 py-4 flex items-center ${i % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white"}`}>
              <span className="text-[#6B7280] text-sm leading-relaxed">{row.project}</span>
            </div>
            <div className="hidden sm:flex items-center justify-center px-3">
              <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <div className="px-6 py-4 bg-[#EAF3FB]">
              <span className="text-[#1A274F] text-sm font-semibold leading-relaxed">{row.partnership}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
