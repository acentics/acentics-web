export const PERKS = [
  { slug: "remote-first", name: "Remote-First", desc: "Work from anywhere. We hire for output, not hours in a seat." },
  { slug: "real-ownership", name: "Real Ownership", desc: "No account layers. You own client outcomes from day one." },
  { slug: "health-wellness", name: "Health & Wellness", desc: "Full health coverage and a wellness stipend, because burnt-out teams don't do good work." },
  { slug: "learning-budget", name: "Learning Budget", desc: "An annual budget for courses, conferences, and whatever sharpens your craft." },
];

export const ROLES = [
  {
    slug: "senior-brand-strategist",
    index: "01",
    name: "Senior Brand Strategist",
    department: "Strategy",
    location: "Remote (US/EU hours)",
    type: "Full-time",
    team: "Reports to the Head of Strategy",
    salary: "$110,000 – $140,000 + equity",
    tags: ["Full-time", "Remote"],
    summary: "Lead brand positioning, messaging, and identity strategy for our top-tier clients — from first workshop to final guidelines.",
    overview:
      "We're looking for a Senior Brand Strategist to lead positioning and messaging work for our top-tier clients. You'll run discovery, translate research into a clear point of view, and partner with creative to bring that strategy to life — from the first workshop through final brand guidelines. This is a senior, client-facing seat: you'll be the strategic voice in the room, not a layer between the client and the work.",
    responsibilities: [
      "Lead brand strategy engagements from discovery through delivery",
      "Run stakeholder workshops and translate findings into positioning frameworks",
      "Partner with creative and client teams to keep every deliverable on-strategy",
      "Present strategic recommendations directly to client leadership",
      "Develop naming, verbal identity, and messaging architecture",
      "Mentor junior strategists and help shape our strategic point of view",
    ],
    requirements: [
      "6+ years in brand strategy at an agency or in-house team",
      "A portfolio of positioning and messaging work you can walk us through",
      "Comfortable leading client workshops and executive presentations",
      "Sharp writing — you can turn research into a point of view",
    ],
    niceToHave: [
      "Experience in a regulated vertical (health, fintech, or consumer)",
      "Comfortable running quantitative research alongside qualitative",
      "A point of view on where brand and performance marketing intersect",
    ],
  },
  {
    slug: "performance-marketing-manager",
    index: "02",
    name: "Performance Marketing Manager",
    department: "Media",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    team: "Reports to the Media Director",
    salary: "$95,000 – $125,000 + bonus",
    tags: ["Full-time", "New York"],
    summary: "Own paid media strategy and execution across search, social, and programmatic for a portfolio of growth-stage clients.",
    overview:
      "We're hiring a Performance Marketing Manager to own paid media strategy and execution for a portfolio of growth-stage clients. You'll set the testing roadmap, manage budget across channels, and turn performance data into next actions — reporting directly to clients on the numbers that actually move their business, not vanity metrics.",
    responsibilities: [
      "Build and manage full-funnel paid media programs across channels",
      "Set testing roadmaps for creative, audiences, and bidding strategy",
      "Own reporting and translate performance data into next actions",
      "Manage budget pacing and forecasting across client accounts",
      "Partner with creative to brief and iterate on high-performing assets",
      "Present performance results and recommendations directly to clients",
    ],
    requirements: [
      "4+ years running paid social and search campaigns",
      "Fluent in Meta Ads Manager, Google Ads, and a major attribution tool",
      "Comfortable owning a budget and defending ROAS to clients",
      "You obsess over the metrics that actually move the business",
    ],
    niceToHave: [
      "Experience with programmatic or connected TV buys",
      "Working knowledge of SQL or a BI tool for custom reporting",
      "Background in e-commerce or DTC performance marketing",
    ],
  },
  {
    slug: "creative-director",
    index: "03",
    name: "Creative Director",
    department: "Creative",
    location: "Remote (US/EU hours)",
    type: "Full-time",
    team: "Reports to the Chief Creative Officer · Leads a team of 5",
    salary: "$140,000 – $175,000 + equity",
    tags: ["Full-time", "Remote"],
    summary: "Set the creative bar across every client engagement — from campaign concepts to the design systems that scale them.",
    overview:
      "We're looking for a Creative Director to set the creative bar across every client engagement — from campaign concepts to the design systems that scale them. You'll lead a small team of designers and writers, partner closely with strategy, and be the person in the room who can defend a creative point of view to a client's leadership team.",
    responsibilities: [
      "Set creative direction across brand, campaign, and content work",
      "Lead and mentor a small team of designers and writers",
      "Partner with strategy to turn positioning into standout creative",
      "Present concepts to clients and defend the work with a point of view",
      "Own creative quality control across every client deliverable",
      "Help build the internal design systems that let the work scale",
    ],
    requirements: [
      "8+ years in creative roles, with 3+ leading a team",
      "A portfolio spanning brand identity, campaign, and digital work",
      "Strong taste and an even stronger ability to explain it",
      "Experience presenting directly to client leadership",
    ],
    niceToHave: [
      "Motion or video direction experience",
      "Experience building or scaling a design system",
      "A point of view on how AI tools fit into a creative workflow",
    ],
  },
  {
    slug: "client-partner",
    index: "04",
    name: "Client Partner",
    department: "Client Services",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    team: "Reports to the VP of Client Services",
    salary: "$120,000 – $150,000 + bonus",
    tags: ["Full-time", "New York"],
    summary: "Own the relationship for a portfolio of key accounts — the strategic and commercial lead clients call first.",
    overview:
      "We're hiring a Client Partner to own the relationship for a portfolio of key accounts — the strategic and commercial lead clients call first. You'll translate client goals into scoped, resourced engagements, coordinate our strategy, creative, and media teams around client priorities, and be accountable for growing the accounts you own, not just maintaining them.",
    responsibilities: [
      "Own client relationships end-to-end, from renewal to expansion",
      "Translate client goals into scoped, resourced engagements",
      "Coordinate strategy, creative, and media teams around client priorities",
      "Spot growth opportunities within existing accounts",
      "Own account forecasting, scoping, and commercial terms",
      "Be the senior escalation point when things need to move fast",
    ],
    requirements: [
      "5+ years in account or client leadership at an agency",
      "A track record of growing accounts, not just maintaining them",
      "Comfortable being the senior voice in the room with client execs",
      "Organized enough to run multiple accounts without dropping a thread",
    ],
    niceToHave: [
      "Experience managing 7-figure client relationships",
      "Background in a strategy, media, or creative discipline before client services",
      "Existing network in a specific vertical we serve",
    ],
  },
];

export function getRole(slug) {
  return ROLES.find((r) => r.slug === slug) || null;
}
