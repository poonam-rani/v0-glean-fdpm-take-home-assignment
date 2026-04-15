"use client"

interface SidebarProps {
  selectedCompany: string
  onSelectCompany: (company: string) => void
}

const companies = [
  { name: "Vertex Pharma", subtitle: "3 of 5 debates open", ticker: "VRTX" },
  { name: "Moderna", subtitle: "View formed", ticker: "MRNA" },
  { name: "Eli Lilly", subtitle: "2 of 4 debates open", ticker: "LLY" },
  { name: "BioMarin", subtitle: "New - processing", ticker: "BMRN" },
]

export function Sidebar({ selectedCompany, onSelectCompany }: SidebarProps) {
  return (
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
      
      <button className="mt-6 w-full px-2.5 py-2.5 border border-dashed border-white/15 rounded-md text-xs text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors text-center">
        + New workspace
      </button>
    </aside>
  )
}
