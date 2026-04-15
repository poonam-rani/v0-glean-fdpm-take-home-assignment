"use client"

import { ArrowRight } from "lucide-react"

interface HomeScreenProps {
  onNavigateToExpertPrep: () => void
}

const stats = [
  { label: "new signals", value: "12" },
  { label: "contradictions surfaced", value: "3" },
  { label: "expert calls today", value: "2" },
  { label: "thesis needs review", value: "1" },
]

const prioritySignals = [
  {
    ticker: "$VRTX",
    sentiment: "bear",
    headline: "Morgan Stanley downgraded Vertex genericization timeline by 4 years",
    summary: "Analyst revises patent cliff expectations from 2037 to 2032-2033, citing vulnerability in key formulation patents.",
    source: "Morgan Stanley",
    time: "2h ago",
    affects: "Trikafta durability debate",
  },
  {
    ticker: "$MRNA",
    sentiment: "bull",
    headline: "FDA accepted Moderna's flu/COVID combo BLA filing",
    summary: "Regulatory milestone de-risks pipeline diversification thesis. PDUFA date expected Q3 2026.",
    source: "FDA Press Release",
    time: "4h ago",
    affects: "Pipeline diversification",
  },
  {
    ticker: "$LLY",
    sentiment: "neutral",
    headline: "Q4 transcript shows R&D intensity guidance changed",
    summary: "CFO revised R&D expense guidance up 200-300bps for 2026, signaling either pipeline confidence or cost discipline slippage.",
    source: "Q4 2025 Earnings Call",
    time: "6h ago",
    affects: "Capital allocation",
  },
  {
    ticker: "$VRTX",
    sentiment: "bear",
    headline: "Bernstein flagged Casgevy reimbursement risk in payer survey",
    summary: "70% of surveyed payers expressed concerns about one-time gene therapy pricing models.",
    source: "Bernstein Research",
    time: "8h ago",
    affects: "Gene editing optionality",
  },
]

const getSentimentStyles = (sentiment: string) => {
  switch (sentiment) {
    case "bull":
      return { border: "border-l-2 border-l-green-500", badge: "bg-green-500/15 text-green-400" }
    case "bear":
      return { border: "border-l-2 border-l-red-500", badge: "bg-red-500/15 text-red-400" }
    default:
      return { border: "border-l-2 border-l-amber-500", badge: "bg-amber-500/15 text-amber-400" }
  }
}

export function HomeScreen({ onNavigateToExpertPrep }: HomeScreenProps) {
  return (
    <div className="flex-1 bg-[#0f1117] overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-white/95">Good morning, Benny</h1>
          <p className="text-sm text-white/40 mt-1">Here&apos;s what changed overnight across your 4 covered companies</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-medium text-white/95">{stat.value}</div>
              <div className="text-[11px] text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-medium text-white/70 mb-4">Priority signals</h2>
          <div className="flex flex-col gap-2.5">
            {prioritySignals.map((signal, index) => {
              const styles = getSentimentStyles(signal.sentiment)
              return (
                <div
                  key={index}
                  className={`bg-white/[0.03] rounded-lg p-4 border border-white/10 ${styles.border} hover:bg-white/[0.05] transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${styles.badge}`}>
                          {signal.ticker}
                        </span>
                      </div>
                      <h3 className="text-[13px] font-medium text-white/90 mb-1">{signal.headline}</h3>
                      <p className="text-xs text-white/50 mb-3 leading-relaxed">{signal.summary}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-white/30">{signal.source} · {signal.time}</span>
                        <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded">
                          Affects: {signal.affects}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white/70 mb-4">Today&apos;s expert calls</h2>
          <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-sm font-medium">
                SC
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white/90">Dr. Sarah Chen</h3>
                <p className="text-xs text-white/50">Former VP Commercial, Moderna</p>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-medium text-white/90">2:00 PM ET · 45 min</div>
                <div className="text-[11px] text-white/40">via GLG</div>
              </div>
              <button 
                onClick={onNavigateToExpertPrep}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium rounded-md hover:bg-indigo-500/30 transition-colors"
              >
                View prep questions
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
