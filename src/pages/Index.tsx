import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import FishbonePage from "@/components/FishbonePage";
import PulsePage from "@/components/PulsePage";
import OKRPage from "@/components/OKRPage";
import RitualsPage from "@/components/RitualsPage";
import SettingsPage from "@/components/SettingsPage";
import DocsPage from "@/components/DocsPage";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import PricingPage, { Plan } from "@/components/PricingPage";
import PlanBadge from "@/components/PlanBadge";

export type NavPage = "home" | "fishbone" | "pulse" | "okr" | "rituals" | "settings" | "docs";

export default function Index() {
  const [activePage, setActivePage] = useState<NavPage>("home");
  const [plan, setPlan] = useState<Plan | null>(null);

  if (!plan) {
    return <PricingPage onSelect={setPlan} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "home": return <Dashboard onNavigate={setActivePage} plan={plan} />;
      case "fishbone": return <FishbonePage plan={plan} />;
      case "pulse": return <PulsePage />;
      case "okr": return <OKRPage plan={plan} />;
      case "rituals": return <RitualsPage />;
      case "settings": return <SettingsPage plan={plan} onChangePlan={() => setPlan(null)} />;
      case "docs": return <DocsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar activePage={activePage} plan={plan} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
        <PlanBadge plan={plan} onUpgrade={() => setPlan(null)} />
      </div>
    </div>
  );
}
