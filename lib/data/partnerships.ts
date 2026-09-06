/* ─────────────────────────────────────────
   PARTNERSHIP PROGRAMS — single source of truth for:
   - /what-we-do/partnerships (hub)
   - /what-we-do/partnerships/[category] (individual partnership)

   Swap this file for a Sanity query later without touching page markup,
   keep the shape identical.
───────────────────────────────────────── */

export interface ComparisonRow {
  project: string;
  partnership: string;
}

export interface EngagementStep {
  title: string;
  description: string;
}

export interface ValueProp {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  priceNaira?: string;
  included: string;
}

export interface Partnership {
  slug: string;
  image: string;
  eyebrow: string;
  name: string;
  /** Parenthetical descriptor shown next to the name, e.g. "PMO-as-a-Service" */
  subtitle?: string;
  /** Short punchy line — used on the hub card hover and the detail hero */
  tagline: string;
  /** Short blurb for the hub card */
  description: string;
  integratedLine: string;

  // Detail page content
  heroParagraph: string;
  heroCtaLabel: string;
  typicalBuyer: string;
  whoFor: string[];
  whyICentra: string;
  valueProps: ValueProp[];
  howItWorks: EngagementStep[];
  deliverables: string[];
  businessOutcomes: string[];
  tiers: PricingTier[];
}

export const DISCOVERY_EMAIL = "solutions@icentra.com";

export const partnershipsHub = {
  eyebrow: "Enterprise Partnerships · Retainer-Based Engagements",
  heroHeadline: "One Partner.\nEvery Dimension of Transformation.",
  heroSubtext:
    "Most organizations hire consultants for projects. iCentra's partners stay for the work that actually matters: governing AI adoption, delivering the portfolio, maintaining compliance, building the workforce. Four disciplines. One committed partnership.",

  whyIntro: [
    "The reason transformation initiatives stall isn't strategy, it's sustainability. A project ends. The capability it was supposed to build often doesn't survive it. A partnership is different.",
    "iCentra's partnership model gives your organization continuous access to expert capability in the four disciplines your transformation depends on. Each engagement operates as a monthly retainer, building institutional knowledge of your business, not starting from scratch with every engagement cycle.",
    "You can start with one partnership. You can run all four. Either way, you get a partner who stays accountable for outcomes, not just outputs.",
  ],

  comparisonRows: [
    { project: "Defined scope, fixed end date", partnership: "Ongoing scope that evolves with your priorities" },
    { project: "Handover at completion", partnership: "Continuous delivery and accountability" },
    { project: "Knowledge leaves with the team", partnership: "Institutional knowledge builds over time" },
    { project: "Outputs (reports, frameworks)", partnership: "Outcomes (adoption, performance, resilience)" },
    { project: "You manage implementation", partnership: "We stay accountable through implementation" },
  ] satisfies ComparisonRow[],

  partnershipsIntro:
    "Each partnership is structured around a specific discipline and a specific buyer. Navigate to the right one for your role and your challenge.",

  integratedIntro:
    "Each partnership addresses one dimension of organizational performance. Together, they form a coordinated continuous transformation operating model.",
  integratedChecklist: [
    "A governed AI strategy actively being executed through a disciplined portfolio",
    "Compliance and governance frameworks that don't lag behind AI adoption",
    "A workforce with the capability to actually deliver on what the strategy commits to",
    "One partner who sees across all four dimensions and keeps them aligned",
  ],
  integratedNote:
    "Organizations running two or more partnerships receive coordinated program leadership and a unified performance dashboard at no additional cost.",

  multiPartnershipDiscount:
    "Organizations engaging two or more partnerships receive a coordinated program structure and a 10–15% combined retainer reduction. Speak to us about a program quote.",

  howItWorksIntro:
    "Every partnership follows a consistent rhythm. Scope adapts to your organization, the operating cadence doesn't.",
  engagementSteps: [
    {
      title: "Discovery & Baseline",
      description:
        "A dedicated iCentra partner team conducts an immersive assessment of your current state in the chosen discipline. Pain points are mapped. Success metrics are agreed. The operating model for your partnership is designed.",
    },
    {
      title: "Operating Model Launch",
      description:
        "Governance frameworks, reporting cadences, and delivery infrastructure are stood up. Your team and ours establish working rhythms. The first deliverables are completed within the engagement period.",
    },
    {
      title: "Ongoing Delivery & Advisory",
      description:
        "Monthly delivery, advisory, and performance reporting, with full access to your dedicated partner team. You have a named point of accountability, not a rotating cast of consultants.",
    },
    {
      title: "Maturity Review",
      description:
        "A structured review of progress against your transformation goals. New opportunities are identified. Scope evolves as your organization's maturity grows. The partnership deepens, not restarts.",
    },
  ] satisfies EngagementStep[],

  goodFit: [
    "Are in an active or planned transformation cycle, digital, organizational, or both",
    "Have C-suite commitment to measurable outcomes, not just activity",
    "Want a partner with skin in the game, not a vendor at arm's length",
    "Are large enough to have dedicated functions (IT, PMO, Compliance, HR/L&D) but lean enough to benefit from external expertise",
    "Operate in regulated or governance-intensive industries, financial services, government, energy, healthcare, or critical infrastructure",
  ],
  notFit: [
    "Organizations looking for a one-off training event or a single-deliverable project",
    "Teams that need hands-on technical implementation without strategic oversight",
    "Organizations not yet ready to commit to outcome measurement",
  ],

  discoveryTitle: "Not Sure Where to Start?",
  discoverySubtext:
    "Book a 30-minute Discovery Call. We will listen to your priorities, identify the right partnership entry point, and give you an honest view of where iCentra can create the most value for your organization.",
};

