import { StaggerGroup, StaggerItem } from "@/components/ui/motion/reveal";

interface BulletListProps {
  items: string[];
  columns?: 1 | 2;
}

/**
 * BulletList
 * Plain dot-bullet list — used for "Who This Is For" and "Core Deliverables"
 * across the Partnership detail pages.
 */
export default function BulletList({ items, columns = 1 }: BulletListProps) {
  return (
    <StaggerGroup className={`grid grid-cols-1 ${columns === 2 ? "sm:grid-cols-2" : ""} gap-x-8 gap-y-3`}>
      {items.map((item) => (
        <StaggerItem key={item} className="flex items-start gap-2.5">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
          <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
