"use client"

import { Check } from "lucide-react"
import { WorkspaceTabs } from "../workspace-tabs"
import { companyData } from "@/lib/company-data"

interface OpenQuestionsScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
  company: string
}

interface OpenQuestion {
  id: number
  question: string
  status: "open" | "resolved"
  sources: number
  linkedDebate: string | null
  priority: "high" | "medium" | "low"
  resolution?: string
}

const openQuestionsData: Record<string, OpenQuestion[]> = {
  "Vertex Pharma": [
    {
      id: 1,
      question: "What is the real genericization timeline for Trikafta?",
      status: "open",
      sources: 3,
      linkedDebate: "Trikafta durability",
      priority: "high",
    },
    {
      id: 2,
      question: "Can Vertex scale gene therapy manufacturing cost-effectively?",
      status: "open",
      sources: 2,
      linkedDebate: "Pipeline optionality",
      priority: "high",
    },
    {
      id: 3,
      question: "How will IRA pricing provisions impact CF drug pricing?",
      status: "open",
      sources: 0,
      linkedDebate: null,
      priority: "medium",
    },
    {
      id: 4,
      question: "What is management's M&A appetite for 2026?",
      status: "resolved",
      sources: 4,
      linkedDebate: "Capital allocation",
      priority: "low",
      resolution: "Bolt-on acquisitions only, per Q4 call",
    },
  ],
  "Moderna": [
    {
      id: 1,
      question: "What is the realistic endemic COVID booster uptake rate?",
      status: "open",
      sources: 4,
      linkedDebate: "COVID franchise",
      priority: "high",
    },
    {
      id: 2,
      question: "When will the flu/COVID combo vaccine receive FDA approval?",
      status: "open",
      sources: 3,
      linkedDebate: "mRNA platform",
      priority: "high",
    },
    {
      id: 3,
      question: "What is Moderna's manufacturing cost per dose trajectory?",
      status: "resolved",
      sources: 5,
      linkedDebate: "Cash runway",
      priority: "medium",
      resolution: "Cost per dose declining 15% annually through 2027",
    },
  ],
  "Eli Lilly": [
    {
      id: 1,
      question: "When will RTP manufacturing facility reach full capacity?",
      status: "open",
      sources: 3,
      linkedDebate: "Manufacturing execution",
      priority: "high",
    },
    {
      id: 2,
      question: "What is the oral GLP-1 competitive timeline from Novo?",
      status: "open",
      sources: 2,
      linkedDebate: "GLP-1 dominance",
      priority: "high",
    },
    {
      id: 3,
      question: "How sticky is the obesity patient population to their first GLP-1?",
      status: "open",
      sources: 1,
      linkedDebate: "GLP-1 dominance",
      priority: "medium",
    },
    {
      id: 4,
      question: "What is the Donanemab reimbursement trajectory?",
      status: "resolved",
      sources: 4,
      linkedDebate: "Alzheimer's pipeline",
      priority: "medium",
      resolution: "CMS expanded coverage approved Q4 2025",
    },
  ],
  "BioMarin": [
    {
      id: 1,
      question: "What is driving slow Roctavian treatment center adoption?",
      status: "open",
      sources: 2,
      linkedDebate: "Roctavian trajectory",
      priority: "high",
    },
    {
      id: 2,
      question: "How sustainable is rare disease orphan drug pricing?",
      status: "open",
      sources: 1,
      linkedDebate: "Pricing sustainability",
      priority: "high",
    },
    {
      id: 3,
      question: "What is the pipeline beyond current gene therapies?",
      status: "open",
      sources: 0,
      linkedDebate: null,
      priority: "medium",
    },
  ],
}

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/15 text-red-400"
    case "medium":
      return "bg-amber-500/15 text-amber-400"
    default:
      return "bg-white/5 text-white/40"
  }
}

export function OpenQuestionsScreen({ activeTab, onTabChange, company }: OpenQuestionsScreenProps) {
  const data = companyData[company]
  const questions = openQuestionsData[company] || []
  
  if (!data) {
    return (
      <div className="flex-1 bg-[#0f1117] flex items-center justify-center">
        <div className="text-white/40">Company not found</div>
      </div>
    )
  }

  const isProcessing = data.status === "processing"
  const openCount = questions.filter(q => q.status === "open").length

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
                Identifying open questions from sources...
              </div>
              <p className="text-[11px] text-white/20 text-center max-w-md">
                We&apos;re analyzing your sources to extract key unknowns and research questions.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-medium text-white/90">{openCount} open question{openCount !== 1 ? "s" : ""}</h2>
                <p className="text-xs text-white/40 mt-1">Key unknowns to resolve for your thesis</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-white/10 text-xs rounded-md hover:bg-white/5 transition-colors text-white/60">
                + Add question
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {questions.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg p-4 border border-white/10 ${
                    item.status === "resolved" ? "bg-white/[0.02]" : "bg-white/[0.03]"
                  } hover:bg-white/[0.05] transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center ${
                      item.status === "resolved" 
                        ? "bg-green-500 border-green-500" 
                        : "border-white/20"
                    }`}>
                      {item.status === "resolved" && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] font-medium mb-2 ${
                        item.status === "resolved" ? "text-white/40 line-through" : "text-white/90"
                      }`}>
                        {item.question}
                      </p>
                      {item.resolution && (
                        <p className="text-xs text-white/40 mb-2 italic">
                          Resolution: {item.resolution}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded ${getPriorityStyles(item.priority)}`}>
                          {item.priority} priority
                        </span>
                        <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded">
                          {item.sources} sources
                        </span>
                        {item.linkedDebate && (
                          <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded">
                            Linked: {item.linkedDebate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
