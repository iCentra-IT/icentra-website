/* ─────────────────────────────────────────
   SOLUTIONS — single source of truth for:
     /what-we-do/solutions
     /what-we-do/solutions/[category]
     /what-we-do/solutions/[category]/[subcategory]

   Swap this file for a Sanity query later without touching page markup —
   keep the shape identical.
───────────────────────────────────────── */

export interface SolutionServiceItem {
  title: string;
  description: string;
}

export interface SolutionProcessStep {
  title: string;
  description: string;
}

export interface SolutionTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface SolutionCaseStudy {
  client: string;
  challenge: string;
  solution: string;
  result: string[];
}

export interface SolutionLink {
  label: string;
  href: string;
}

export interface SolutionSubcategory {
  /** URL segment under /what-we-do/solutions/<category>/ */
  slug: string;
  title: string;
  /** Short punchy line under the headline, e.g. "Be Fast. Be Flexible. Be Future-Ready." */
  tagline: string;
  /** One-line subhead — also used as the short blurb on the category page's card hover */
  subtext: string;
  image: string;
  /** Sanity category slug to pull real "Insight Article" posts from, when a confident match exists */
  insightCategorySlug?: string;

  heroCtaLine: string;
  heroCtaLabel?: string;

  overview: string[];

  servicesIntro: string;
  services: SolutionServiceItem[];

  midCtaLine: string;
  midCtaLabel?: string;

  howItWorksIntro?: string;
  process: SolutionProcessStep[];

  closingCtaLine: string;
  closingCtaLabel?: string;

  /** Only present for Learning & Development's "Find a Training that Suits Your Needs" block */
  trainingLinks?: SolutionLink[];

  /** Omit the section entirely on the page when not provided — most subcategories don't have this yet */
  testimonial?: SolutionTestimonial;
  caseStudyIntro?: string;
  caseStudy?: SolutionCaseStudy;
}

export interface SolutionCategory {
  /** URL segment under /what-we-do/solutions/ */
  slug: string;
  title: string;
  /** Short tagline shown on the ServiceCard's default (non-hover) face on the index page */
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  /** Intro paragraph under the "How We Do It" heading, above the subcategory cards */
  howWeDoItIntro: string;
  /** Closing CTA banner heading, e.g. "Why Choose iCentra?" */
  ctaTitle: string;
  ctaSubtext: string;
  /** Card image used on the /what-we-do/solutions index page */
  image: string;
  subcategories: SolutionSubcategory[];
}

const DEFAULT_CTA_LABEL = "Schedule a Consultation";

