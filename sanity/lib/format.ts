// Small formatting helpers shared by anything rendering Sanity post data.

const WORDS_PER_MINUTE = 200;

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${day}${suffix} ${month} ${date.getFullYear()}`;
}

// Portable Text blocks in, "N min" read time out — WP posts have no stored
// reading time, so this estimates one from the body word count.
export function estimateReadTime(body: unknown): string {
  if (!Array.isArray(body)) return "2 min";

  const wordCount = body.reduce((total: number, block) => {
    if (
      typeof block === "object" &&
      block !== null &&
      "children" in block &&
      Array.isArray((block as { children: unknown }).children)
    ) {
      const text = (block as { children: { text?: string }[] }).children
        .map((child) => child.text || "")
        .join(" ");
      return total + text.split(/\s+/).filter(Boolean).length;
    }
    return total;
  }, 0);

  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

// Same estimate, but from the plain-text projection ("plainBody": pt::text(body))
// used by list queries — avoids fetching the full portable-text body just to
// show a read time on a card.
export function estimateReadTimeFromText(text: string | null | undefined): string {
  if (!text) return "2 min";
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min`;
}
