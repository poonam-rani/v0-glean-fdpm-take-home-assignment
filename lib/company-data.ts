export type CompanyStatus = "view-formed" | "debates-open" | "processing"

export interface Debate {
  id: number
  title: string
  subtitle: string
  status: "open" | "leaning-bull" | "leaning-bear" | "view-formed"
  expanded: boolean
  bull?: {
    text: string
    assumption?: string
  }
  bear?: {
    text: string
    assumption?: string
  }
  summary?: string
  sources: string[]
}

export interface Contradiction {
  id: number
  severity: "red" | "amber"
  title: string
  leftSource: string
  leftQuote: string
  rightSource: string
  rightQuote: string
  implication: string
}

export interface ConvictionDebate {
  id: number
  title: string
  status: string
  statusColor: "amber" | "green" | "indigo" | "red"
  position: number
  bullEvidence: number
  bearEvidence: number
  bgClass: string
  borderClass: string
}

export interface ExpertCall {
  name: string
  initials: string
  title: string
  date: string
  platform: string
  duration: string
  calendarNote: string
  questions: {
    id: number
    text: string
    tags: { label: string; color: "amber" | "green" | "gray" }[]
  }[]
}

export interface CompanyData {
  name: string
  ticker: string
  sector: string
  sources: number
  lastUpdated: string
  status: CompanyStatus
  statusText: string
  debates: Debate[]
  contradictions: Contradiction[]
  convictionStats: { label: string; value: string; color: "gray" | "green" | "amber" }[]
  convictionDebates: ConvictionDebate[]
  coverageGap?: string
  expertCall: ExpertCall
}

