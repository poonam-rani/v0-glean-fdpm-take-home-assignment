"use client"

import { WorkspaceTabs } from "../workspace-tabs"
import { companyData } from "@/lib/company-data"

interface DebatesScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
  company: string
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "leaning-bull":
      return { dot: "bg-indigo-500", text: "text-indigo-400", label: "Leaning bull", border: "border-indigo-500/30" }
    case "leaning-bear":
      return { dot: "bg-red-400", text: "text-red-400", label: "Leaning bear", border: "border-red-500/30" }
    case "view-formed":
      return { dot: "bg-green-500", text: "text-green-400", label: "View formed", border: "border-green-500/30" }
    case "open":
    default:
      return { dot: "bg-amber-500", text: "text-amber-500", label: "Open", border: "border-white/10" }
  }
}

export function DebatesScreen({ activeTab, onTabChange, company }: DebatesScreenProps) {
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
            <div className="flex flex-col gap-3">
              {data.debates.map((debate) => (
                <div
                  key={debate.id}
                  className="rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden animate-pulse"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-white/90">{debate.title}</h3>
                        <p className="text-xs text-white/40 mt-1">{debate.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                        <span className="text-xs text-indigo-300">Processing</span>
                      </div>
                    </div>
                    <div className="h-24 bg-white/[0.02] rounded-md flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white/30 text-xs">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing sources and extracting arguments...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="max-w-4xl flex flex-col gap-3">
            {data.debates.map((debate) => {
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
      )}
    </div>
  )
}
