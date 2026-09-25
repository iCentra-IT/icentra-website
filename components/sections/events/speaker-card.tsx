import { StaggerItem } from "@/components/ui/motion/reveal";
import { pillarStyles, type Speaker } from "@/lib/data/events";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * SpeakerCard
 * Initials avatar + name/role + pull quote + session tag. Must sit inside a StaggerGroup.
 */
export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <StaggerItem className="bg-white rounded-xl border border-[#DCE0E8] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="shrink-0 w-11 h-11 rounded-full bg-main text-white text-sm font-bold flex items-center justify-center">
          {initials(speaker.name)}
        </span>
        <div>
          <p className="text-[#1A274F] text-base font-bold leading-tight">{speaker.name}</p>
          <p className="text-[#6B7280] text-sm">{speaker.role}</p>
        </div>
      </div>
      <p className="text-[#374151] text-sm leading-relaxed">&ldquo;{speaker.quote}&rdquo;</p>
      <span className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${pillarStyles[speaker.pillar]}`}>
        {speaker.tag}
      </span>
    </StaggerItem>
  );
}
