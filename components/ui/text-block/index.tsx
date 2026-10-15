/**
 * TextBlock
 * Renders a plain-text API field (job description, event agenda, etc.) as
 * paragraphs, or as a bulleted list when every line already starts like one.
 */
export default function TextBlock({ text }: { text: string }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  const isBulleted = lines.every((line) => /^[-•*]\s*/.test(line));
  if (isBulleted) {
    return (
      <ul className="flex flex-col gap-2.5">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[#374151] text-base leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
            {line.replace(/^[-•*]\s*/, "")}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {lines.map((line, i) => (
        <p key={i} className="text-[#374151] text-base leading-[1.9]">
          {line}
        </p>
      ))}
    </div>
  );
}
