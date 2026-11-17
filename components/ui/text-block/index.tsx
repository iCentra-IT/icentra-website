const BULLET_RE = /^[-•*]\s*/;
const SUBHEADING_RE = /^.{1,80}:$/;

/**
 * TextBlock
 * Renders a plain-text API field (job description, event agenda, etc.).
 * Consecutive bullet-prefixed lines (-, •, *) become a `<ul>`; a short line
 * ending in ":" (e.g. "What you will do:") becomes a bold sub-heading; every
 * other line is its own paragraph. This lets one field mix narrative prose
 * with one or more bulleted sections — e.g. a job description that opens
 * with context paragraphs, then lists responsibilities — without needing
 * separate backend fields for each part.
 */
export default function TextBlock({ text }: { text: string }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  type Block = { type: "bullets"; items: string[] } | { type: "subheading" | "paragraph"; text: string };
  const blocks: Block[] = [];

  for (const line of lines) {
    if (BULLET_RE.test(line)) {
      const item = line.replace(BULLET_RE, "");
      const last = blocks[blocks.length - 1];
      if (last?.type === "bullets") last.items.push(item);
      else blocks.push({ type: "bullets", items: [item] });
    } else {
      blocks.push({ type: SUBHEADING_RE.test(line) ? "subheading" : "paragraph", text: line });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        if (block.type === "bullets") {
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "subheading") {
          return (
            <p key={i} className="text-[#1A274F] text-base font-bold">
              {block.text}
            </p>
          );
        }
        return (
          <p key={i} className="text-[#374151] text-base leading-[1.9]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