export const companyData: Record<string, CompanyData> = {
  "Vertex Pharma": {
    name: "Vertex Pharmaceuticals",
    ticker: "VRTX",
    sector: "Healthcare · Biotech",
    sources: 8,
    lastUpdated: "2h ago",
    status: "debates-open",
    statusText: "2 of 3 debates open",
    debates: [
      {
        id: 1,
        title: "Trikafta revenue durability vs. genericization risk",
        subtitle: "Mentioned in 6 sources · High materiality",
        status: "open",
        expanded: true,
        bull: {
          text: "Patent protection through 2037. CF patient population locked in. Pricing power intact despite IRA.",
          assumption: "Assumes: No major biosimilar pathway established",
        },
        bear: {
          text: "Pipeline beyond CF is unproven. Revenue cliff risk if generic pathway accelerates. Single-product dependency.",
          assumption: "Assumes: FDA streamlines biosimilar approvals",
        },
        sources: ["10K 2025, p.47", "Morgan Stanley, Jan 2026", "Q4 2025 Transcript"],
      },
      {
        id: 2,
        title: "Pipeline optionality: gene editing viability",
        subtitle: "Mentioned in 4 sources · Medium materiality",
        status: "open",
        expanded: true,
        bull: {
          text: "CRISPR partnership de-risks R&D. Casgevy approval validates platform. Multiple shots on goal beyond CF.",
        },
        bear: {
          text: "Gene editing commercialization unproven at scale. Manufacturing complexity. Reimbursement uncertainty for one-time cures.",
        },
        sources: ["JPM Healthcare Conf, Jan 2026", "Goldman Sachs, Dec 2025"],
      },
      {
        id: 3,
        title: "Capital allocation: M&A vs. buybacks",
        subtitle: "Mentioned in 3 sources · Low materiality",
        status: "leaning-bull",
        expanded: false,
        summary: "Management has signaled discipline. $4B buyback authorization supports floor. M&A likely bolt-on only.",
        sources: ["Q4 2025 Transcript", "CFO Interview, Feb 2026"],
      },
    ],
    contradictions: [
      {
        id: 1,
        severity: "red",
        title: "Management vs. sell-side on genericization timeline",
        leftSource: "10K 2025, p.23 · Management",
        leftQuote: "We believe our intellectual property portfolio provides protection through at least 2037, with additional patents pending that could extend this horizon.",
        rightSource: "Morgan Stanley, Jan 2026 · Analyst",
        rightQuote: "Our patent analysis suggests meaningful generic risk beginning in 2032-2033, earlier than management guidance implies. Key formulation patents may be more vulnerable than the company acknowledges.",
        implication: "4-5 year discrepancy in genericization timeline materially impacts DCF valuation. Requires expert validation.",
      },
      {
        id: 2,
        severity: "amber",
        title: "Q4 guidance vs. Q3 commentary on R&D spend",
        leftSource: "Q3 2025 Transcript · CFO",
        leftQuote: "We expect R&D expenses to remain flat as a percentage of revenue through 2026.",
        rightSource: "Q4 2025 Transcript · CFO",
        rightQuote: "Given pipeline acceleration, we now expect R&D intensity to increase 200-300 bps in 2026.",
        implication: "Guidance change in one quarter. Could signal pipeline confidence or cost discipline slippage.",
      },
    ],
    convictionStats: [
      { label: "Total debates", value: "3", color: "gray" },
      { label: "View formed", value: "1", color: "green" },
      { label: "Still open", value: "2", color: "amber" },
      { label: "Evidence tagged", value: "14", color: "gray" },
    ],
    convictionDebates: [
      {
        id: 1,
        title: "Trikafta revenue durability",
        status: "Open",
        statusColor: "amber",
        position: 50,
        bullEvidence: 3,
        bearEvidence: 2,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 2,
        title: "Pipeline optionality: gene editing",
        status: "Open",
        statusColor: "amber",
        position: 35,
        bullEvidence: 2,
        bearEvidence: 3,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 3,
        title: "Capital allocation discipline",
        status: "Leaning bull",
        statusColor: "green",
        position: 75,
        bullEvidence: 4,
        bearEvidence: 1,
        bgClass: "bg-green-500/5",
        borderClass: "border-green-500/20",
      },
    ],
    coverageGap: "The \"IRA pricing impact\" open question has no evidence tagged yet. Consider adding this to your next expert call.",
    expertCall: {
      name: "Dr. Sarah Chen",
      initials: "SC",
      title: "Former VP Commercial, Moderna · 2019-2024",
      date: "Tomorrow, 2:00 PM ET",
      platform: "GLG",
      duration: "45 min",
      calendarNote: "GLG Expert Call - Sarah Chen, Moderna Commercial",
      questions: [
        {
          id: 1,
          text: "When you were evaluating competitive dynamics in CF, what was Moderna's internal view on Vertex's genericization exposure timeline?",
          tags: [
            { label: "Trikafta durability debate", color: "amber" },
            { label: "Unlocks: Timeline specificity", color: "gray" },
          ],
        },
        {
          id: 2,
          text: "How did Moderna's commercial org think about Vertex's pricing power post-IRA vs. your approach in vaccines?",
          tags: [
            { label: "Trikafta durability debate", color: "amber" },
            { label: "Unlocks: Peer comp perspective", color: "gray" },
          ],
        },
        {
          id: 3,
          text: "What's your read on Vertex's gene editing partnership structure? Does the CRISPR deal de-risk their pipeline or create dependency?",
          tags: [
            { label: "Pipeline optionality debate", color: "amber" },
            { label: "Unlocks: Platform vs. one-off", color: "gray" },
          ],
        },
        {
          id: 4,
          text: "If you had to bet on one thing that the market is getting wrong about Vertex right now, what would it be?",
          tags: [
            { label: "Alpha question", color: "green" },
            { label: "Unlocks: Non-consensus view", color: "gray" },
          ],
        },
      ],
    },
  },
  "Moderna": {
    name: "Moderna, Inc.",
    ticker: "MRNA",
    sector: "Healthcare · Biotech",
    sources: 12,
    lastUpdated: "4h ago",
    status: "view-formed",
    statusText: "View formed",
    debates: [
      {
        id: 1,
        title: "COVID franchise decline trajectory vs. endemic demand",
        subtitle: "Mentioned in 8 sources · High materiality",
        status: "view-formed",
        expanded: true,
        bull: {
          text: "Endemic COVID creates durable annual revenue stream of $4-6B. First-mover advantage in updated boosters. Strong government relationships.",
          assumption: "Assumes: Annual booster uptake stabilizes at 30-40% of eligible population",
        },
        bear: {
          text: "COVID fatigue driving rapid demand erosion. Pricing pressure as pandemic ends. J&J and Novavax gaining share.",
          assumption: "Assumes: Booster demand falls below 20% by 2027",
        },
        sources: ["10K 2025", "Jefferies, Feb 2026", "CDC Vaccine Advisory, Jan 2026", "Q4 2025 Transcript"],
      },
      {
        id: 2,
        title: "mRNA platform optionality: RSV and flu pipeline",
        subtitle: "Mentioned in 6 sources · High materiality",
        status: "leaning-bull",
        expanded: true,
        bull: {
          text: "RSV vaccine mRESVIA showing strong efficacy. Flu/COVID combo could capture $10B+ market. Platform validated beyond COVID.",
        },
        bear: {
          text: "GSK and Pfizer have head start in RSV. Combo vaccines face regulatory complexity. Manufacturing scale-up challenges persist.",
        },
        sources: ["Goldman Sachs, Jan 2026", "Phase 3 RSV Data, Dec 2025"],
      },
      {
        id: 3,
        title: "Cash runway and capital allocation",
        subtitle: "Mentioned in 4 sources · Medium materiality",
        status: "open",
        expanded: false,
        summary: "$18B cash on hand provides 4+ years runway at current burn. Management signaling discipline but oncology partnerships could accelerate spend.",
        sources: ["Q4 2025 Transcript", "Morgan Stanley, Feb 2026"],
      },
    ],
    contradictions: [
      {
        id: 1,
        severity: "red",
        title: "Management vs. sell-side on COVID revenue trajectory",
        leftSource: "Q4 2025 Transcript · CEO",
        leftQuote: "We see a clear path to $5B+ in annual COVID revenue through 2028, supported by government contracts and increasing awareness of booster benefits.",
        rightSource: "Jefferies, Feb 2026 · Analyst",
        rightQuote: "Our channel checks suggest COVID revenue could fall to $2-3B by 2027 as booster fatigue accelerates and government stockpiling ends.",
        implication: "$2-3B revenue discrepancy. Market pricing in bear case - upside if management delivers.",
      },
    ],
    convictionStats: [
      { label: "Total debates", value: "3", color: "gray" },
      { label: "View formed", value: "2", color: "green" },
      { label: "Still open", value: "1", color: "amber" },
      { label: "Evidence tagged", value: "18", color: "gray" },
    ],
    convictionDebates: [
      {
        id: 1,
        title: "COVID franchise sustainability",
        status: "View formed: Bear",
        statusColor: "indigo",
        position: 25,
        bullEvidence: 2,
        bearEvidence: 5,
        bgClass: "bg-indigo-500/[0.08]",
        borderClass: "border-indigo-500/30",
      },
      {
        id: 2,
        title: "mRNA platform optionality",
        status: "Leaning bull",
        statusColor: "green",
        position: 70,
        bullEvidence: 4,
        bearEvidence: 2,
        bgClass: "bg-green-500/5",
        borderClass: "border-green-500/20",
      },
      {
        id: 3,
        title: "Cash runway adequacy",
        status: "Open",
        statusColor: "amber",
        position: 55,
        bullEvidence: 3,
        bearEvidence: 2,
        bgClass: "",
        borderClass: "border-white/10",
      },
    ],
    expertCall: {
      name: "Dr. Michael Torres",
      initials: "MT",
      title: "Former Head of Vaccine Strategy, Pfizer · 2018-2023",
      date: "Thursday, 10:00 AM ET",
      platform: "AlphaSights",
      duration: "60 min",
      calendarNote: "AlphaSights Expert Call - Michael Torres, Pfizer Vaccines",
      questions: [
        {
          id: 1,
          text: "From your time at Pfizer, how do you assess Moderna's competitive position in the endemic COVID market? Where are they vulnerable?",
          tags: [
            { label: "COVID franchise debate", color: "amber" },
            { label: "Unlocks: Competitive dynamics", color: "gray" },
          ],
        },
        {
          id: 2,
          text: "What's the realistic timeline for a flu/COVID combo vaccine gaining FDA approval and meaningful market share?",
          tags: [
            { label: "Platform optionality debate", color: "amber" },
            { label: "Unlocks: Regulatory pathway", color: "gray" },
          ],
        },
        {
          id: 3,
          text: "How does Moderna's manufacturing infrastructure compare to Pfizer's? Can they achieve competitive unit economics?",
          tags: [
            { label: "Unlocks: Margin analysis", color: "gray" },
          ],
        },
      ],
    },
  },
  "Eli Lilly": {
    name: "Eli Lilly and Company",
    ticker: "LLY",
    sector: "Healthcare · Pharma",
    sources: 15,
    lastUpdated: "1h ago",
    status: "debates-open",
    statusText: "2 of 4 debates open",
    debates: [
      {
        id: 1,
        title: "GLP-1 market dominance vs. Novo Nordisk competition",
        subtitle: "Mentioned in 10 sources · High materiality",
        status: "open",
        expanded: true,
        bull: {
          text: "Mounjaro/Zepbound showing superior efficacy. Manufacturing ramp addressing supply constraints. Obesity indication expands TAM 3x.",
          assumption: "Assumes: Supply meets demand by mid-2026",
        },
        bear: {
          text: "Novo's Wegovy has brand awareness lead. Oral GLP-1s from competitors could disrupt. Pricing pressure from PBMs intensifying.",
          assumption: "Assumes: Competition launches oral alternatives by 2027",
        },
        sources: ["10K 2025", "BMO Capital, Jan 2026", "JPM Healthcare Conf", "Novo Q4 Transcript"],
      },
      {
        id: 2,
        title: "Manufacturing capacity execution risk",
        subtitle: "Mentioned in 7 sources · High materiality",
        status: "open",
        expanded: true,
        bull: {
          text: "$9B manufacturing investment coming online. RTP facility expansion on track. Partnerships with contract manufacturers scaling.",
        },
        bear: {
          text: "History of manufacturing delays. FDA inspection risks. $9B capex straining returns if demand softens.",
        },
        sources: ["10K 2025, p.89", "Bernstein, Feb 2026", "Site Visit Notes, Jan 2026"],
      },
      {
        id: 3,
        title: "Alzheimer's pipeline: Donanemab commercial potential",
        subtitle: "Mentioned in 5 sources · Medium materiality",
        status: "leaning-bull",
        expanded: false,
        summary: "FDA approval received. Differentiated label vs. Leqembi. Reimbursement pathway clearing. $5B peak sales achievable.",
        sources: ["FDA Label, 2025", "UBS, Jan 2026", "KOL Call, Dec 2025"],
      },
      {
        id: 4,
        title: "Valuation sustainability at 50x+ forward PE",
        subtitle: "Mentioned in 4 sources · Medium materiality",
        status: "leaning-bear",
        expanded: false,
        summary: "Premium valuation assumes flawless execution. Any disappointment severely punished. Historical de-rating risk from obesity sector.",
        sources: ["Barclays, Feb 2026", "Hedge Fund Survey, Jan 2026"],
      },
    ],
    contradictions: [
      {
        id: 1,
        severity: "red",
        title: "Divergent views on GLP-1 market share trajectory",
        leftSource: "Eli Lilly 10K 2025 · Management",
        leftQuote: "We expect to capture 40%+ of the GLP-1 market by 2027, driven by superior efficacy data and expanding manufacturing capacity.",
        rightSource: "Novo Nordisk Q4 2025 · Management",
        rightQuote: "Wegovy's brand leadership and our oral pipeline position us to maintain market leadership. We see no path for competitors to reach parity.",
        implication: "Both managements claiming market leadership. Independent market share analysis critical.",
      },
      {
        id: 2,
        severity: "amber",
        title: "Manufacturing timeline projections diverge",
        leftSource: "CFO at JPM Conference · Jan 2026",
        leftQuote: "RTP facility will be fully operational by Q2 2026, adding 50% to our GLP-1 capacity.",
        rightSource: "Site Visit Notes · Analyst",
        rightQuote: "Equipment installation behind schedule. Realistic go-live appears to be Q4 2026 at earliest based on our observations.",
        implication: "2-3 quarter gap between management guidance and field observations. Supply constraints may persist longer.",
      },
    ],
    convictionStats: [
      { label: "Total debates", value: "4", color: "gray" },
      { label: "View formed", value: "2", color: "green" },
      { label: "Still open", value: "2", color: "amber" },
      { label: "Evidence tagged", value: "22", color: "gray" },
    ],
    convictionDebates: [
      {
        id: 1,
        title: "GLP-1 market dominance",
        status: "Open",
        statusColor: "amber",
        position: 55,
        bullEvidence: 5,
        bearEvidence: 4,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 2,
        title: "Manufacturing execution",
        status: "Open",
        statusColor: "amber",
        position: 40,
        bullEvidence: 2,
        bearEvidence: 3,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 3,
        title: "Donanemab commercial potential",
        status: "Leaning bull",
        statusColor: "green",
        position: 72,
        bullEvidence: 4,
        bearEvidence: 1,
        bgClass: "bg-green-500/5",
        borderClass: "border-green-500/20",
      },
    ],
    coverageGap: "No expert calls scheduled for manufacturing deep-dive. Consider adding operations expert to validate capacity timeline.",
    expertCall: {
      name: "Dr. Jennifer Walsh",
      initials: "JW",
      title: "Former VP Commercial, Novo Nordisk · 2017-2023",
      date: "Friday, 3:00 PM ET",
      platform: "Third Bridge",
      duration: "45 min",
      calendarNote: "Third Bridge Expert Call - Jennifer Walsh, Novo Commercial",
      questions: [
        {
          id: 1,
          text: "How does Novo view Lilly's competitive threat in GLP-1? What keeps them up at night about Mounjaro/Zepbound?",
          tags: [
            { label: "GLP-1 dominance debate", color: "amber" },
            { label: "Unlocks: Competitive intel", color: "gray" },
          ],
        },
        {
          id: 2,
          text: "From your experience, how sticky is the Wegovy patient population? What would it take for them to switch to Zepbound?",
          tags: [
            { label: "GLP-1 dominance debate", color: "amber" },
            { label: "Unlocks: Patient dynamics", color: "gray" },
          ],
        },
        {
          id: 3,
          text: "What's the biggest misconception the buy-side has about the GLP-1 competitive landscape?",
          tags: [
            { label: "Alpha question", color: "green" },
            { label: "Unlocks: Non-consensus view", color: "gray" },
          ],
        },
      ],
    },
  },
  "BioMarin": {
    name: "BioMarin Pharmaceutical",
    ticker: "BMRN",
    sector: "Healthcare · Rare Disease",
    sources: 6,
    lastUpdated: "Just now",
    status: "processing",
    statusText: "New - processing",
    debates: [
      {
        id: 1,
        title: "Rare disease pricing sustainability vs. policy risk",
        subtitle: "Processing sources...",
        status: "open",
        expanded: true,
        bull: {
          text: "Orphan drug protections remain strong. Patient populations too small for IRA negotiation. Premium pricing justified by unmet need.",
        },
        bear: {
          text: "European reference pricing spreading. PBM scrutiny increasing. Vimizim and Naglazyme facing biosimilar risk in select markets.",
        },
        sources: ["10K 2025", "Cowen, Jan 2026"],
      },
      {
        id: 2,
        title: "Pipeline depth: Roctavian gene therapy trajectory",
        subtitle: "Processing sources...",
        status: "open",
        expanded: true,
        bull: {
          text: "One-time hemophilia A cure with durable efficacy. $2.9M price point justified by lifetime bleed prevention. European launch gaining traction.",
        },
        bear: {
          text: "Commercial adoption slower than expected. Payer resistance to $2.9M price. Manufacturing yield issues limiting production.",
        },
        sources: ["Goldman Sachs, Dec 2025", "Q4 2025 Transcript"],
      },
    ],
    contradictions: [
      {
        id: 1,
        severity: "amber",
        title: "Roctavian uptake expectations diverge",
        leftSource: "Q4 2025 Transcript · CEO",
        leftQuote: "We remain confident in $500M+ Roctavian revenue by 2027 as treatment centers scale and payer coverage expands.",
        rightSource: "Cowen, Jan 2026 · Analyst",
        rightQuote: "Our channel checks suggest Roctavian tracking to $150-200M in 2027. Infusion center capacity and patient identification remain bottlenecks.",
        implication: "$300M+ gap in revenue expectations. Treatment center build-out is key swing factor.",
      },
    ],
    convictionStats: [
      { label: "Total debates", value: "2", color: "gray" },
      { label: "View formed", value: "0", color: "green" },
      { label: "Still open", value: "2", color: "amber" },
      { label: "Evidence tagged", value: "4", color: "gray" },
    ],
    convictionDebates: [
      {
        id: 1,
        title: "Rare disease pricing sustainability",
        status: "Processing",
        statusColor: "amber",
        position: 50,
        bullEvidence: 1,
        bearEvidence: 1,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 2,
        title: "Roctavian gene therapy",
        status: "Processing",
        statusColor: "amber",
        position: 50,
        bullEvidence: 1,
        bearEvidence: 1,
        bgClass: "",
        borderClass: "border-white/10",
      },
      {
        id: 3,
        title: "Pipeline beyond gene therapy",
        status: "Not started",
        statusColor: "amber",
        position: 50,
        bullEvidence: 0,
        bearEvidence: 0,
        bgClass: "",
        borderClass: "border-white/10",
      },
    ],
    expertCall: {
      name: "Dr. Robert Kim",
      initials: "RK",
      title: "Hemophilia Treatment Center Director · Academic Medical Center",
      date: "Next week TBD",
      platform: "Guidepoint",
      duration: "30 min",
      calendarNote: "Pending scheduling - Hemophilia KOL",
      questions: [
        {
          id: 1,
          text: "What's driving the slower-than-expected Roctavian adoption at treatment centers? Is it physician hesitancy, patient selection, or payer issues?",
          tags: [
            { label: "Roctavian debate", color: "amber" },
            { label: "Unlocks: Adoption barriers", color: "gray" },
          ],
        },
        {
          id: 2,
          text: "How do patients and families weigh a one-time $2.9M gene therapy vs. ongoing factor replacement? What's the decision calculus?",
          tags: [
            { label: "Pricing sustainability debate", color: "amber" },
            { label: "Unlocks: Patient perspective", color: "gray" },
          ],
        },
        {
          id: 3,
          text: "What would it take for Roctavian to become standard of care for eligible hemophilia A patients?",
          tags: [
            { label: "Alpha question", color: "green" },
            { label: "Unlocks: Inflection point", color: "gray" },
          ],
        },
      ],
    },
  },
}
