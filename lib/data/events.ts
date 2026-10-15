/* ─────────────────────────────────────────
   EVENTS PAGE — editorial copy with no backend home of its own.

   Upcoming/past webinars, registration, and cancellation come from the
   live API (lib/api/events.ts) — see app/(main)/events/page.tsx and
   app/(main)/events/[slug]/page.tsx.
───────────────────────────────────────── */

export const TRANSFORM_GRAPHIC = "/images/event/transform-webinar.png";

/** Falls back to a neutral style for any pillar name the API returns that isn't in this list. */
export const pillarStyles: Record<string, string> = {
  "Enterprise Transformation": "bg-[#DBEAFE] text-[#1E3A8A]",
  "Cybersecurity & GRC": "bg-[#FEF3C7] text-[#92400E]",
  "Strategy & Execution": "bg-[#D1FAE5] text-[#065F46]",
  "Learning & Talent": "bg-[#EDE9FE] text-[#5B21B6]",
};
export const DEFAULT_PILLAR_STYLE = "bg-[#F7F9FC] text-[#6B7280]";

export const eventsHero = {
  headline: "Stay Ahead With Insightful\nConversations That Drive\nTransformation",
  subtext:
    "At iCentra, we don't just deliver solutions: we create platforms for meaningful dialogue, innovation, and growth. Our event series brings together industry leaders, visionaries, policymakers, innovators, and professionals to explore ideas that shape the future of work, business, governance, technology, and society.",
  extra: [
    "Through thought-provoking conversations, strategic engagements, and cutting-edge insights, iCentra Events empower individuals and organizations to adapt, evolve, and lead in an ever-changing world.",
    "Whether virtual or in-person, each event is designed to spark transformation, unlock opportunities, and inspire collaboration, delivering knowledge that drives real impact.",
  ],
};

export const aboutWebinar = {
  title: "About the Transform Webinar",
  paragraphs: [
    "The Transform Webinar is iCentra's monthly executive forum, a 90-minute virtual session bringing together senior enterprise leaders, practitioners, and decision-makers to engage with the strategic arguments driving organizational performance.",
    "Each edition is themed around a dimension of iCentra's Continuous Transformation™ framework. Sessions are CEO-moderated, panel-led, and grounded in practitioner evidence from real client engagements.",
    "The Transform Webinar is built for leaders who are responsible for making transformation work, not observing it.",
  ],
  pillars: ["Enterprise Transformation", "Cybersecurity & GRC", "Strategy & Execution", "Learning & Talent"],
};

export const inntechSummit = {
  title: "InnTech Summit",
  logo: "/images/event/inntech-summit.jpg",
  description:
    "Africa's flagship innovation and technology summit with 500+ participants. Where Innovation, Policy, and Technology Converge for Africa's Future.",
  linkLabel: "Learn more at inntechsummit.com",
  href: "https://inntechsummit.com",
};

export const speakAtWebinar = {
  title: "Speak at a Transform Webinar",
  paragraphs: [
    "Share your expertise with enterprise leaders across Africa and beyond. The Transform Webinar brings together senior decision-makers, practitioners, and innovators for monthly conversations on enterprise performance, governance, and transformation.",
    "Speakers join a CEO-moderated panel of 3–4 experts for a 90-minute virtual session. Sessions are recorded and distributed to 10,000+ enterprise professionals across iCentra's YouTube channel, newsletter, and LinkedIn network.",
  ],
};
