"use client"

import { WorkspaceTabs } from "../workspace-tabs"

interface DebatesScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const debates = [
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
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case "leaning-bull":
      return { dot: "bg-indigo-500", text: "text-indigo-400", label: "Leaning bull", border: "border-indigo-500/30" }
    case "open":
    default:
      return { dot: "bg-amber-500", text: "text-amber-500", label: "Open", border: "border-white/10" }
  }
}

export function DebatesScreen({ activeTab, onTabChange }: DebatesScreenProps) {
  return (
    <div className="flex-1 bg-[#0f1117] overflow-auto">
      <div className="border-b border-white/10 bg-[#0f1117] px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-medium text-white/95">Vertex Pharmaceuticals</h1>
            <p className="text-xs text-white/40 mt-1">Healthcare · Biotech · $VRTX</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-md">
              8 sources
            </span>
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-md">
              Updated 2h ago
            </span>
          </div>
        </div>
        <WorkspaceTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      <div className="p-6">
        <div className="max-w-4xl flex flex-col gap-3">
          {debates.map((debate) => {
            const statusStyles = getStatusStyles(debate.status)
            return (
              <div
                key={debate.id}
                className={`rounded-lg border ${statusStyles.border} bg-white/[0.03] overflow-hidden`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-white/90">{debate.title}</h3>
                      <p className="text-xs text-white/40 mt-1">{debate.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${statusStyles.dot}`} />
                      <span className={`text-xs ${statusStyles.text}`}>
                        {statusStyles.label}
                      </span>
                    </div>
                  </div>

                  {debate.expanded ? (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-green-500/10 border-l-2 border-green-500 rounded-r-md p-3">
                          <div className="text-[11px] font-medium text-green-400 uppercase tracking-wide mb-1.5">
                            Bull Case
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">{debate.bull?.text}</p>
                          {debate.bull?.assumption && (
                            <p className="text-[11px] text-white/35 mt-2">{debate.bull.assumption}</p>
                          )}
                        </div>
                        <div className="bg-red-500/10 border-l-2 border-red-500 rounded-r-md p-3">
                          <div className="text-[11px] font-medium text-red-400 uppercase tracking-wide mb-1.5">
                            Bear Case
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">{debate.bear?.text}</p>
                          {debate.bear?.assumption && (
                            <p className="text-[11px] text-white/35 mt-2">{debate.bear.assumption}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {debate.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-white/5 text-white/40 px-2 py-1 rounded"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-white/50 mb-3 leading-relaxed">{debate.summary}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {debate.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-white/5 text-white/40 px-2 py-1 rounded"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