export const solutionCategories: SolutionCategory[] = [
  /* ═══════════════════════════════════════════════════════
     ENTERPRISE TRANSFORMATION
  ═══════════════════════════════════════════════════════ */
  {
    slug: "enterprise-transformation",
    title: "Enterprise Transformation",
    tagline: "Utilize Innovation For Improved Value Delivery",
    heroHeadline: "Enterprise Transformation",
    heroSubtext:
      "Building robust and sustainable institutions requires a culture of excellence and continuous innovation. At iCentra, we partner with you to provide insights and solutions that drive value across your business value chain, fueling growth and enhancing performance.",
    howWeDoItIntro:
      "At iCentra, we understand that transformation is not a one-size-fits-all journey. Our experts work collaboratively with clients to develop tailored, innovative solutions designed to optimize business performance and create lasting impact.",
    ctaTitle: "Why Choose iCentra?",
    ctaSubtext:
      "Our transformation solutions are designed to help organizations evolve, innovate, and excel. By leveraging tailored strategies and cutting-edge tools, we empower businesses to achieve their goals, stay competitive, and create a lasting legacy of success.",
    image: "/images/solution/1.png",
    subcategories: [
      {
        slug: "agile-transformation",
        title: "Agile Transformation",
        tagline: "Be Fast. Be Flexible. Be Future-Ready.",
        subtext: "Empowering your teams to deliver value at speed and scale.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
        insightCategorySlug: "agile-transformation",
        heroCtaLine: "Embrace Agility, Empower Innovation",
        overview: [
          "In a world of constant change and shifting customer needs, traditional ways of working can slow down innovation, limit responsiveness, and create internal bottlenecks. Many organizations struggle to scale agility beyond IT or achieve real business value from agile adoption.",
          "iCentra helps organizations embed agility across teams and functions, enabling faster delivery, stronger collaboration, and continuous value creation.",
        ],
        servicesIntro:
          "We bring agility to life across your enterprise, not just in processes, but in mindset and culture:",
        services: [
          { title: "Agile Readiness Assessment", description: "We evaluate your current agility level, identify capability gaps, and set clear transformation goals." },
          { title: "Enterprise Agile Frameworks", description: "We implement scalable frameworks or customized agile models tailored to your organization." },
          { title: "Agile Coaching & Enablement", description: "We provide hands-on coaching, agile mentoring, and leadership enablement for teams at every level." },
          { title: "Scrum & Agile Team Delivery", description: "We build high-performing, cross-functional teams that deliver iterative value through sprints and feedback loops." },
          { title: "Product-Led Transformation", description: "We enable the shift from project to product mindset, aligning teams around customer-centric solutions and measurable outcomes." },
          { title: "Culture & Leadership Agility", description: "We develop agile leaders and foster a culture that values collaboration, learning, and adaptability." },
        ],
        midCtaLine: "Let's Build an Agile Enterprise Together",
        howItWorksIntro: "Our Agile Transformation approach is iterative, inclusive, and designed for impact:",
        process: [
          { title: "Assess & Align", description: "We evaluate your current structure, culture, and capabilities, and align transformation goals with business strategy." },
          { title: "Design & Launch", description: "We co-create your agile operating model, select the right frameworks, and launch agile pilot teams." },
          { title: "Enable & Scale", description: "Through coaching, training, and agile tooling, we support capability development and scale agile practices across the enterprise." },
          { title: "Sustain & Evolve", description: "We embed continuous learning, measurement, and feedback systems to sustain momentum and evolve agility over time." },
        ],
        closingCtaLine: "Let's Turn Agility Into a Competitive Advantage",
        testimonial: {
          quote:
            "Partnering with iCentra was a game-changer for our transformation journey. Their agile expertise helped us break down silos, speed up delivery, and improve collaboration across our teams. What stood out the most was their practical, hands-on approach. They didn't just tell us what to do; they walked the journey with us. Today, we're building faster, working smarter, and creating more value for the business.",
          name: "Muniru Mai",
          role: "Chief Technology Officer, NNPC Limited (IT Division)",
        },
        caseStudyIntro:
          "See how iCentra has collaborated with organizations like yours, enabling them to overcome challenges and achieve excellent results.",
        caseStudy: {
          client: "NNPC Limited, Information Technology Division (ITD)",
          challenge:
            "NNPC Limited ITD faced challenges with long delivery cycles, siloed teams, and a lack of visibility into project progress. As the organization embarked on a broader transformation journey, there was a need to adopt agile ways of working to improve speed, collaboration, and responsiveness to stakeholder needs.",
          solution:
            "NNPC ITD embarked on an Agile Transformation program. In partnership with iCentra, the organization invested in comprehensive coaching for both leadership and delivery teams. Pilot teams were launched to drive the culture and demonstrate value.",
          result: [
            "50% reduction in time-to-delivery for key digital initiatives",
            "Increased transparency and alignment between IT and business stakeholders",
            "Establishment of cross-functional agile teams delivering iterative value",
            "Improved team morale and adoption of a culture of continuous improvement",
          ],
        },
      },
      {
        slug: "ai-intelligent-automation",
        title: "AI & Intelligent Automation",
        tagline: "Smarter. Faster. Scalable.",
        subtext: "Unlock the future of work with AI-powered intelligence and automation.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80",
        heroCtaLine: "Start Your AI Journey Today",
        overview: [
          "Artificial Intelligence (AI) and Intelligent Automation are redefining how businesses operate. From predictive insights to process automation, organizations can now achieve unprecedented efficiency, accuracy, and innovation. Yet, many struggle with fragmented tools, lack of expertise, or resistance to change, leaving opportunities untapped.",
          "At iCentra, we help you harness the full potential of AI and automation to supercharge decision-making, streamline operations, and deliver exceptional customer experiences.",
        ],
        servicesIntro:
          "We bridge strategy, technology, and human-centered design to deliver practical AI and automation outcomes. Our Core Offerings:",
        services: [
          { title: "AI Strategy & Roadmap", description: "Define the vision, identify opportunities, and build an actionable AI adoption plan aligned to your business goals." },
          { title: "Process Intelligence & Automation", description: "Automate repetitive, rule-based processes with RPA (Robotic Process Automation) and Intelligent Process Automation (IPA) to increase speed and reduce costs." },
          { title: "Machine Learning & Predictive Analytics", description: "Leverage data-driven models to predict outcomes, optimize decisions, and identify new business opportunities." },
          { title: "Generative AI & Cognitive Solutions", description: "Deploy next-generation AI (GenAI, NLP, computer vision) to unlock creativity, improve interactions, and enhance knowledge management." },
          { title: "Customer Experience Automation", description: "Deliver personalized, seamless, and intelligent customer interactions with chatbots, virtual agents, and AI-driven insights." },
          { title: "Workforce Augmentation", description: "Empower teams with AI assistants and decision-support tools that free up time for higher-value tasks." },
        ],
        midCtaLine: "Let's Redefine What's Possible with AI",
        process: [
          { title: "Assess & Align", description: "Evaluate your current processes, data readiness, and AI maturity." },
          { title: "Design & Plan", description: "Develop an AI blueprint tailored to your industry and needs." },
          { title: "Build & Implement", description: "Deploy scalable AI models, automation tools, and integration frameworks." },
          { title: "Adopt & Optimize", description: "Drive adoption through change management, training, and continuous optimization." },
        ],
        closingCtaLine: "Need an AI Transformation Partner You Can Trust?",
      },
      {
        slug: "digital-transformation",
        title: "Digital Transformation",
        tagline: "Reimagine. Reinvent. Accelerate.",
        subtext: "Empowering your business to thrive in a digital-first world.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
        insightCategorySlug: "digital-transformation",
        heroCtaLine: "Start Your Digital Journey Today",
        overview: [
          "In today's fast-paced, technology-driven world, businesses face constant pressure to innovate, optimize, and stay competitive. Many organizations struggle to keep up with evolving customer expectations, outdated systems, and inefficient processes. Without the right strategy and tools, these challenges can stifle growth and hinder long-term success.",
          "At iCentra, we help you overcome these obstacles by unlocking the power of digital transformation to drive innovation, streamline operations, and elevate customer experience.",
        ],
        servicesIntro:
          "We combine strategy, technology, and execution to deliver tangible business outcomes. Our approach is simple and impactful:",
        services: [
          { title: "Digital Strategy & Roadmap", description: "We define your digital vision and create a practical, actionable roadmap to bring it to life." },
          { title: "Process Automation & Optimization", description: "We automate repetitive tasks and streamline workflows, driving greater efficiency and productivity." },
          { title: "Legacy System Modernization", description: "We upgrade outdated systems and transition you to scalable, cloud-native technologies." },
          { title: "Data & AI Integration", description: "We leverage data analytics, AI, and machine learning to empower smarter, real-time decision-making." },
          { title: "Customer Experience Transformation", description: "We design seamless, intuitive, and connected digital experiences that put your customers first." },
          { title: "Innovation Enablement", description: "We foster a culture of innovation by embedding agile thinking and modern tools across your organization." },
        ],
        midCtaLine: "Let's Design Your Digital Future",
        process: [
          { title: "Assess & Align", description: "We begin by assessing your current state, understanding your goals, and aligning on outcomes." },
          { title: "Design & Plan", description: "Our experts craft a strategic digital roadmap and transformation blueprint." },
          { title: "Build & Implement", description: "We deploy scalable technologies, modernize systems, and digitize key processes." },
          { title: "Adopt & Optimize", description: "Through change management, training, and continuous improvement, we ensure sustainable impact." },
        ],
        closingCtaLine: "Need a Transformation Partner You Can Trust?",
      },
      {
        slug: "organizational-transformation",
        title: "Organizational Transformation",
        tagline: "Evolve from Within. Lead with Impact.",
        subtext: "Transforming your structure, culture, and capabilities for sustainable success.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80",
        insightCategorySlug: "organizational-transformation",
        heroCtaLine: "Ready to Transform Your Organization?",
        overview: [
          "In today's volatile and fast-changing business environment, many organizations struggle with misalignment, siloed operations, outdated structures, and resistance to change, all of which hinder growth and innovation. Navigating expansion, restructuring, or adopting new ways of working can be overwhelming without the right guidance.",
          "That's where iCentra comes in, helping you reimagine how your organization operates by aligning people, processes, and culture with your strategic vision.",
        ],
        servicesIntro: "We align purpose, people, and performance to create lasting change. Our approach includes:",
        services: [
          { title: "Organizational Assessment & Design", description: "We assess your current structure, identify gaps, and design fit-for-purpose models for better alignment and agility." },
          { title: "Culture Transformation", description: "We help shift mindsets and behaviors to foster a culture of accountability, collaboration, and innovation." },
          { title: "Change Leadership & Management", description: "We empower leaders and equip teams to navigate change with clarity, confidence, and commitment." },
          { title: "Process Reengineering", description: "We streamline and optimize key business processes to eliminate inefficiencies and support transformation goals." },
          { title: "Workforce Planning & Talent Strategy", description: "We align your talent strategy with organizational needs, identifying the right capabilities and closing skills gaps." },
          { title: "Performance & Governance Optimization", description: "We establish governance structures, KPIs, and performance systems that reinforce strategic execution." },
        ],
        midCtaLine: "Let's Redesign Your Organization for the Future",
        howItWorksIntro: "Our transformation model is holistic, human-centered, and results-driven:",
        process: [
          { title: "Discover & Diagnose", description: "We begin with a deep dive into your organization's current state (structure, culture, processes, and performance) to identify critical pain points and opportunities." },
          { title: "Co-Create & Design", description: "We work collaboratively to envision your future organization, aligning structure, talent, and processes with strategy." },
          { title: "Implement & Activate", description: "We support phased execution of the transformation roadmap, including training, restructuring, process change, and system updates." },
          { title: "Reinforce & Sustain", description: "We embed new ways of working through coaching, communication, performance management, and feedback loops, ensuring long-term impact and continuous improvement." },
        ],
        closingCtaLine: "Looking to Build a High-Performing, Adaptive Organization?",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     CYBERSECURITY & GRC
  ═══════════════════════════════════════════════════════ */
  {
    slug: "cybersecurity-and-grc",
    title: "Cybersecurity & GRC",
    tagline: "Mitigate Business Challenges Seamlessly",
    heroHeadline: "Secure Today. Safeguard\nTomorrow",
    heroSubtext:
      "In today's interconnected world, organizations face an ever-evolving landscape of threats and vulnerabilities. At iCentra, we provide holistic Security, Governance, Risk and Compliance solutions designed to protect your enterprise, ensure compliance, and build resilience. Our services empower organizations to navigate uncertainty, safeguard assets, and optimize their operations for sustained success.",
    howWeDoItIntro:
      "iCentra delivers tailored and cost-effective solutions that address the specific security, governance, risk and compliance needs of your organization. Our team of professionals helps you maximize the value of your technology investments while maintaining robust protection and compliance.",
    ctaTitle: "Why iCentra?",
    ctaSubtext:
      "With our integrated approach to Security, Governance, Risk and Compliance, we enable organizations to not only address present challenges but also anticipate and adapt to future risks. Partner with iCentra to protect what matters, navigate complexity, and achieve operational resilience.",
    image: "/images/solution/2.jpg",
    subcategories: [
      {
        slug: "compliance",
        title: "Compliance",
        tagline: "Build Trust. Stay Aligned. Be Audit-Ready.",
        subtext: "Achieving operational excellence through robust regulatory and standards adherence.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
        insightCategorySlug: "isms-iso",
        heroCtaLine: "Confidence Through Compliance",
        overview: [
          "In a landscape of tightening regulations and increasing scrutiny, compliance is no longer a checkbox exercise; it's a business imperative. From cybersecurity standards to data privacy laws and quality frameworks, organizations face mounting obligations across industries and geographies.",
          "At iCentra, we help you stay ahead of regulatory requirements while building systems that enhance trust, protect your assets, and support sustainable growth. Our comprehensive Compliance services span Governance, Risk, and Compliance (GRC) domains, ensuring you're not just compliant, but future-ready.",
        ],
        servicesIntro:
          "Comprehensive Compliance Services Across Global Standards and Regulations. We support end-to-end compliance across multiple frameworks and industries:",
        services: [
          { title: "SOC 1 & SOC 2 (Service Organization Controls)", description: "We help you design, implement, and prepare for SOC audits, demonstrating control over data security, availability, confidentiality, and privacy." },
          { title: "NIST (National Institute of Standards and Technology)", description: "We align your organization with NIST frameworks such as 800-53 and CSF, supporting cybersecurity maturity, federal readiness, and risk mitigation." },
          { title: "GDPR & NDPR (Data Protection Regulations)", description: "We guide you through data privacy regulations in the EU (GDPR) and Nigeria (NDPR), ensuring lawful data processing, user rights management, and breach readiness." },
          { title: "COBIT (Control Objectives for Information and Related Technologies)", description: "We deploy COBIT frameworks to establish IT governance models that drive alignment, performance, and compliance simultaneously." },
          { title: "Cyber Essentials", description: "For UK-based businesses and partners, we assist in achieving Cyber Essentials certification, covering basic security controls and threat protection." },
          { title: "HIPAA & HITRUST (Healthcare Compliance)", description: "We support healthcare providers and partners in implementing HIPAA-compliant controls and HITRUST frameworks to protect patient data and meet regulatory demands." },
          { title: "ISO Standards", description: "We provide end-to-end support for implementing and maintaining ISO frameworks, including ISO 27001 for Information Security Management (ISMS), securing digital assets through structured risk management and access controls; ISO 9001 for Quality Management (QMS), building customer trust through consistent quality, process efficiency, and continual improvement; and ISO 22301 for Business Continuity Management (BCMS), ensuring organizational resilience with tested plans for business disruption and recovery." },
          { title: "Other Regulatory Frameworks", description: "We also support PCI-DSS, ITIL, CSA STAR, local financial regulations, and custom governance needs tailored to your industry and region." },
        ],
        midCtaLine: "Stay Ahead of the Compliance Curve",
        howItWorksIntro: "Our Compliance services are tailored, risk-informed, and scalable:",
        process: [
          { title: "Assess & Prioritize", description: "We conduct compliance gap assessments, identify risks, and prioritize frameworks based on your business model, geography, and industry." },
          { title: "Design & Document", description: "We develop required policies, processes, and documentation aligned with the chosen standards and best practices." },
          { title: "Implement & Train", description: "We embed controls, automate where necessary, and provide compliance training for key stakeholders and process owners." },
          { title: "Audit & Improve", description: "We guide you through internal and external audits, provide remediation support, and ensure continuous improvement systems are in place." },
        ],
        closingCtaLine: "Compliance is Not Just a Duty: It's a Differentiator",
      },
      {
        slug: "cyber-security",
        title: "Cyber Security",
        tagline: "Secure Today. Safeguard Tomorrow.",
        subtext: "Protecting your business against evolving threats in a digital world.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=700&q=80",
        insightCategorySlug: "cybersecurity",
        heroCtaLine: "Stay Secure, Stay Resilient",
        overview: [
          "In today's hyper-connected world, cyber threats are evolving faster than ever, targeting vulnerabilities in systems, people, and processes. Many organizations are exposed due to outdated infrastructure, poor visibility, or lack of preparedness.",
          "Just one breach can compromise customer trust, disrupt operations, and result in regulatory penalties.",
          "That's why cyber resilience is no longer optional. It's critical.",
          "At iCentra, we help businesses build a strong, adaptive cybersecurity posture by protecting digital assets, managing risks, and ensuring regulatory compliance. Our approach is strategic, proactive, and tailored to your unique environment.",
        ],
        servicesIntro:
          "From proactive risk assessments to real-time threat detection, our cybersecurity services are designed to protect every layer of your digital ecosystem, helping you stay ahead of threats, meet compliance demands, and build long-term resilience. Our Cybersecurity Solutions Cover the Full Threat Landscape",
        services: [
          { title: "Cyber Risk Assessment & Strategy", description: "We identify vulnerabilities, assess your risk exposure, and create a practical, business-aligned roadmap to strengthen your security posture." },
          { title: "Threat Detection & Incident Response", description: "We implement 24/7 threat monitoring, incident response playbooks, and threat intelligence systems to detect and respond in real time." },
          { title: "Security Architecture & Implementation", description: "We design and deploy secure IT infrastructure, applications, and cloud environments that meet your business and compliance requirements." },
          { title: "Vulnerability & Penetration Testing", description: "We proactively test your networks, applications, and systems to identify and fix weaknesses before attackers exploit them." },
          { title: "Security Information & Event Management (SIEM)", description: "We deploy advanced SIEM platforms that centralize event data, provide real-time alerts, and deliver deep visibility across your environment." },
        ],
        midCtaLine: "Let's Fortify Your Cyber Defences",
        howItWorksIntro: "Our cybersecurity approach is structured, comprehensive, and business-aligned:",
        process: [
          { title: "Assess & Identify", description: "We begin with a full assessment of your current security posture, technology stack, and regulatory gaps." },
          { title: "Design & Plan", description: "We craft a prioritized cybersecurity roadmap tailored to your business needs and risk appetite." },
          { title: "Implement & Monitor", description: "We deploy leading security tools, integrate controls, and establish real-time monitoring and incident response." },
          { title: "Train & Evolve", description: "We strengthen your people through awareness training, simulate threats, and ensure your defenses evolve with the threat landscape." },
        ],
        closingCtaLine: "Cybersecurity Is Not Optional: It's Critical",
      },
      {
        slug: "it-governance",
        title: "IT Governance",
        tagline: "Control. Align. Deliver.",
        subtext: "Driving business value through structured and strategic IT oversight.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
        heroCtaLine: "Turn IT Into a Strategic Advantage",
        overview: [
          "In many organizations, IT investments are made in silos, leading to misalignment with business goals, wasted resources, and unmanaged risk. Without proper governance, IT can become a barrier instead of an enabler.",
          "We help organizations implement effective IT Governance frameworks that align technology with strategy, ensure accountability, and enable informed decision-making. With iCentra as your partner, IT becomes a driver of innovation, compliance, and measurable business performance.",
        ],
        servicesIntro:
          "Our IT Governance services are designed to create transparency, establish guardrails, and maximize return on your IT investments:",
        services: [
          { title: "IT Governance Framework Design", description: "We assess your current governance maturity and establish the right policies, structures, and controls to align IT with business strategy." },
          { title: "IT Policy Development & Compliance", description: "We create and enforce IT policies that promote accountability, support compliance (e.g., ISO, COBIT, GDPR), and reduce operational risk." },
          { title: "Portfolio & Demand Management", description: "We help prioritize IT initiatives based on value, risk, and capacity, ensuring optimal resource allocation and investment alignment." },
          { title: "Performance & Risk Monitoring", description: "We define KPIs, implement dashboards, and monitor IT performance and risk in real time to support better executive decisions." },
          { title: "Governance Process Automation", description: "We digitize and automate governance workflows for approvals, audits, and reporting, driving efficiency and control." },
        ],
        midCtaLine: "Bring Structure to IT Decision-Making",
        howItWorksIntro: "Our approach is practical, collaborative, and aligned with industry-leading standards:",
        process: [
          { title: "Assess & Define", description: "We evaluate your current IT governance posture, identify gaps, and define a clear governance vision." },
          { title: "Design & Build", description: "We co-create governance models, policies, and procedures tailored to your organization's size, structure, and industry." },
          { title: "Implement & Enable", description: "We roll out governance structures and tools while providing training and enablement for decision-makers and stakeholders." },
          { title: "Monitor & Optimize", description: "We establish metrics and continuous improvement systems to refine governance effectiveness and drive long-term value." },
        ],
        closingCtaLine: "Good Governance is Good Business",
      },
      {
        slug: "risk-management",
        title: "Risk Management",
        tagline: "See Ahead. Act Decisively. Stay in Control.",
        subtext: "Empowering organizations to anticipate threats, reduce uncertainty, and build resilient operations.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
        insightCategorySlug: "risk-management",
        heroCtaLine: "Turn Risk Into Strategic Advantage",
        overview: [
          "In today's hyper-connected world, the risk landscape is dynamic and unforgiving, ranging from cyber threats and compliance gaps to operational failures and third-party vulnerabilities. Yet, risk isn't just something to avoid; it's something to manage, prioritize, and even leverage.",
          "At iCentra, we help organizations embed enterprise risk management (ERM) into the fabric of decision-making. Through our integrated GRC approach, we equip leaders to identify, assess, mitigate, and monitor risks proactively, aligning risk appetite with business strategy.",
        ],
        servicesIntro: "Our Risk Management Solutions Deliver Visibility, Resilience, and Strategic Control",
        services: [
          { title: "Enterprise Risk Management (ERM)", description: "We design and embed a comprehensive ERM framework tailored to your operations, enabling structured identification, assessment, and mitigation of strategic, financial, operational, and reputational risks." },
          { title: "Cyber Risk & Information Security", description: "We assess your cybersecurity exposure and implement risk-based controls aligned with standards such as ISO 27001 and NIST to safeguard critical data, infrastructure, and digital assets." },
          { title: "Third-Party & Supply Chain Risk", description: "We help you assess and manage vendor and partner risks through structured due diligence, ongoing monitoring, and third-party risk frameworks to prevent external vulnerabilities." },
          { title: "Regulatory & Compliance Risk", description: "We ensure your business stays ahead of evolving regulations (from GDPR, NDPR, HIPAA and COBIT to ISO and PCI-DSS) by embedding compliance into operations and minimizing exposure to regulatory sanctions." },
          { title: "Operational Risk Management", description: "We implement systems and controls to identify and manage internal threats such as process inefficiencies, fraud, human error, and system failures, ensuring continuity and control." },
          { title: "Risk Assessments & Heat Mapping", description: "We conduct in-depth risk identification sessions, scenario modeling, and heatmapping to visualize exposures and empower data-driven decision-making." },
          { title: "Risk Governance & Culture", description: "We define clear roles, responsibilities, and escalation paths while building a risk-aware culture that encourages proactive ownership and informed risk-taking at all levels." },
        ],
        midCtaLine: "Put Risk Where It Belongs: Under Control",
        howItWorksIntro: "Our risk management approach is integrated, structured, and business-aligned:",
        process: [
          { title: "Discover & Diagnose", description: "We assess your current risk exposure, maturity level, and governance structures through workshops, audits, and stakeholder interviews." },
          { title: "Design & Develop", description: "We co-create a risk strategy and governance model aligned with your business goals and regulatory context." },
          { title: "Implement & Operationalize", description: "We embed tools, controls, and processes into your operations, enabling real-time monitoring, automated reporting, and risk-informed decision-making." },
          { title: "Monitor & Improve", description: "We continuously evaluate your risk landscape and refine your controls using dashboards, audits, and key risk indicators (KRIs)." },
        ],
        closingCtaLine: "When Managed Well, Risk Becomes a Catalyst for Growth",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     STRATEGY & EXECUTION
  ═══════════════════════════════════════════════════════ */
  {
    slug: "strategy-execution",
    title: "Strategy & Execution",
    tagline: "Achieve Your Objectives With Strategic Goals",
    heroHeadline: "Strategy & Execution",
    heroSubtext:
      "A strategy is only as good as its delivery. At iCentra, we help organizations translate strategic ambition into structured, well-governed execution that delivers measurable outcomes.",
    howWeDoItIntro:
      "At iCentra, we understand that transformation is not a one-size-fits-all journey. Our experts work collaboratively with clients to develop tailored, innovative solutions designed to optimize business performance and create lasting impact.",
    ctaTitle: "Why Choose iCentra?",
    ctaSubtext:
      "Our transformation solutions are designed to help organizations evolve, innovate, and excel. By leveraging tailored strategies and cutting-edge tools, we empower businesses to achieve their goals, stay competitive, and create a lasting legacy of success.",
    image: "/images/solution/3.jpg",
    subcategories: [
      {
        slug: "advisory",
        title: "Advisory",
        tagline: "Clarity. Confidence. Competitive Edge.",
        subtext: "Empowering Leaders with Strategic Insights for Sustainable Success.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
        heroCtaLine: "Get Expert Advisory.",
        overview: [
          "In an increasingly complex and fast-changing world, leaders are expected to make critical decisions amid uncertainty. Without the right insights, expertise, and strategic alignment, organizations risk stagnation, inefficiencies, or costly missteps.",
          "At iCentra, our Advisory Team provide you with the clarity and confidence to navigate complexity, seize opportunities, and create sustainable impact. Whether you're redefining strategy, restructuring operations, or navigating digital transformation, we help you get it right the first time.",
        ],
        servicesIntro: "We provide strategic clarity and sound advisory in the following areas:",
        services: [
          { title: "Business Strategy Advisory", description: "We guide you in developing or refining your strategic vision, business model, and growth roadmap." },
          { title: "Digital & Technology Advisory", description: "We help you harness technology to drive innovation, improve efficiency, and create competitive advantage." },
          { title: "Operational Excellence", description: "We diagnose inefficiencies and design interventions that enhance performance and streamline processes." },
          { title: "Enterprise Architecture & Innovation", description: "We align your technology landscape with business goals, ensuring agility and scalability." },
          { title: "Transformation Program Support", description: "We provide executive-level support and oversight to keep high-stakes programs on track and delivering value." },
        ],
        midCtaLine: "Make Bold, Informed Decisions",
        process: [
          { title: "Understand & Assess", description: "We start by understanding your business context, goals, and challenges through stakeholder sessions and diagnostics." },
          { title: "Strategize & Advise", description: "Our advisors craft customized, data-driven recommendations that align with your vision and market dynamics." },
          { title: "Partner & Support", description: "We act as your trusted advisor, providing guidance and support through key decision points and transformation initiatives." },
          { title: "Monitor & Refine", description: "We work with you to evaluate progress, measure results, and refine strategies for sustained impact." },
        ],
        closingCtaLine: "Need Strategic Clarity in a Complex World?",
      },
      {
        slug: "change-management",
        title: "Change Management",
        tagline: "Lead Change. Inspire Growth. Sustain Results.",
        subtext: "Empowering Organizations to Navigate and Embrace Change with Confidence.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80",
        heroCtaLine: "Drive Successful Change",
        overview: [
          "In today's dynamic business landscape, change is not optional; it's essential. Yet, many organizations struggle with failed transformations, employee resistance, and initiative fatigue. Without a structured change management approach, even the best strategies and technologies can fall flat.",
          "At iCentra, we help you unlock the human side of transformation. From culture shifts to system rollouts, we guide your teams through change with clarity, empathy, and impact, ensuring initiatives are embraced, adopted, and sustained.",
        ],
        servicesIntro: "Our Change Management Solutions Include:",
        services: [
          { title: "Organizational Change Strategy", description: "We craft tailored strategies to guide your organization through complex transitions and transformations." },
          { title: "Stakeholder Engagement & Communication", description: "We develop and execute communication plans that foster alignment, transparency, and buy-in." },
          { title: "Change Readiness Assessment", description: "We evaluate your organization's preparedness and identify potential barriers to change success." },
          { title: "Training & Enablement", description: "We design learning interventions to build capability and drive confidence among impacted stakeholders." },
          { title: "Leadership Alignment & Coaching", description: "We work with executives and managers to role-model change, build influence, and lead from the front." },
          { title: "Change Measurement & Reinforcement", description: "We implement tracking mechanisms to measure adoption and reinforce behaviors for long-term success." },
        ],
        midCtaLine: "Let's Make Change Stick",
        process: [
          { title: "Discover & Diagnose", description: "We assess the scope of change, stakeholder impact, and organizational readiness." },
          { title: "Plan & Strategize", description: "We build a change strategy and roadmap aligned to business goals and cultural dynamics." },
          { title: "Execute & Engage", description: "We roll out change interventions, communications, and training programs to drive adoption." },
          { title: "Sustain & Improve", description: "We embed feedback loops, coaching, and reinforcement tactics to ensure lasting results." },
        ],
        closingCtaLine: "Looking for a Change Partner?",
        closingCtaLabel: "Talk to Us Today",
      },
      {
        slug: "pmo-solutions",
        title: "PMO Solutions",
        tagline: "Structure. Scale. Succeed.",
        subtext: "Empowering Project Excellence Through High-Impact PMO Solutions.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80",
        insightCategorySlug: "pmo-solution",
        heroCtaLine: "Build a Value-Driven PMO Today",
        overview: [
          "Inconsistent project outcomes, missed deadlines, budget overruns, and misaligned initiatives: these are all symptoms of an organization without a strong Project Management Office (PMO). Without a central hub to oversee value delivery, organizations struggle to translate strategy into results.",
          "At iCentra, we design, implement, and optimize PMOs that don't just manage projects: they enable transformation, drive efficiency, and maximize business value.",
        ],
        servicesIntro:
          "Whether you're starting from scratch or scaling an existing structure, our PMO Solutions are built to deliver consistent, repeatable, and strategic results:",
        services: [
          { title: "PMO Setup & Maturity Development", description: "We build custom-fit PMOs, from Enterprise to Departmental, that align with your business needs." },
          { title: "Project Portfolio Management (PPM)", description: "We implement tools and processes to evaluate, prioritize, and manage multiple projects effectively." },
          { title: "Governance & Standardization", description: "We define policies, procedures, and frameworks that ensure consistency and compliance." },
          { title: "Performance & Reporting Dashboards", description: "We enable data-driven decisions through real-time visibility into projects and portfolios." },
          { title: "Agile & Hybrid PMO Models", description: "We design flexible PMOs that support traditional, agile, or blended delivery methods." },
          { title: "Capability Building", description: "We train your teams, upskill your PMs, and embed a culture of project excellence." },
        ],
        midCtaLine: "Let's Build a PMO That Delivers Value",
        process: [
          { title: "Assess & Understand", description: "We evaluate your current project environment and define the best-fit PMO model." },
          { title: "Design & Customize", description: "We develop a tailored PMO structure with governance, tools, and delivery frameworks." },
          { title: "Implement & Operationalize", description: "We help deploy the PMO and establish rhythms, roles, and responsibilities." },
          { title: "Monitor & Optimize", description: "We continually refine PMO performance through reviews, metrics, and feedback loops." },
        ],
        closingCtaLine: "Need a PMO Partner Who Delivers Results?",
        closingCtaLabel: "Talk to Us Today",
        testimonial: {
          quote:
            "Working with iCentra to establish the framework to operationalize our Enterprise PMO was a game-changer. Their structured yet flexible approach helped us align projects with strategic priorities, improve visibility, and build internal capacity. Today, our EPMO is a core pillar of execution excellence at CBN.",
          name: "Mrs. Bisi Popoola",
          role: "Head EPMG, Central Bank of Nigeria (CBN)",
        },
        caseStudy: {
          client: "Central Bank of Nigeria (CBN)",
          challenge:
            "CBN faced challenges in aligning multiple strategic initiatives across departments. Projects were managed in silos with inconsistent processes, limited visibility, and no centralized performance tracking, making it difficult to drive accountability and strategic execution.",
          solution:
            "iCentra was engaged to design and implement a full-scale Enterprise Project Management Office (EPMO). We conducted a current state assessment, developed a PMO maturity roadmap, and deployed a tailored EPMO framework. This included governance models, standardized tools, reporting dashboards, and capability development programs.",
          result: [
            "Established a centralized, fully operational EPMO",
            "Enhanced project alignment with strategic goals",
            "Improved delivery consistency and reduced initiative overlap",
            "Increased visibility through real-time reporting tools",
            "Built internal capacity with certified project leaders",
          ],
        },
      },
      {
        slug: "strategy-management",
        title: "Strategy Management",
        tagline: "Strategize. Align. Execute.",
        subtext: "Turning Vision into Value with Strategic Precision.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
        insightCategorySlug: "strategy-management",
        heroCtaLine: "Unlock Your Strategic Advantage",
        overview: [
          "In today's dynamic and unpredictable business landscape, having a clear vision is not enough. Organizations often face strategic drift, misalignment, and execution gaps that slow growth and weaken performance. Without the right strategic framework and execution discipline, even the best ideas can fall flat.",
          "At iCentra, we help you turn strategy into action, with clarity, alignment, and accountability that drives real, measurable outcomes.",
        ],
        servicesIntro:
          "We blend strategy, insight, and execution into a unified journey, empowering leaders to make better decisions, align teams, and accelerate success. Our Strategy Management solution includes:",
        services: [
          { title: "Strategic Planning & Roadmapping", description: "We help define your strategic vision and develop a roadmap to navigate market complexities." },
          { title: "Organizational Alignment", description: "We align goals, resources, and teams with strategy for seamless execution and results." },
          { title: "Performance Management", description: "We establish clear KPIs, OKRs, and reporting frameworks to track performance and adapt rapidly." },
          { title: "Execution Enablement", description: "We provide the tools, governance, and guidance to move from planning to delivery with confidence." },
          { title: "Agility & Continuous Optimization", description: "We build in agility so your strategy evolves with market realities and emerging opportunities." },
        ],
        midCtaLine: "Let's Align Strategy with Success",
        process: [
          { title: "Discover & Diagnose", description: "We begin with a strategic assessment, understanding your goals, challenges, and current state." },
          { title: "Design & Align", description: "We co-create a practical strategy, ensuring alignment across leadership and functional teams." },
          { title: "Execute & Enable", description: "We operationalize the plan, setting up frameworks, and tools for execution success." },
          { title: "Review & Evolve", description: "We embed a performance rhythm with regular reviews and refinements to keep strategy on track." },
        ],
        closingCtaLine: "Need a Strategy Execution Partner You Can Trust?",
        closingCtaLabel: "Talk to Us Today",
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     LEARNING & TALENT
  ═══════════════════════════════════════════════════════ */
  {
    slug: "learning-and-talent",
    title: "Learning & Talent",
    tagline: "Accelerate Your Growth With Refined Knowledge",
    heroHeadline: "Learning & Talent",
    heroSubtext:
      "Capable people are the engine of sustained transformation. At iCentra, we build learning and talent programs that grow leadership, skills, and capability across your organization.",
    howWeDoItIntro:
      "At iCentra, we understand that transformation is not a one-size-fits-all journey. Our experts work collaboratively with clients to develop tailored, innovative solutions designed to optimize business performance and create lasting impact.",
    ctaTitle: "Why Choose iCentra?",
    ctaSubtext:
      "Our transformation solutions are designed to help organizations evolve, innovate, and excel. By leveraging tailored strategies and cutting-edge tools, we empower businesses to achieve their goals, stay competitive, and create a lasting legacy of success.",
    image: "/images/solution/4.jpg",
    subcategories: [
      {
        slug: "learning-and-development",
        title: "Learning & Development",
        tagline: "Empower. Equip. Elevate.",
        subtext: "Building Capabilities That Drive Performance.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80",
        insightCategorySlug: "executive-training",
        heroCtaLine: "Start Building Future-Ready Talent",
        heroCtaLabel: "Speak to a Learning Advisor",
        overview: [
          "In today's dynamic world, your people are your greatest asset and your most powerful catalyst for growth. But without the right skills, mindset, and learning culture, even the best strategies can fall short.",
          "At iCentra, we deliver transformational Learning & Development solutions designed to align talent with strategy, build critical capabilities, and drive measurable business outcomes.",
          "We don't just train: we transform people, unlock possibilities and cultivate leaders ready to meet the challenges of tomorrow.",
        ],
        servicesIntro: "Our Learning & Development Solutions Include:",
        services: [
          { title: "Corporate Learning Programs", description: "Tailored training solutions across leadership, management, technology, softskills." },
          { title: "Capacity Support", description: "We augment internal teams with skilled professionals, trainers, and learning consultants to support short- and long-term capacity building." },
          { title: "Digital Learning & Blended Delivery", description: "Flexible, interactive formats (onsite, virtual, or hybrid) to maximize reach and retention." },
          { title: "Certification Programs", description: "Industry-recognized training to empower professionals with globally relevant credentials (PMI, PECB, ISACA etc)." },
        ],
        trainingLinks: [
          { label: "For Corporate", href: "https://learning.icentra.com/our-courses/for_individuals/" },
          { label: "For Individuals", href: "https://learning.icentra.com/our-courses/for_organisations/" },
        ],
        midCtaLine: "Find a Training that Suits Your Needs",
        midCtaLabel: "Speak to a Learning Advisor",
        process: [
          { title: "Assess & Align", description: "We start by understanding your goals and assessing existing skills to identify capability gaps." },
          { title: "Design & Customize", description: "We craft a tailored learning strategy and curriculum aligned with business objectives and roles." },
          { title: "Deliver & Engage", description: "Our certified facilitators deliver dynamic, engaging sessions through in-person, virtual, or hybrid methods." },
          { title: "Measure & Improve", description: "We track progress, assess impact, and continuously refine learning to ensure lasting performance improvement." },
        ],
        closingCtaLine: "Transform Your Workforce Into a Strategic Asset",
        closingCtaLabel: "Speak to a Learning Advisor",
      },
      {
        slug: "talent-optimization",
        title: "Talent Optimization",
        tagline: "Right People. Right Skills. Real Impact.",
        subtext: "Empowering your organization with scalable, high-impact talent solutions.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80",
        insightCategorySlug: "project-resourcing",
        heroCtaLine: "Optimize Your Workforce",
        overview: [
          "In today's dynamic business environment, having the right talent is critical to organizational performance and growth. Yet, many businesses struggle with workforce gaps, inefficiencies, and an inability to scale rapidly.",
          "At iCentra, we help you bridge these gaps through flexible, strategic, and cost-effective talent solutions that align with your operational goals, whether you're scaling up, building a specialized team, or enhancing existing capabilities.",
        ],
        servicesIntro:
          "We offer end-to-end talent resourcing models designed to improve performance, reduce costs, and increase agility. Our Talent Optimization Solutions Include:",
        services: [
          { title: "Outsourcing Solution", description: "We take full responsibility for managing specific business functions or projects, allowing you to focus on your core mission while ensuring quality delivery." },
          { title: "Outstaffing Solution", description: "We provide skilled professionals who seamlessly integrate into your existing teams, offering flexibility and efficiency without long-term hiring commitments." },
          { title: "On-Demand Talent Resourcing", description: "Whether short-term or long-term, we deploy the right experts when and where you need them, ensuring your workforce remains agile and future-ready." },
          { title: "Workforce Planning & Optimization", description: "We assess current capabilities, identify gaps, and design strategies to enhance workforce productivity and alignment with business goals." },
        ],
        midCtaLine: "Ready to Transform Your Workforce?",
        process: [
          { title: "Assess Needs & Goals", description: "We analyze your talent landscape, challenges, and strategic objectives." },
          { title: "Design Tailored Strategy", description: "Our experts recommend the right mix of outsourcing, outstaffing, or hybrid models to meet your needs." },
          { title: "Deploy & Manage Talent", description: "We source, onboard, and manage top-tier talent, ensuring they align with your performance expectations." },
          { title: "Monitor & Optimize", description: "Through performance tracking and feedback loops, we ensure continuous improvement and ROI on talent investments." },
        ],
        closingCtaLine: "Build a Smarter, More Agile Workforce.",
      },
    ],
  },
];

export function getSolutionCategoryBySlug(slug: string): SolutionCategory | undefined {
  return solutionCategories.find((category) => category.slug === slug);
}

export function getSolutionSubcategory(
  categorySlug: string,
  subcategorySlug: string
): { category: SolutionCategory; subcategory: SolutionSubcategory } | undefined {
  const category = getSolutionCategoryBySlug(categorySlug);
  const subcategory = category?.subcategories.find((sub) => sub.slug === subcategorySlug);
  if (!category || !subcategory) return undefined;
  return { category, subcategory };
}

export { DEFAULT_CTA_LABEL };
