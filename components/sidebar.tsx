"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface SidebarProps {
  selectedCompany: string | null
  onSelectCompany: (company: string) => void
}

const companies = [
  { name: "Vertex Pharma", subtitle: "3 of 5 debates open", ticker: "VRTX" },
  { name: "Moderna", subtitle: "View formed", ticker: "MRNA" },
  { name: "Eli Lilly", subtitle: "2 of 4 debates open", ticker: "LLY" },
  { name: "BioMarin", subtitle: "New - processing", ticker: "BMRN" },
]

const sectors = ["Healthcare", "Technology", "Financials", "Industrials", "Energy"]

const sourceOptions = [
  { id: "filings", label: "10-K/10-Q filings", checked: true },
  { id: "transcripts", label: "Earnings transcripts", checked: true },
  { id: "research", label: "Sell-side research", checked: true },
  { id: "internal", label: "Internal models & memos", checked: true },
]

export function Sidebar({ selectedCompany, onSelectCompany }: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState("")
  const [sources, setSources] = useState(sourceOptions)

  const toggleSource = (id: string) => {
    setSources(sources.map(s => s.id === id ? { ...s, checked: !s.checked } : s))
  }

  return (
    <>
      <aside className="w-52 border-r border-white/[0.06] bg-white/[0.02] p-4 flex flex-col">
        <div className="text-[11px] text-white/40 uppercase tracking-wide mb-3">
          Workspaces
        </div>
        
        <div className="flex flex-col gap-2">
          {companies.map((company) => (
            <button
              key={company.name}
              onClick={() => onSelectCompany(company.name)}
              className={`w-full text-left px-2.5 py-2.5 rounded-md transition-colors ${
                selectedCompany === company.name
                  ? "bg-indigo-500/15"
                  : "hover:bg-white/[0.03]"
              }`}
            >
              <div className={`text-[13px] ${
                selectedCompany === company.name ? "text-indigo-300 font-medium" : "text-white/70"
              }`}>
                {company.name}
              </div>
              <div className="text-[11px] text-white/40 mt-0.5">{company.subtitle}</div>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-6 w-full px-2.5 py-2.5 border border-dashed border-white/15 rounded-md text-xs text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors text-center"
        >
          + New workspace
        </button>
      </aside>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-[#1a1d24] border border-white/10 rounded-xl w-full max-w-md p-6 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-medium text-white/95 mb-1">Create new workspace</h2>
            <p className="text-sm text-white/40 mb-6">Set up a new company research workspace</p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-2">
                  Company name or ticker
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pfizer or PFE"
                  className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-2">
                  Sector
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white/90 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1a1d24]">Select a sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector} className="bg-[#1a1d24]">
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-3">
                  Source ingestion
                </label>
                <div className="space-y-2.5">
                  {sources.map((source) => (
                    <label
                      key={source.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSource(source.id)}
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          source.checked
                            ? "bg-indigo-500 border-indigo-500"
                            : "bg-transparent border border-white/20 group-hover:border-white/40"
                        }`}
                      >
                        {source.checked && <Check className="w-3 h-3 text-white" />}
                      </button>
                      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                        {source.label}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-white/30 leading-relaxed">
                  Glean will auto-index documents you have access to based on your firm&apos;s permissions.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-white/10 rounded-lg text-sm text-white/60 hover:bg-white/[0.03] hover:text-white/80 transition-colors"
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm text-white font-medium transition-colors"
              >
                Create workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
