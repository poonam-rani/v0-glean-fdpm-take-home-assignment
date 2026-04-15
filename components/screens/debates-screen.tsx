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
      assumption: "Assumes: Manufacturing scales successfully",
    },
    bear: {
      text: "Gene editing commercialization unproven at scale. Manufacturing complexity. Reimbursement uncertainty for one-time cures.",
      assumption: "Assumes: Payer resistance continues",
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
      return { dot: "bg-[#6366F1]", text: "text-[#6366F1]", label: "Leaning bull", cardBg: "bg-[#EEF2FF]/30" }
    case "open":
    default:
      return { dot: "bg-[#D97706]", text: "text-[#D97706]", label: "Open", cardBg: "" }
  }
}

export function DebatesScreen({ activeTab, onTabChange }: DebatesScreenProps) {
  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="border-b border-[#E5E7EB] bg-white px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Vertex Pharmaceuticals</h1>
            <p className="text-sm text-gray-500">Healthcare · Biotech · $VRTX</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#F7F7F8] text-gray-600 px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              8 sources
            </span>
            <span className="text-xs bg-[#F7F7F8] text-gray-600 px-3 py-1.5 rounded-full border border-[#E5E7EB]">
              Updated 2h ago
            </span>
          </div>
        </div>
        <WorkspaceTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      <div className="p-8">
        <div className="max-w-4xl flex flex-col gap-4">
          {debates.map((debate) => {
            const statusStyles = getStatusStyles(debate.status)
            return (
              <div
                key={debate.id}
                className={`rounded-lg border border-[#E5E7EB] overflow-hidden ${statusStyles.cardBg}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{debate.title}</h3>
                      <p className="text-sm text-gray-500">{debate.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${statusStyles.dot}`} />
                      <span className={`text-sm font-medium ${statusStyles.text}`}>
                        {statusStyles.label}
                      </span>
                    </div>
                  </div>

                  {debate.expanded ? (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#ECFDF5] rounded-lg p-4 border border-[#16A34A]/10">
                          <div className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider mb-2">
                            Bull Case
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{debate.bull?.text}</p>
                          <p className="text-xs text-gray-500 italic">{debate.bull?.assumption}</p>
                        </div>
                        <div className="bg-[#FEF2F2] rounded-lg p-4 border border-[#DC2626]/10">
                          <div className="text-xs font-semibold text-[#DC2626] uppercase tracking-wider mb-2">
                            Bear Case
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{debate.bear?.text}</p>
                          <p className="text-xs text-gray-500 italic">{debate.bear?.assumption}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {debate.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-[#F7F7F8] text-gray-600 px-2 py-1 rounded border border-[#E5E7EB]"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-700 mb-3">{debate.summary}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {debate.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-[#F7F7F8] text-gray-600 px-2 py-1 rounded border border-[#E5E7EB]"
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
