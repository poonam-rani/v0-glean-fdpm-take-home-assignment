"use client"

import { WorkspaceTabs } from "../workspace-tabs"
import { companyData } from "@/lib/company-data"

interface ContradictionsScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
  company: string
}

export function ContradictionsScreen({ activeTab, onTabChange, company }: ContradictionsScreenProps) {
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
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex items-center gap-3 text-white/30 text-sm mb-4">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning sources for contradictions...
              </div>
              <p className="text-[11px] text-white/20 text-center max-w-md">
                We&apos;re comparing statements across your {data.sources} sources to identify conflicting claims. This usually takes 1-2 minutes.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-medium text-white/90">{data.contradictions.length} contradiction{data.contradictions.length !== 1 ? "s" : ""} found</h2>
              <p className="text-xs text-white/40 mt-1">Places where your sources disagree</p>
            </div>
            <span className="text-[11px] text-white/40">Click to drill into source</span>
          </div>

          <div className="max-w-4xl flex flex-col gap-3">
            {data.contradictions.map((item) => (
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
      )}
    </div>
  )
}
