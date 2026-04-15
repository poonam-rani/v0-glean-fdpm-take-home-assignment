"use client"

import { AlertTriangle } from "lucide-react"
import { WorkspaceTabs } from "../workspace-tabs"

interface ConvictionScreenProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const stats = [
  { label: "Total debates", value: "5", color: "gray" },
  { label: "View formed", value: "2", color: "green" },
  { label: "Still open", value: "3", color: "amber" },
  { label: "Evidence tagged", value: "14", color: "gray" },
]

const debates = [
  {
    id: 1,
    title: "Trikafta revenue durability",
    status: "Open",
    statusColor: "amber",
    position: 50,
    bullEvidence: 3,
    bearEvidence: 2,
    bgTint: "",
  },
  {
    id: 2,
    title: "Pipeline optionality: gene editing",
    status: "Open",
    statusColor: "amber",
    position: 35,
    bullEvidence: 2,
    bearEvidence: 3,
    bgTint: "",
  },
  {
    id: 3,
    title: "Capital allocation discipline",
    status: "Leaning bull",
    statusColor: "green",
    position: 75,
    bullEvidence: 4,
    bearEvidence: 1,
    bgTint: "bg-[#ECFDF5]/30",
  },
  {
    id: 4,
    title: "Management credibility",
    status: "View formed: Bull",
    statusColor: "indigo",
    position: 90,
    bullEvidence: 5,
    bearEvidence: 0,
    bgTint: "bg-[#EEF2FF]/30",
  },
]

const getStatusStyles = (color: string) => {
  switch (color) {
    case "green":
      return "text-[#16A34A]"
    case "indigo":
      return "text-[#6366F1]"
    default:
      return "text-[#D97706]"
  }
}

const getStatBgColor = (color: string) => {
  switch (color) {
    case "green":
      return "bg-[#ECFDF5]"
    case "amber":
      return "bg-[#FFFBEB]"
    default:
      return "bg-[#F7F7F8]"
  }
}

const getStatTextColor = (color: string) => {
  switch (color) {
    case "green":
      return "text-[#16A34A]"
    case "amber":
      return "text-[#D97706]"
    default:
      return "text-gray-900"
  }
}

export function ConvictionScreen({ activeTab, onTabChange }: ConvictionScreenProps) {
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
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-lg p-4 border border-[#E5E7EB] ${getStatBgColor(stat.color)}`}
              >
                <div className={`text-2xl font-semibold ${getStatTextColor(stat.color)}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Debate conviction status</h2>

          {/* Debate rows */}
          <div className="flex flex-col gap-3 mb-6">
            {debates.map((debate) => (
              <div
                key={debate.id}
                className={`rounded-lg p-4 border border-[#E5E7EB] ${debate.bgTint}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{debate.title}</h3>
                  <span className={`text-sm font-medium ${getStatusStyles(debate.statusColor)}`}>
                    {debate.status}
                  </span>
                </div>

                {/* Conviction meter */}
                <div className="mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#DC2626] w-10">Bear</span>
                    <div className="flex-1 h-2 bg-gradient-to-r from-[#FEF2F2] via-[#F7F7F8] to-[#ECFDF5] rounded-full relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-[#6366F1] rounded-full shadow-sm"
                        style={{ left: `calc(${debate.position}% - 8px)` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#16A34A] w-10 text-right">Bull</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  {debate.bullEvidence} bull evidence · {debate.bearEvidence} bear evidence
                </div>
              </div>
            ))}
          </div>

          {/* Coverage gap alert */}
          <div className="bg-[#FFFBEB] rounded-lg p-4 border border-[#D97706]/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-[#D97706] mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Coverage gaps identified</h4>
                <p className="text-sm text-gray-600">
                  The &quot;IRA pricing impact&quot; open question has no evidence tagged yet. Consider adding this to your next expert call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
