"use client"

import { Search, Bell } from "lucide-react"

interface TopNavProps {
  onNavigateHome: () => void
}

export function TopNav({ onNavigateHome }: TopNavProps) {
  return (
    <header className="h-16 border-b border-[#E5E7EB] bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-[#6366F1] font-semibold text-lg">glean</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Thesis Intelligence</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search across all research..."
            className="w-80 h-10 pl-10 pr-4 rounded-lg border border-[#E5E7EB] bg-[#F7F7F8] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]"
          />
        </div>
        
        <button className="relative h-10 w-10 rounded-lg hover:bg-[#F7F7F8] flex items-center justify-center transition-colors">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-[#6366F1] rounded-full" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-medium">
            BL
          </div>
          <div className="text-sm text-gray-600">
            Benny Lee <span className="text-gray-400">·</span> Millennium Management
          </div>
        </div>
      </div>
    </header>
  )
}