export const partnerships: Partnership[] = [
  {
    slug: "ai-transformation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    eyebrow: "Enterprise Transformation · Retainer / Phased Program",
    name: "AI Transformation Partnership™",
    tagline: "From AI Experiments to Governed Enterprise Value",
    description:
      "We build the strategy, governance, and workforce enablement that make AI adoption durable, not a one-off experiment.",
    integratedLine: "Governed AI adoption at enterprise scale",

    heroParagraph:
      "Most organizations have run an AI pilot. Few have a governed path from pilot to enterprise value. iCentra's AI Transformation Partnership takes you from readiness assessment to prioritized use cases to workforce-wide adoption, with the governance in place so AI adoption doesn't outrun your risk appetite.",
    heroCtaLabel: "Start Your AI Readiness Assessment",
    typicalBuyer: "CIO / Chief Data & AI Officer",
    whoFor: [
      "CIOs and Chief Data/AI Officers under board pressure to show a credible AI strategy",
      "Organizations with scattered AI pilots and no enterprise-wide prioritization",
      "Leadership teams that need AI governance before scaling adoption, not after",
    ],
    whyICentra:
      "We don't just run a pilot and hand you a slide deck, we build the governance, use-case portfolio, and workforce capability that make AI adoption durable, not a one-off experiment.",
    valueProps: [
      {
        title: "Governed Adoption",
        description: "Move from experimentation to enterprise-wide AI use with governance built in from day one.",
      },
      {
        title: "Prioritized Use-Case Portfolio",
        description: "Stop chasing every AI idea, focus investment on the use cases with real business value.",
      },
      {
        title: "Reduced AI Risk Exposure",
        description: "Responsible-AI governance and risk frameworks keep adoption within your risk appetite.",
      },
      {
        title: "Workforce Enablement",
        description: "Your teams use AI tools with confidence, not just your innovation lab.",
      },
    ],
    howItWorks: [
      {
        title: "Readiness Assessment",
        description: "Evaluate strategy, data, governance, technology, use cases, and workforce readiness for AI.",
      },
      {
        title: "Use-Case Portfolio & Prioritization",
        description: "Identify and rank AI use cases by business value and feasibility.",
      },
      { title: "Governance Design", description: "Establish AI governance and responsible-AI guardrails before scaling." },
      {
        title: "Pilots & Automation Deployment",
        description: "Run prioritized pilots and deploy intelligent process automation.",
      },
      { title: "Workforce Enablement", description: "Train and equip teams to use AI tools with confidence." },
    ],
    deliverables: [
      "AI strategy",
      "Prioritized use-case portfolio",
      "AI governance framework",
      "Pilot roadmap",
      "Benefits dashboard",
      "Workforce enablement plan",
    ],
    businessOutcomes: [
      "Faster, governed AI adoption",
      "Reduced AI risk exposure",
      "Measurable value from AI use cases",
      "Workforce confident using AI tools",
    ],
    tiers: [
      {
        name: "Essentials",
        price: "$3,000/month",
        priceNaira: "~₦1,400,000/month",
        included: "AI Readiness Assessment + Strategy & Roadmap. Monthly advisory office hours.",
      },
      {
        name: "Standard",
        price: "$8,000/month",
        priceNaira: "~₦3,800,000/month",
        included: "Essentials + use-case portfolio, governance framework design, pilot oversight.",
      },
      {
        name: "Enterprise",
        price: "Custom, starting from $18,000/month",
        priceNaira: "~₦8,500,000/month",
        included: "Embedded governance, multi-use-case build support, workforce enablement at scale.",
      },
    ],
  },
  {
    slug: "pmocentra",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
    eyebrow: "Strategy & Execution · Retainer → Platform Roadmap",
    name: "PMOCentra™",
    subtitle: "PMO-as-a-Service",
    tagline: "Your Projects. Our Expertise. Guaranteed Results.",
    description:
      "An on-demand, fully managed PMO (people, process, and technology) without the overhead of building in-house.",
    integratedLine: "Disciplined delivery of project portfolio",

    heroParagraph:
      "Building an in-house PMO is costly and slow. With PMOCentra, you get an on-demand, fully managed PMO that delivers the people, process, and technology you need, without the overhead. Your projects get delivered on time, on budget, and aligned with strategy, whether you're running one programme or a global portfolio.",
    heroCtaLabel: "Get a PMO Without the Overhead",
    typicalBuyer: "COO / Head of PMO",
    whoFor: [
      "COOs and Heads of PMO whose projects are fragmented across teams with no central visibility",
      "Organizations where strategic initiatives consistently underperform or stall",
      "Companies that need PMO discipline but can't justify a full in-house build",
    ],
    whyICentra:
      "We ensure your projects are delivered on time, on budget, and aligned with strategic goals, whether you're running one programme or a global portfolio.",
    valueProps: [
      {
        title: "Instant PMO Capability",
        description: "Launch or enhance your PMO without the delays of building from scratch.",
      },
      {
        title: "Expert-Driven Governance",
        description: "Proven frameworks that ensure consistent delivery and measurable results.",
      },
      {
        title: "Technology-Enabled Delivery",
        description: "Dashboards, reporting tools, and automation for real-time portfolio insight.",
      },
      {
        title: "Cost-Effective",
        description: "Reduce PMO setup and operating costs while maintaining top-tier delivery quality.",
      },
    ],
    howItWorks: [
      {
        title: "PMO Maturity Baseline",
        description: "Assess your current project delivery environment, pain points, and objectives.",
      },
      { title: "Operating Model Design", description: "Establish governance framework, processes, and reporting templates." },
      { title: "Portfolio Governance", description: "Stand up prioritization, alignment, and risk oversight across initiatives." },
      {
        title: "Recurring Reporting & Assurance",
        description: "Monthly dashboards, portfolio performance reports, risk and issue logs.",
      },
      { title: "Benefits Reviews", description: "Track whether projects are actually delivering the value they promised." },
    ],
    deliverables: [
      "PMO playbook",
      "Governance cadence",
      "Portfolio dashboard",
      "Project assurance reports",
      "Benefits realization reports",
    ],
    businessOutcomes: [
      "Faster strategy execution",
      "Better portfolio visibility",
      "Higher project success rates",
      "Better investment decisions",
    ],
    tiers: [
      {
        name: "Essentials",
        price: "$2,500/month",
        priceNaira: "~₦1,200,000/month",
        included: "Governance framework setup, quarterly portfolio reporting.",
      },
      {
        name: "Standard",
        price: "$7,000/month",
        priceNaira: "~₦3,300,000/month",
        included: "Monthly reporting, on-demand PMO experts, portfolio dashboards.",
      },
      {
        name: "Enterprise",
        price: "Custom, starting from $15,000/month",
        priceNaira: "~₦7,000,000/month",
        included: "Dedicated PMO manager, continuous governance, real-time performance analytics.",
      },
    ],
  },
  {
    slug: "complycentra",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
    eyebrow: "Cybersecurity & GRC · Retainer → Platform Roadmap",
    name: "ComplyCentra™",
    subtitle: "Compliance-as-a-Service",
    tagline: "Build Trust. Stay Compliant. Be Audit-Ready.",
    description:
      "ISO certification is a milestone. Maintaining it is a competitive advantage. We keep your program effective and audit-ready, continuously.",
    integratedLine: "Governance and data compliance built in",

    heroParagraph:
      "Achieving ISO or data-protection compliance is a milestone. Maintaining it is a competitive advantage. ComplyCentra gives you ongoing access to experienced consultants who keep your compliance program effective, audit-ready, and aligned with global best practice, today as a retainer, evolving into an automated platform as your program matures.",
    heroCtaLabel: "Start Your Compliance Journey",
    typicalBuyer: "Chief Compliance Officer / General Counsel",
    whoFor: [
      "Organizations pursuing or maintaining ISO 27001, 9001, or 22301 certification",
      "Organizations handling personal data subject to GDPR or NDPR",
      "Mid-to-large enterprises without a dedicated in-house compliance function",
      "Regulated industries facing recurring audit cycles",
    ],
    whyICentra:
      "We don't just prepare you for audits, we embed a culture of continuous improvement that reduces risk, strengthens governance, and builds customer confidence.",
    valueProps: [
      {
        title: "End-to-End Oversight",
        description: "From assessments to audits, we proactively manage every step of your compliance journey.",
      },
      {
        title: "Reduced Risk of Non-Compliance",
        description: "Spot and resolve issues before they impact certification or operations.",
      },
      {
        title: "Predictable & Sustainable Costs",
        description: "Access expertise on retainer without the overhead of full-time hires.",
      },
      {
        title: "Stronger Trust",
        description: "Demonstrable commitment to quality, security, and governance for customers and partners.",
      },
    ],
    howItWorks: [
      {
        title: "Compliance Baseline",
        description: "Baseline and periodic compliance health checks against your target frameworks.",
      },
      { title: "Framework Implementation", description: "Stand up the policies, controls, and documentation your standards require." },
      { title: "Control Monitoring", description: "Ongoing monitoring so drift gets caught before an auditor finds it." },
      { title: "Evidence Management", description: "A digital evidence repository that makes audits fast, not frantic." },
      { title: "Risk & Audit Reviews", description: "Scheduled internal audits, mock audits, and remediation support." },
    ],
    deliverables: [
      "Compliance register",
      "Control library",
      "Risk dashboard",
      "Audit-readiness reports",
      "Policy suite",
      "Management review packs",
    ],
    businessOutcomes: [
      "Reduced regulatory and audit risk",
      "Faster time-to-certification",
      "Stronger customer and partner trust",
      "Lower cost of continuous compliance",
    ],
    tiers: [
      {
        name: "Essentials",
        price: "$1,800/month",
        priceNaira: "~₦850,000/month",
        included: "1 ISO standard, quarterly health checks, 1 internal audit/year, shared consultant team.",
      },
      {
        name: "Standard",
        price: "$4,000/month",
        priceNaira: "~₦1,900,000/month",
        included: "Certification/renewal prep, monthly health checks, priority support, monthly dashboard.",
      },
      {
        name: "Enterprise",
        price: "Custom, scoped to standards, sites, and headcount",
        included: "Multi-standard/multi-site, continuous monitoring, dedicated named consultant, board-ready reporting.",
      },
    ],
  },
  {
    slug: "workforce-capability",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80",
    eyebrow: "Learning & Talent · Retainer",
    name: "Workforce Capability Partnerships™",
    tagline: "Build the Workforce Your Transformation Needs",
    description:
      "We align capability building directly to your transformation priorities, from assessment to certification to measurable business impact.",
    integratedLine: "The people ready to execute and adopt",

    heroParagraph:
      "Transformation initiatives don't fail because of strategy, they fail because the workforce isn't ready. Workforce Capability Partnerships aligns capability building directly to your transformation priorities, from a capability assessment through certification pathways to a measurable capability scorecard.",
    heroCtaLabel: "Build Your Capability Roadmap",
    typicalBuyer: "CHRO / CLO",
    whoFor: [
      "CHROs and CLOs facing skills gaps that put transformation initiatives at risk",
      "Organizations with fragmented, ad hoc training and no coordinated capability plan",
      "Companies that need a stronger leadership pipeline to execute on strategy",
    ],
    whyICentra:
      "We don't sell generic training, we build a capability program tied directly to the transformation priorities your leadership is already committed to.",
    valueProps: [
      {
        title: "Strategy-Aligned Capability",
        description: "Every learning investment ties back to a transformation priority, not a generic course catalog.",
      },
      {
        title: "Stronger Leadership Pipeline",
        description: "Build the bench you need for the next stage of growth, not just today's roles.",
      },
      {
        title: "Higher Adoption",
        description: "Workforce that's genuinely capable of adopting new ways of working, not just trained on paper.",
      },
      {
        title: "Measurable ROI",
        description: "A capability scorecard that shows the business impact of the investment.",
      },
    ],
    howItWorks: [
      {
        title: "Capability Assessment",
        description: "Identify capability gaps against your transformation and strategic priorities.",
      },
      { title: "Learning Roadmap", description: "Build an annual plan that sequences capability building against business need." },
      {
        title: "Academy & Certification Pathways",
        description: "Structured pathways, not one-off courses, with recognized certification.",
      },
      { title: "Ongoing Delivery", description: "Continuous program delivery, not a single training event." },
      { title: "Impact Measurement", description: "Track capability growth against a scorecard tied to business outcomes." },
    ],
    deliverables: [
      "Capability framework",
      "Annual learning plan",
      "Curated programs",
      "Certification roadmap",
      "Capability scorecard",
    ],
    businessOutcomes: [
      "Workforce ready for transformation priorities",
      "Stronger leadership pipeline",
      "Higher adoption of new ways of working",
      "Measurable capability ROI",
    ],
    tiers: [
      {
        name: "Essentials",
        price: "$2,500/month",
        priceNaira: "~₦1,200,000/month",
        included: "Capability assessment and learning roadmap, up to 200 learners.",
      },
      {
        name: "Standard",
        price: "$6,000/month",
        priceNaira: "~₦2,800,000/month",
        included: "Adds competency frameworks and leadership pipeline design, up to 500 learners.",
      },
      {
        name: "Enterprise",
        price: "Custom, starting from $12,000/month",
        priceNaira: "~₦5,600,000/month",
        included: "Full capability partnership with workforce analytics, unlimited learner population.",
      },
    ],
  },
];

export function getPartnershipBySlug(slug: string) {
  return partnerships.find((partnership) => partnership.slug === slug);
}
