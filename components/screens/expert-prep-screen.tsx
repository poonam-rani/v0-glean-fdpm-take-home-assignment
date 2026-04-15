"use client"

import { WorkspaceTabs } from "../workspace-tabs"
import { companyData } from "@/lib/company-data"

interface ExpertPrepScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
  company: string
}

const getTagStyles = (color: string) => {
  switch (color) {
    case "amber":
      return "bg-amber-500/15 text-amber-400"
    case "green":
      return "bg-green-500/15 text-green-400"
    default:
      return "bg-white/5 text-white/40"
  }
}

export function ExpertPrepScreen({ activeTab, onTabChange, company }: ExpertPrepScreenProps) {
  const data = companyData[company]
  
  if (!data) {
    return (
      <div className="flex-1 bg-[#0f1117] flex items-center justify-center">
        <div className="text-white/40">Company not found</div>
      </div>
    )
  }

  const isProcessing = data.status === "processing"
  const expertCall = data.expertCall

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

      <div className="p-6">
        <div className="max-w-4xl">
          {/* Upcoming call header */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-sm font-medium">
                  {expertCall.initials}
                </div>
                <div>
                  <div className="text-sm text-white/95 font-medium">{expertCall.name}</div>
                  <div className="text-xs text-white/50">{expertCall.title}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-indigo-300 font-medium">{expertCall.date}</div>
                <div className="text-[11px] text-white/40">via {expertCall.platform} · {expertCall.duration}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-500/20">
              <p className="text-[11px] text-white/40">
                Auto-detected from calendar: &quot;{expertCall.calendarNote}&quot;
              </p>
            </div>
          </div>

          {/* Questions section */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] text-white/70 font-medium">Suggested questions</div>
            <span className="text-[11px] text-white/40">{expertCall.questions.length} questions · Drag to reorder</span>
          </div>

          {isProcessing ? (
            <div className="flex flex-col gap-2.5 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-3.5 animate-pulse"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-white/30 pt-0.5">{i}</span>
                    <div className="flex-1">
                      <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating questions from your open debates...
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 mb-4">
              {expertCall.questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-white/30 pt-0.5">{question.id}</span>
                    <div className="flex-1">
                      <p className="text-[13px] text-white/90 leading-relaxed mb-2.5">{question.text}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {question.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded ${getTagStyles(tag.color)}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add custom + Export */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Add a custom question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-md px-3.5 py-2.5 text-[13px] text-white/70 placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50"
            />
            <button className="bg-indigo-500/20 border border-indigo-500/30 rounded-md px-4 py-2.5 text-xs text-indigo-300 whitespace-nowrap hover:bg-indigo-500/30 transition-colors">
              Export to clipboard
            </button>
          </div>

          {/* Post-call capture hint */}
          <div className="mt-5 p-3 bg-white/[0.02] rounded-md border border-dashed border-white/10">
            <p className="text-[11px] text-white/40">
              After the call, you&apos;ll be prompted to log key takeaways. We&apos;ll auto-link them to your open debates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
