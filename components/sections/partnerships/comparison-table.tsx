import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { ComparisonRow } from "@/lib/data/partnerships";

interface ComparisonTableProps {
  rows: ComparisonRow[];
}

/**
 * ComparisonTable
 * "The Project Trap" vs. "The Partnership Model" — two stacked panels rather
 * than a thin row-table, so the contrast reads at a glance while each row
 * still pairs directly (same index, same vertical position in both panels).
 */
export default function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* ── Project panel — muted, each line undercut by what it lacks ── */}
      <div className="rounded-2xl border border-[#DCE0E8] bg-white p-7 lg:p-8">
        <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-[0.1em] mb-6">The Project Trap</p>
        <StaggerGroup className="flex flex-col gap-5">
          {rows.map((row) => (
            <StaggerItem key={row.project} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#F7F9FC] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <span className="text-[#6B7280] text-sm leading-relaxed">{row.project}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* ── Partnership panel — the model iCentra is pitching ── */}
      <div className="rounded-2xl border border-[#0066FF]/30 bg-[#EAF3FB] p-7 lg:p-8 lg:shadow-[0_8px_30px_rgba(0,102,255,0.08)]">
        <p className="text-[#0066FF] text-xs font-bold uppercase tracking-[0.1em] mb-6">The Partnership Model</p>
        <StaggerGroup className="flex flex-col gap-5">
          {rows.map((row) => (
            <StaggerItem key={row.partnership} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-[#1A274F] text-sm font-semibold leading-relaxed">{row.partnership}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
