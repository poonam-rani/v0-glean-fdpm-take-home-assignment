"use client"

import { WorkspaceTabs } from "../workspace-tabs"

interface ConvictionScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const stats = [
  { label: "Total debates", value: "5", color: "gray" },
  { label: "View formed", value: "2", color: "green" },
  { label: "Still open", value: "3", color: "amber" },
  { label: "Evidence tagged", value: "14", color: "gray" },
]

const debates = [
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
  {
    id: 4,
    title: "Management credibility",
    status: "View formed: Bull",
    statusColor: "indigo",
    position: 90,
    bullEvidence: 5,
    bearEvidence: 0,
    bgClass: "bg-indigo-500/[0.08]",
    borderClass: "border-indigo-500/30",
  },
]

const getStatusTextColor = (color: string) => {
  switch (color) {
    case "green":
      return "text-green-400"
    case "indigo":
      return "text-indigo-300"
    default:
      return "text-amber-500"
  }
}

const getStatValueColor = (color: string) => {
  switch (color) {
    case "green":
      return "text-green-400"
    case "amber":
      return "text-amber-500"
    default:
      return "text-white/95"
  }
}

export function ConvictionScreen({ activeTab, onTabChange }: ConvictionScreenProps) {
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
        <div className="max-w-4xl">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] rounded-lg p-3.5 text-center"
              >
                <div className={`text-2xl font-medium ${getStatValueColor(stat.color)}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section title */}
          <div className="text-[13px] text-white/70 font-medium mb-3">Debate conviction status</div>

          {/* Conviction meters */}
          <div className="flex flex-col gap-2.5 mb-6">
            {debates.map((debate) => (
              <div
                key={debate.id}
                className={`rounded-lg p-3.5 border ${debate.borderClass} ${debate.bgClass || 'bg-white/[0.03]'}`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-[13px] text-white/90">{debate.title}</h3>
                  <span className={`text-[11px] ${getStatusTextColor(debate.statusColor)}`}>
                    {debate.status}
                  </span>
                </div>

                {/* Conviction meter */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[10px] text-red-500 w-8">Bear</span>
                  <div className="flex-1 h-2 bg-white/10 rounded relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 bottom-0 rounded"
                      style={{ 
                        width: `${debate.position}%`,
                        background: debate.position < 50 
                          ? 'linear-gradient(90deg, #ef4444 0%, #fbbf24 100%)'
                          : debate.position < 75
                          ? 'linear-gradient(90deg, #fbbf24 0%, #22c55e 100%)'
                          : 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)'
                      }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-sm"
                      style={{ left: `calc(${debate.position}% - 2px)` }}
                    />
                  </div>
                  <span className="text-[10px] text-green-500 w-8 text-right">Bull</span>
                </div>

                <div className="text-[10px] text-white/40">
                  {debate.bullEvidence} bull evidence · {debate.bearEvidence} bear evidence
                </div>
              </div>
            ))}
          </div>

          {/* Coverage gaps alert */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="text-amber-400 text-sm">&#9888;</span>
              <div>
                <div className="text-[13px] text-amber-400 font-medium mb-1.5">Coverage gaps identified</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  The &quot;IRA pricing impact&quot; open question has no evidence tagged yet. Consider adding this to your next expert call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
