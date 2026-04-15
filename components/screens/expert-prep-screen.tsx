"use client"

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
      return "bg-amber-500/15 text-amber-400"
    case "green":
      return "bg-green-500/15 text-green-400"
    default:
      return "bg-white/5 text-white/40"
  }
}

export function ExpertPrepScreen({ activeTab, onTabChange }: ExpertPrepScreenProps) {
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
          {/* Upcoming call header */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-sm font-medium">
                  SC
                </div>
                <div>
                  <div className="text-sm text-white/95 font-medium">Dr. Sarah Chen</div>
                  <div className="text-xs text-white/50">Former VP Commercial, Moderna · 2019-2024</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-indigo-300 font-medium">Tomorrow, 2:00 PM ET</div>
                <div className="text-[11px] text-white/40">via GLG · 45 min</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-500/20">
              <p className="text-[11px] text-white/40">
                Auto-detected from calendar: &quot;GLG Expert Call - Sarah Chen, Moderna Commercial&quot;
              </p>
            </div>
          </div>

          {/* Questions section */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] text-white/70 font-medium">Suggested questions</div>
            <span className="text-[11px] text-white/40">6 questions · Drag to reorder</span>
          </div>

          <div className="flex flex-col gap-2.5 mb-4">
            {questions.map((question) => (
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
