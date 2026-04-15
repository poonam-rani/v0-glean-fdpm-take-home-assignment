"use client"

import { GripVertical, Plus, Copy, Lightbulb } from "lucide-react"
import { WorkspaceTabs } from "../workspace-tabs"

interface ExpertPrepScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const questions = [
  {
    id: 1,
    text: "When you were evaluating competitive dynamics in CF, what was Moderna's internal view on Vertex's genericization exposure timeline?",
    tags: [
      { label: "Trikafta durability debate", color: "amber" },
      { label: "Unlocks: Timeline specificity", color: "gray" },
    ],
  },
  {
    id: 2,
    text: "How did Moderna's commercial org think about Vertex's pricing power post-IRA vs. your approach in vaccines?",
    tags: [
      { label: "Trikafta durability debate", color: "amber" },
      { label: "Unlocks: Peer comp perspective", color: "gray" },
    ],
  },
  {
    id: 3,
    text: "What's your read on Vertex's gene editing partnership structure? Does the CRISPR deal de-risk their pipeline or create dependency?",
    tags: [
      { label: "Pipeline optionality debate", color: "amber" },
      { label: "Unlocks: Platform vs. one-off", color: "gray" },
    ],
  },
  {
    id: 4,
    text: "From a commercial execution standpoint, how does Vertex's sales force compare to what you built at Moderna? Where are their gaps?",
    tags: [
      { label: "Unlocks: Execution risk", color: "gray" },
    ],
  },
  {
    id: 5,
    text: "If you had to bet on one thing that the market is getting wrong about Vertex right now, what would it be?",
    tags: [
      { label: "Alpha question", color: "green" },
      { label: "Unlocks: Non-consensus view", color: "gray" },
    ],
  },
]

const getTagStyles = (color: string) => {
  switch (color) {
    case "amber":
      return "bg-[#FFFBEB] text-[#D97706]"
    case "green":
      return "bg-[#ECFDF5] text-[#16A34A]"
    default:
      return "bg-[#F7F7F8] text-gray-600"
  }
}

export function ExpertPrepScreen({ activeTab, onTabChange }: ExpertPrepScreenProps) {
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
          {/* Upcoming call card */}
          <div className="bg-[#EEF2FF] rounded-lg p-4 border border-[#6366F1]/10 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-medium">
                SC
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Dr. Sarah Chen</h3>
                <p className="text-sm text-gray-600">Former VP Commercial, Moderna · 2019-2024</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Tomorrow, 2:00 PM ET</div>
                <div className="text-xs text-gray-500">via GLG · 45 min</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#6366F1]/10">
              <p className="text-xs text-gray-500">
                Auto-detected from calendar: &quot;GLG Expert Call - Sarah Chen, Moderna Commercial&quot;
              </p>
            </div>
          </div>

          {/* Questions section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Suggested questions</h2>
            <span className="text-sm text-gray-500">5 questions · Drag to reorder</span>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg p-4 border border-[#E5E7EB] hover:shadow-sm transition-shadow cursor-grab"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 text-gray-400 mt-0.5">
                    <GripVertical className="h-4 w-4" />
                    <span className="text-sm font-medium text-gray-500 w-5">{question.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-2">{question.text}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {question.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded ${getTagStyles(tag.color)}`}
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

          {/* Add question input */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative">
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Add a custom question..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-[#E5E7EB] bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#6366F1] text-white text-sm font-medium rounded-lg hover:bg-[#4F46E5] transition-colors">
              <Copy className="h-4 w-4" />
              Export to clipboard
            </button>
          </div>

          {/* Hint card */}
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-4 bg-[#F7F7F8]">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-[#D97706] mt-0.5" />
              <p className="text-sm text-gray-600">
                After the call, you&apos;ll be prompted to log key takeaways. We&apos;ll auto-link them to your open debates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
