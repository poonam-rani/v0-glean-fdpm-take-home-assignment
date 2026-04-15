"use client"

import { WorkspaceTabs } from "../workspace-tabs"
import { companyData } from "@/lib/company-data"

interface ConvictionScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
  company: string
}

const getStatusTextColor = (color: string) => {
  switch (color) {
    case "green":
      return "text-green-400"
    case "indigo":
      return "text-indigo-300"
    case "red":
      return "text-red-400"
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

export function ConvictionScreen({ activeTab, onTabChange, company }: ConvictionScreenProps) {
  const data = companyData[company]
  
  if (!data) {
    return (
      <div className="flex-1 bg-[#0f1117] flex items-center justify-center">
        <div className="text-white/40">Company not found</div>
      </div>
    )
  }

  const isProcessing = data.status === "processing"

  return (
    <div className="flex-1 bg-[#0f1117] overflow-auto">
      <div className="border-b border-white/10 bg-[#0f1117] px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-medium text-white/95">{data.name}</h1>
              {isProcessing && (
                <span className="text-[11px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded animate-pulse">
                  Processing...
                </span>
              )}
            </div>
            <p className="text-xs text-white/40 mt-1">{data.sector} · ${data.ticker}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-md">
              {data.sources} sources
            </span>
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-md">
              Updated {data.lastUpdated}
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-md ${
              data.status === "view-formed" 
                ? "bg-green-500/10 text-green-400" 
                : data.status === "processing"
                ? "bg-indigo-500/10 text-indigo-300"
                : "bg-amber-500/10 text-amber-500"
            }`}>
              {data.statusText}
            </span>
          </div>
        </div>
        <WorkspaceTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {isProcessing ? (
        <div className="p-6">
          <div className="max-w-4xl">
            <div className="grid grid-cols-4 gap-3 mb-6">
              {data.convictionStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] rounded-lg p-3.5 text-center animate-pulse"
                >
                  <div className="text-2xl font-medium text-white/20">--</div>
                  <div className="text-[11px] text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex items-center gap-3 text-white/30 text-sm mb-4">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Building conviction tracker...
              </div>
              <p className="text-[11px] text-white/20 text-center max-w-md">
                We&apos;re analyzing evidence strength and mapping it to your debates. This will update as we process more sources.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="max-w-4xl">
            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {data.convictionStats.map((stat) => (
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
              {data.convictionDebates.map((debate) => (
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
            {data.coverageGap && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 text-sm">&#9888;</span>
                  <div>
                    <div className="text-[13px] text-amber-400 font-medium mb-1.5">Coverage gaps identified</div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {data.coverageGap}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
