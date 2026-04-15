"use client"

import { Plus, Check } from "lucide-react"
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
      return "bg-[#FEF2F2] text-[#DC2626]"
    case "medium":
      return "bg-[#FFFBEB] text-[#D97706]"
    default:
      return "bg-[#F7F7F8] text-gray-600"
  }
}

export function OpenQuestionsScreen({ activeTab, onTabChange }: OpenQuestionsScreenProps) {
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
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">5 open questions</h2>
              <p className="text-sm text-gray-500">Key unknowns to resolve for your thesis</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-sm font-medium rounded-lg hover:bg-[#F7F7F8] transition-colors text-gray-700">
              <Plus className="h-4 w-4" />
              Add question
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {openQuestions.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg p-4 border border-[#E5E7EB] ${
                  item.status === "resolved" ? "bg-[#F7F7F8]" : "bg-white"
                } hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center ${
                    item.status === "resolved" 
                      ? "bg-[#16A34A] border-[#16A34A]" 
                      : "border-[#E5E7EB]"
                  }`}>
                    {item.status === "resolved" && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium mb-2 ${
                      item.status === "resolved" ? "text-gray-500 line-through" : "text-gray-900"
                    }`}>
                      {item.question}
                    </p>
                    {item.resolution && (
                      <p className="text-sm text-gray-500 mb-2 italic">
                        Resolution: {item.resolution}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded ${getPriorityStyles(item.priority)}`}>
                        {item.priority} priority
                      </span>
                      <span className="text-xs bg-[#F7F7F8] text-gray-600 px-2 py-0.5 rounded">
                        {item.sources} sources
                      </span>
                      {item.linkedDebate && (
                        <span className="text-xs bg-[#EEF2FF] text-[#4F46E5] px-2 py-0.5 rounded">
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
