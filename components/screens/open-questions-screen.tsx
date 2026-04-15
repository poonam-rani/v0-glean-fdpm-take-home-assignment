"use client"

import { Check } from "lucide-react"
import { WorkspaceTabs } from "../workspace-tabs"

interface OpenQuestionsScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const openQuestions = [
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
  {
    id: 5,
    question: "How does Vertex's commercial org compare to competitors?",
    status: "open",
    sources: 1,
    linkedDebate: null,
    priority: "medium",
  },
]

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

export function OpenQuestionsScreen({ activeTab, onTabChange }: OpenQuestionsScreenProps) {
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
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-medium text-white/90">5 open questions</h2>
              <p className="text-xs text-white/40 mt-1">Key unknowns to resolve for your thesis</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-white/10 text-xs rounded-md hover:bg-white/5 transition-colors text-white/60">
              + Add question
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {openQuestions.map((item) => (
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
    </div>
  )
}
