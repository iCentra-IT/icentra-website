/* ─────────────────────────────────────────
   EVENTS — single source of truth for /events

   Swap this file for a Sanity query later without touching page markup,
   keep the shape identical.
───────────────────────────────────────── */

export type Pillar =
  | "Enterprise Transformation"
  | "Cybersecurity & GRC"
  | "Strategy & Execution"
  | "Learning & Talent";

export const pillarStyles: Record<Pillar, string> = {
  "Enterprise Transformation": "bg-[#DBEAFE] text-[#1E3A8A]",
  "Cybersecurity & GRC": "bg-[#FEF3C7] text-[#92400E]",
  "Strategy & Execution": "bg-[#D1FAE5] text-[#065F46]",
  "Learning & Talent": "bg-[#EDE9FE] text-[#5B21B6]",
};

export const TRANSFORM_GRAPHIC = "/images/event/transform-webinar.png";

export const eventsHero = {
  headline: "Stay Ahead With Insightful\nConversations That Drive\nTransformation",
  subtext:
    "At iCentra, we don't just deliver solutions: we create platforms for meaningful dialogue, innovation, and growth. Our event series brings together industry leaders, visionaries, policymakers, innovators, and professionals to explore ideas that shape the future of work, business, governance, technology, and society.",
  extra: [
    "Through thought-provoking conversations, strategic engagements, and cutting-edge insights, iCentra Events empower individuals and organizations to adapt, evolve, and lead in an ever-changing world.",
    "Whether virtual or in-person, each event is designed to spark transformation, unlock opportunities, and inspire collaboration, delivering knowledge that drives real impact.",
  ],
};

export const upcomingWebinar = {
  seriesLabel: "Transform Webinar",
  monthLabel: "September 2026",
  pillar: "Enterprise Transformation" as Pillar,
  title: "The Transformation Agenda: Building Organizations That Adapt, Perform, and Thrive",
  schedule: "September 24, 2026 · 3:00 pm WAT · 2:00 pm GMT · 9:00 am EST · 90 min · Virtual",
  description: [
    "CEO-moderated panel on Continuous Transformation™: practitioner evidence, the Enterprise Alignment diagnostic, and why Q4 2026 is the strategic window.",
    "Most organizations describe transformation as something they did. Past tense. That framing is the problem. It is the starting point for September's Transform Webinar.",
  ],
  hostNote: "Taopheek Babayeju, CEO · + 2 CXO panelists · Q&A included",
  /** Event graphic (1200 × 628). When omitted, a branded navy block with the title is shown. */
  image: undefined as string | undefined,
};

export const aboutWebinar = {
  title: "About the Transform Webinar",
  paragraphs: [
    "The Transform Webinar is iCentra's monthly executive forum, a 90-minute virtual session bringing together senior enterprise leaders, practitioners, and decision-makers to engage with the strategic arguments driving organizational performance.",
    "Each edition is themed around a dimension of iCentra's Continuous Transformation™ framework. Sessions are CEO-moderated, panel-led, and grounded in practitioner evidence from real client engagements.",
    "The Transform Webinar is built for leaders who are responsible for making transformation work, not observing it.",
  ],
  pillars: [
    "Enterprise Transformation",
    "Cybersecurity & GRC",
    "Strategy & Execution",
    "Learning & Talent",
  ] as Pillar[],
};

export const inntechSummit = {
  title: "InnTech Summit",
  logo: "/images/event/inntech-summit.jpg",
  description:
    "Africa's flagship innovation and technology summit with 500+ participants. Where Innovation, Policy, and Technology Converge for Africa's Future.",
  linkLabel: "Learn more at inntechsummit.com",
  href: "https://inntechsummit.com",
};

export interface PastWebinar {
  title: string;
  date: string;
  /** Event graphic; falls back to the TRANSFORM brand graphic. */
  image?: string;
  /** Recording URL. Until provided, the card links to the recap in News. */
  videoUrl?: string;
}

export const pastWebinarsIntro =
  "The Transform Webinar series resumed in September 2026 following a summer planning period. The series returns monthly through Q4 2026 with sessions themed around Enterprise Transformation, Cybersecurity & GRC, Strategy & Execution, and Learning & Talent.";

export const pastWebinars: PastWebinar[] = [
  { title: "Strategic PMO as Value Management Office", date: "Apr 2, 2026" },
  { title: "Industry Leaders Redefine the Role of PMOs at iCentra's Transform Webinar", date: "Mar 5, 2026" },
  { title: "Integrating Information Security into Your Organizational Culture", date: "Feb 2026" },
  { title: "Reimagining Business Value: Why Agility Matters", date: "Jun 26, 2025" },
  { title: "Digital Transformation as Organizational Culture", date: "May 2025" },
];

export interface Speaker {
  name: string;
  role: string;
  quote: string;
  pillar: Pillar;
  tag: string;
}

export const speakers: Speaker[] = [
  {
    name: "Taopheek Babayeju",
    role: "CEO, iCentra",
    quote: "Governance is not a constraint. It is the infrastructure that makes transformation sustainable.",
    pillar: "Enterprise Transformation",
    tag: "ET · Mar 2026",
  },
];

export const speakAtWebinar = {
  title: "Speak at a Transform Webinar",
  paragraphs: [
    "Share your expertise with enterprise leaders across Africa and beyond. The Transform Webinar brings together senior decision-makers, practitioners, and innovators for monthly conversations on enterprise performance, governance, and transformation.",
    "Speakers join a CEO-moderated panel of 3–4 experts for a 90-minute virtual session. Sessions are recorded and distributed to 10,000+ enterprise professionals across iCentra's YouTube channel, newsletter, and LinkedIn network.",
  ],
};
