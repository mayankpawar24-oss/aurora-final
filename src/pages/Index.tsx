import { useState } from "react";
import Header from "@/components/aurora/Header";
import ControlPanel from "@/components/aurora/ControlPanel";
import MapPanel from "@/components/aurora/MapPanel";
import AnalyticsChart from "@/components/aurora/AnalyticsChart";
import AlertsTimeline from "@/components/aurora/AlertsTimeline";
import SystemInsight from "@/components/aurora/SystemInsight";
import HowItWorks from "@/components/aurora/HowItWorks";

const Index = () => {
  const [selectedMine, setSelectedMine] = useState("m1");
  const [dateRange, setDateRange] = useState([25, 85]);
  const [showLegalBoundary, setShowLegalBoundary] = useState(true);
  const [showNoGoZones, setShowNoGoZones] = useState(true);
  const [showExcavation, setShowExcavation] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <div className="flex-1 flex min-h-0">
        {/* Left Control Panel */}
        <ControlPanel
          selectedMine={selectedMine}
          setSelectedMine={setSelectedMine}
          dateRange={dateRange}
          setDateRange={setDateRange}
          showLegalBoundary={showLegalBoundary}
          setShowLegalBoundary={setShowLegalBoundary}
          showNoGoZones={showNoGoZones}
          setShowNoGoZones={setShowNoGoZones}
          showExcavation={showExcavation}
          setShowExcavation={setShowExcavation}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 p-4 gap-4">
          {/* Top Section: Map + Alerts */}
          <div className="flex-1 flex gap-4 min-h-0">
            {/* Hero Map Panel */}
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              <MapPanel 
                showLegalBoundary={showLegalBoundary}
                showNoGoZones={showNoGoZones}
                showExcavation={showExcavation}
              />
            </div>

            {/* Right Side: Alerts + Insight */}
            <div className="w-80 flex flex-col gap-4">
              <AlertsTimeline />
              <SystemInsight />
            </div>
          </div>

          {/* Bottom Section: Analytics + How It Works */}
          <div className="h-56 flex gap-4">
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden">
              <AnalyticsChart />
            </div>
            <div className="w-80">
              <HowItWorks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
