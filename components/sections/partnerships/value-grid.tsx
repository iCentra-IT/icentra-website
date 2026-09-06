import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";
import type { ValueProp } from "@/lib/data/partnerships";

interface ValueGridProps {
  items: ValueProp[];
}

/**
 * ValueGrid
 * Bordered title/description cards — used for "Our Value to You" on the
 * Partnership detail pages.
 */
export default function ValueGrid({ items }: ValueGridProps) {
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {items.map((item) => (
        <StaggerItem key={item.title} className="bg-white rounded-2xl border border-[#DCE0E8] p-6">
          <h4 className="text-[#1A274F] text-base font-bold mb-1.5">{item.title}</h4>
          <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
