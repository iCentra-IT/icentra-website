/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
export function getYearsOfExperience(
  startYear = 2009,
  anchorMonth = 10, // October
  anchorDay = 19
) {
  const now = new Date();
  const anchor = new Date(now.getFullYear(), anchorMonth - 1, anchorDay);

  let years = now.getFullYear() - startYear;
  if (now < anchor) years -= 1; // this year's anniversary hasn't happened yet

  return years;
}

export const getStats = () => [
  { value: `${getYearsOfExperience()}+`, label: "Years of Excellence" },
  { value: "5000+", label: "Clients Served" },
  { value: "99.9%", label: "Success Rate" },
];

export const insightCards = [
  {
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    title: "Strategy is disconnected from execution",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "strategy-execution",
    href: "/news/strategy-execution",
    category: "Insight" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "3 min",
    slug: "workforce-capability",
    href: "/news/workforce-capability",
    category: "Insight" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "3 min",
    slug: "workforce-capability-2",
    href: "/news/workforce-capability-2",
    category: "Insight" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    title: "Workforce capability lags behind change",
    date: "2nd Sep 2025",
    readTime: "4 min",
    slug: "workforce-capability-3",
    href: "/news/workforce-capability-3",
    category: "Insight" as const,
  },
];

export const solutionCards = [
  {
    image:
      "/images/solution/continuous-transformation.png",
    title: "Continuous Transformation",
    description:
      "We help organizations build the capability to continuously evolve — from strategy through to execution and beyond.",
    href: "/what-we-do/continuous-transformation",
  },
  {
    image:
      "/images/solution/solutions.png",
    title: "Solutions",
    description:
      "End-to-end technology and business solutions tailored to your sector's specific challenges and growth ambitions.",
    href: "/what-we-do/solutions",
  },
  {
    image:
      "/images/solution/platforms.png",
    title: "Platforms",
    description:
      "Scalable digital platforms that accelerate delivery, improve visibility, and create lasting competitive advantage.",
    href: "/what-we-do/platforms",
  },
];

export const partners = [
  {
    name: "NRS",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "NNPC",
    src: "https://images.unsplash.com/photo-1614680376408-16afefa3332b?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Microsoft",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "NRS II",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 5",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 6",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 7",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
  {
    name: "Partner 8",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=120&h=40&fit=crop&q=80",
  },
];

export const projects = [
  {
    bgImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    // logoText: "NRS",
    title: "Journey to Information Security Excellence at NRS",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "/industry/case-study",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    logoText: "CSN",
    title: "Transforming Project Management at CSN",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "/industry/case-study",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    logoText: "NNPC",
    title: "Driving Agile Transformation at NNPC Limited IT Division",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "/industry/case-study",
  },
  {
    bgImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    logoText: "CSN",
    title: "Transforming Project Management at CSN",
    desc: "iCentra's Information Technology Division (ITD) embarked on a transformative journey...",
    href: "/industry/case-study",
  },
];

export const testimonials = [
  {
    name: "Crystal Maiden",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text: "This is incredibly helpful for our team. The attention to detail and quality is very amazing. I highly recommend it for any type of project.",
  },
  {
    name: "Dazzle Maker",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text: "I've used other firms, but this one is the best. The attention to detail and quality is very amazing for all designs. Highly recommend for any project.",
  },
  {
    name: "Crystal Maiden",
    role: "UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
    text: "This kit is incredibly helpful for my design process. Components are clean, modern, and save me a lot of time for beginners and experienced alike.",
  },
];

export const blogCards = [
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "The New Operating Model for Performance",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "operating-model",
    href: "/news/operating-model",
    category: "Blog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership Buy-In",
    date: "2nd Sep 2025",
    readTime: "3 min",
    slug: "ai-governance",
    href: "/news/ai-governance",
    category: "Blog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "5 AI Driven Threats Organizations Can't Ignore in 2025",
    date: "2nd Sep 2025",
    readTime: "3 min",
    slug: "ai-threats",
    href: "/news/ai-threats",
    category: "Blog" as const,
  },
];

