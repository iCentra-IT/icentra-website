import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { PricingTier } from "@/lib/data/partnerships";

interface PricingTableProps {
  tiers: PricingTier[];
}

/**
 * PricingTable
 * The "Engagement Options" tier table (Tier / Price / What's Included)
 * used on every Partnership detail page.
 */
export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="rounded-2xl border border-[#DCE0E8] overflow-hidden">
      <div className="hidden sm:grid grid-cols-[140px_220px_1fr] bg-white border-b border-[#DCE0E8]">
        <div className="px-6 py-3">
          <span className="text-[#6B7280] text-xs font-bold uppercase tracking-[0.08em]">Tier</span>
        </div>
        <div className="px-6 py-3">
          <span className="text-[#6B7280] text-xs font-bold uppercase tracking-[0.08em]">Price</span>
        </div>
        <div className="px-6 py-3">
          <span className="text-[#6B7280] text-xs font-bold uppercase tracking-[0.08em]">What&apos;s Included</span>
        </div>
      </div>

      <StaggerGroup>
        {tiers.map((tier, i) => (
          <StaggerItem
            key={tier.name}
            className={`grid grid-cols-1 sm:grid-cols-[140px_220px_1fr] gap-2 sm:gap-0 px-6 py-5 ${
              i !== 0 ? "border-t border-[#DCE0E8]" : ""
            } ${i % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white"}`}
          >
            <div>
              <span className="text-[#0066FF] text-sm font-bold">{tier.name}</span>
            </div>
            <div>
              <span className="text-[#1A274F] text-sm font-semibold block">{tier.price}</span>
              {tier.priceNaira && <span className="text-[#9CA3AF] text-xs">{tier.priceNaira}</span>}
            </div>
            <div>
              <span className="text-[#6B7280] text-sm leading-relaxed">{tier.included}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
