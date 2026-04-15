"use client"

import { ArrowRight, Calendar, AlertTriangle, MessageSquare, FileText } from "lucide-react"

interface HomeScreenProps {
  onNavigateToExpertPrep: () => void
}

const stats = [
  { label: "new signals", value: "12", icon: FileText },
  { label: "contradictions surfaced", value: "3", icon: AlertTriangle },
  { label: "expert calls today", value: "2", icon: Calendar },
  { label: "thesis needs review", value: "1", icon: MessageSquare },
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
    headline: "FDA accepted Moderna&apos;s flu/COVID combo BLA filing",
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
      return { border: "border-l-4 border-l-[#16A34A]", bg: "" }
    case "bear":
      return { border: "border-l-4 border-l-[#DC2626]", bg: "" }
    default:
      return { border: "border-l-4 border-l-[#D97706]", bg: "" }
  }
}

export function HomeScreen({ onNavigateToExpertPrep }: HomeScreenProps) {
  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Good morning, Benny</h1>
          <p className="text-gray-500 mt-1">Here&apos;s what changed overnight across your 4 covered companies</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#F7F7F8] rounded-lg p-4 border border-[#E5E7EB]"
            >
              <div className="flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Priority signals</h2>
          <div className="flex flex-col gap-3">
            {prioritySignals.map((signal, index) => {
              const styles = getSentimentStyles(signal.sentiment)
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 border border-[#E5E7EB] ${styles.border} hover:shadow-sm transition-shadow cursor-pointer`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          signal.sentiment === "bull" ? "bg-[#ECFDF5] text-[#16A34A]" :
                          signal.sentiment === "bear" ? "bg-[#FEF2F2] text-[#DC2626]" :
                          "bg-[#FFFBEB] text-[#D97706]"
                        }`}>
                          {signal.ticker}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{signal.headline}</h3>
                      <p className="text-sm text-gray-600 mb-3">{signal.summary}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{signal.source} · {signal.time}</span>
                        <span className="text-xs bg-[#EEF2FF] text-[#4F46E5] px-2 py-0.5 rounded">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s expert calls</h2>
          <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] font-medium">
                SC
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Dr. Sarah Chen</h3>
                <p className="text-sm text-gray-500">Former VP Commercial, Moderna</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">2:00 PM ET · 45 min</div>
                <div className="text-xs text-gray-400">via GLG</div>
              </div>
              <button 
                onClick={onNavigateToExpertPrep}
                className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white text-sm font-medium rounded-lg hover:bg-[#4F46E5] transition-colors"
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
