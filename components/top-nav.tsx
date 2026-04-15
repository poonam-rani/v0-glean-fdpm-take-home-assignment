"use client"

interface TopNavProps {
  onNavigateHome: () => void
}

export function TopNav({ onNavigateHome }: TopNavProps) {
  return (
    <header className="h-14 border-b border-white/10 bg-[#0f1117] px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span className="text-indigo-500 font-semibold text-[15px]">glean</span>
          <span className="text-white/30">/</span>
          <span className="text-white/90 text-sm">Thesis Intelligence</span>
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search across all research..."
          className="w-52 h-8 px-3 rounded-md border border-white/10 bg-white/[0.06] text-xs text-white/70 placeholder:text-white/40 focus:outline-none focus:border-indigo-500/50"
        />
        
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-[11px] font-medium">
            BL
          </div>
          <div className="text-xs text-white/60">
            Benny Lee <span className="text-white/30">·</span> Millennium Management
          </div>
        </div>
      </div>
    </header>
  )
}