export const spotlightCards = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    title: "iCentra Bags Global Awards",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "icentra-bags-global-awards",
    href: "/news/icentra-bags-global-awards",
    category: "Spotlight" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "ai-cybersecurity-governance",
    href: "/news/ai-cybersecurity-governance",
    category: "Spotlight" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "5-ai-driven-threats",
    href: "/news/5-ai-driven-threats",
    category: "Spotlight" as const,
  },
];

export const newsCards = [
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    title: "The New Operating Model for Sustainable Performance",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "new-operating-model",
    href: "/news/new-operating-model",
    category: "News" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
    title: "AI & Cybersecurity Governance: Getting Leadership By-In",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "ai-governance-leadership",
    href: "/news/ai-governance-leadership",
    category: "News" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    title: "5 Ai Driven Threats Organizations Can't Ignore In 2026",
    date: "2nd Sep 2025",
    readTime: "2 min",
    slug: "ai-threats-2026",
    href: "/news/ai-threats-2026",
    category: "News" as const,
  },
];

/* ─────────────────────────────────────────
   COMBINED ARTICLE LOOKUP — powers /news/[slug]
───────────────────────────────────────── */
export type Article = {
  image: string;
  title: string;
  date: string;
  readTime: string;
  slug: string;
  href: string;
  category: "Spotlight" | "News" | "Insight" | "Blog";
};

export const allArticles: Article[] = [
  ...spotlightCards,
  ...newsCards,
  ...insightCards,
  ...blogCards,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((article) => article.slug === slug);
}

/* ─────────────────────────────────────────
   JOB LISTINGS — powers /careers and /careers/[slug]
───────────────────────────────────────── */
export type JobListing = {
  slug: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobListings: JobListing[] = [
  {
    slug: "accountant",
    title: "Accountant",
    dept: "Finance (Internship)",
    location: "Remote - USA",
    type: "Internship",
    description:
      "Support the finance team with day-to-day bookkeeping, reconciliations, and reporting as part of iCentra's finance internship programme, gaining hands-on exposure to enterprise financial operations.",
    responsibilities: [
      "Assist with accounts payable and receivable processing",
      "Reconcile bank statements and general ledger entries",
      "Support month-end and year-end close activities",
      "Prepare financial reports and summaries for the finance team",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in Accounting, Finance, or a related field",
      "Working knowledge of spreadsheets and basic accounting principles",
      "Strong attention to detail and organizational skills",
      "Ability to work independently in a remote environment",
    ],
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    dept: "Technology",
    location: "Remote - USA",
    type: "Full-time",
    description:
      "Build and maintain web applications that power iCentra's client-facing platforms and internal tools, working closely with design and product teams to ship polished, reliable features.",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with designers and product managers on new features",
      "Write clean, tested, maintainable code",
      "Participate in code reviews and technical planning",
    ],
    requirements: [
      "Experience with modern JavaScript/TypeScript and a frontend framework (React or similar)",
      "Familiarity with REST APIs and version control (Git)",
      "Comfort working in a fully remote, distributed team",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    slug: "human-resources-specialist",
    title: "Human Resources Specialist",
    dept: "Human Resources",
    location: "Remote - USA",
    type: "Full-time",
    description:
      "Support recruitment, onboarding, and employee engagement initiatives that help iCentra attract, develop, and retain top talent across every region we operate in.",
    responsibilities: [
      "Coordinate end-to-end recruitment and onboarding processes",
      "Support employee engagement and culture initiatives",
      "Maintain accurate employee records and HR documentation",
      "Assist with performance review cycles and policy communication",
    ],
    requirements: [
      "Degree in Human Resources, Business Administration, or related field",
      "Prior experience in an HR or recruitment coordination role",
      "Excellent interpersonal and organizational skills",
      "Discretion when handling confidential employee information",
    ],
  },
];

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find((job) => job.slug === slug);
}