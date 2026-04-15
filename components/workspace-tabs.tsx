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
    <div className="flex items-center gap-1 border-b border-[#E5E7EB]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? "text-[#6366F1]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1]" />
          )}
        </button>
      ))}
    </div>
  )
}
