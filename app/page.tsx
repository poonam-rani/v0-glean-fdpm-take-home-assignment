"use client"

import { useState } from "react"
import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { HomeScreen } from "@/components/screens/home-screen"
import { DebatesScreen } from "@/components/screens/debates-screen"
import { ContradictionsScreen } from "@/components/screens/contradictions-screen"
import { OpenQuestionsScreen } from "@/components/screens/open-questions-screen"
import { ExpertPrepScreen } from "@/components/screens/expert-prep-screen"
import { ConvictionScreen } from "@/components/screens/conviction-screen"

type View = "home" | "workspace"
type WorkspaceTab = "debates" | "contradictions" | "open-questions" | "expert-prep" | "conviction"

export default function GleanThesisIntelligence() {
  const [view, setView] = useState<View>("home")
  const [selectedCompany, setSelectedCompany] = useState("Vertex Pharma")
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("debates")

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
    setView("workspace")
    setActiveTab("debates")
  }

  const handleNavigateHome = () => {
    setView("home")
  }

  const handleNavigateToExpertPrep = () => {
    setView("workspace")
    setActiveTab("expert-prep")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as WorkspaceTab)
  }

  const renderWorkspaceContent = () => {
    switch (activeTab) {
      case "debates":
        return <DebatesScreen activeTab={activeTab} onTabChange={handleTabChange} />
      case "contradictions":
        return <ContradictionsScreen activeTab={activeTab} onTabChange={handleTabChange} />
      case "open-questions":
        return <OpenQuestionsScreen activeTab={activeTab} onTabChange={handleTabChange} />
      case "expert-prep":
        return <ExpertPrepScreen activeTab={activeTab} onTabChange={handleTabChange} />
      case "conviction":
        return <ConvictionScreen activeTab={activeTab} onTabChange={handleTabChange} />
      default:
        return <DebatesScreen activeTab={activeTab} onTabChange={handleTabChange} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      <TopNav onNavigateHome={handleNavigateHome} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedCompany={view === "workspace" ? selectedCompany : null} 
          onSelectCompany={handleSelectCompany} 
        />
        {view === "home" ? (
          <HomeScreen onNavigateToExpertPrep={handleNavigateToExpertPrep} />
        ) : (
          renderWorkspaceContent()
        )}
      </div>
    </div>
  )
}
