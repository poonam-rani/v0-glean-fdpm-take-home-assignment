"use client"

import { WorkspaceTabs } from "../workspace-tabs"

interface ContradictionsScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const contradictions = [
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
    severity: "red",
    title: "Conflicting views on gene editing commercial potential",
    leftSource: "Goldman Sachs, Dec 2025",
    leftQuote: "Casgevy represents a platform opportunity. We model $2B+ peak sales across multiple indications by 2030.",
    rightSource: "Bernstein, Nov 2025",
    rightQuote: "One-time gene therapies face fundamental reimbursement challenges. We see Casgevy as a niche product with limited addressable market due to manufacturing constraints.",
    implication: "$2B difference in peak sales estimates. Manufacturing scale-up and payer dynamics are key diligence questions.",
  },
  {
    id: 3,
    severity: "amber",
    title: "Q4 guidance vs. Q3 commentary",
    leftSource: "Q3 2025 Transcript · CFO",
    leftQuote: "We expect R&D expenses to remain flat as a percentage of revenue through 2026.",
    rightSource: "Q4 2025 Transcript · CFO",
    rightQuote: "Given pipeline acceleration, we now expect R&D intensity to increase 200-300 bps in 2026.",
    implication: "Guidance change in one quarter. Could signal pipeline confidence or cost discipline slippage. Worth probing.",
  },
]

export function ContradictionsScreen({ activeTab, onTabChange }: ContradictionsScreenProps) {
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-medium text-white/90">3 contradictions found</h2>
            <p className="text-xs text-white/40 mt-1">Places where your sources disagree</p>
          </div>
          <span className="text-[11px] text-white/40">Click to drill into source</span>
        </div>

        <div className="max-w-4xl flex flex-col gap-3">
          {contradictions.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    item.severity === "red" ? "bg-red-500" : "bg-amber-500"
                  }`} />
                  <h3 className="text-[13px] font-medium text-white/90">{item.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white/[0.02] rounded-md p-3">
                    <div className="text-[10px] text-white/40 mb-2">
                      {item.leftSource}
                    </div>
                    <p className="text-xs text-white/80 italic leading-relaxed">&ldquo;{item.leftQuote}&rdquo;</p>
                  </div>
                  <div className="bg-white/[0.02] rounded-md p-3">
                    <div className="text-[10px] text-white/40 mb-2">
                      {item.rightSource}
                    </div>
                    <p className="text-xs text-white/80 italic leading-relaxed">&ldquo;{item.rightQuote}&rdquo;</p>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-3">
                  <p className="text-[11px] text-white/50">
                    <span className="text-white/70">Implication:</span> {item.implication}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
