"use client"

import { Plus } from "lucide-react"

interface SidebarProps {
  selectedCompany: string
  onSelectCompany: (company: string) => void
}

const companies = [
  { name: "Vertex Pharma", subtitle: "3 of 5 debates open", ticker: "VRTX" },
  { name: "Moderna", subtitle: "View formed", ticker: "MRNA" },
  { name: "Eli Lilly", subtitle: "2 of 4 debates open", ticker: "LLY" },
  { name: "BioMarin", subtitle: "New · processing", ticker: "BMRN" },
]

export function Sidebar({ selectedCompany, onSelectCompany }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-[#E5E7EB] bg-[#F7F7F8] p-4 flex flex-col">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Workspaces
      </div>
      
      <div className="flex flex-col gap-1">
        {companies.map((company) => (
          <button
            key={company.name}
            onClick={() => onSelectCompany(company.name)}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
              selectedCompany === company.name
                ? "bg-[#EEF2FF] border border-[#6366F1]/20"
                : "hover:bg-white"
            }`}
          >
            <div className={`font-medium text-sm ${
              selectedCompany === company.name ? "text-[#4F46E5]" : "text-gray-900"
            }`}>
              {company.name}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{company.subtitle}</div>
          </button>
        ))}
      </div>
      
      <button className="mt-4 w-full px-3 py-2.5 border-2 border-dashed border-[#E5E7EB] rounded-lg text-sm text-gray-500 hover:border-[#6366F1] hover:text-[#6366F1] transition-colors flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" />
        New workspace
      </button>
    </aside>
  )
}
