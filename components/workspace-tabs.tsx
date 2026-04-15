"use client"

interface WorkspaceTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "debates", label: "Debates" },
  { id: "contradictions", label: "Contradictions" },
  { id: "open-questions", label: "Open questions" },
  { id: "expert-prep", label: "Expert prep" },
  { id: "conviction", label: "Conviction" },
]

export function WorkspaceTabs({ activeTab, onTabChange }: WorkspaceTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-white/10 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-[13px] rounded-md transition-colors ${
            activeTab === tab.id
              ? "bg-indigo-500/15 text-indigo-300 font-medium"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
