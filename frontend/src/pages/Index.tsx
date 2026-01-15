import { useState, useEffect } from "react";
import Header from "@/components/aurora/Header";
import ControlPanel from "@/components/aurora/ControlPanel";
import MapPanel from "@/components/aurora/MapPanel";
import AnalyticsChart from "@/components/aurora/AnalyticsChart";
import AlertsTimeline from "@/components/aurora/AlertsTimeline";
import SystemInsight from "@/components/aurora/SystemInsight";
import HowItWorks from "@/components/aurora/HowItWorks";
import { mineAPI, monitoringAPI } from "@/lib/api";

const Index = () => {
  const [selectedMine, setSelectedMine] = useState("m1");
  const [dateRange, setDateRange] = useState([25, 85]);
  const [showLegalBoundary, setShowLegalBoundary] = useState(true);
  const [showNoGoZones, setShowNoGoZones] = useState(true);
  const [showExcavation, setShowExcavation] = useState(true);
  const [mines, setMines] = useState<any[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadMines = async () => {
      try {
        console.log('Loading mines...');
        const data = await mineAPI.getMines();
        console.log('Mines loaded:', data);
        setMines(data);
      } catch (error) {
        console.error('Failed to load mines:', error);
        // Use default mines as fallback
        setMines([
          { id: "m1", name: "Jharia Coal Fields", region: "Jharkhand", lat: 23.8081, lng: 84.8385 },
          { id: "m2", name: "Singrauli Complex", region: "Madhya Pradesh", lat: 24.2002, lng: 82.6915 },
          { id: "m3", name: "Talcher Coalfield", region: "Odisha", lat: 20.5937, lng: 85.2123 },
          { id: "m4", name: "Korba Coalfield", region: "Chhattisgarh", lat: 22.3594, lng: 82.6855 },
        ]);
      }
    };
    loadMines();
  }, []);

  // Auto-run analysis when mine or date range changes
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        console.log('Running analysis for mine:', selectedMine);
        // Convert date range to YYYY-MM format
        const startDate = new Date(2023, 2, 1 + Math.floor(dateRange[0] * 0.08)).toISOString().slice(0, 7);
        const endDate = new Date(2023, 2, 1 + Math.floor(dateRange[1] * 0.08)).toISOString().slice(0, 7);
        
        console.log('Date range:', startDate, 'to', endDate);
        const data = await monitoringAPI.startMonitoring(selectedMine, startDate, endDate);
        console.log('Analysis data received:', data);
        setAnalysisData(data);
      } catch (error) {
        console.error('Failed to run analysis:', error);
        // Set empty analysis data to prevent crashes
        setAnalysisData(null);
      }
    };
    
    // Run analysis on mount and when dependencies change
    runAnalysis();
  }, [selectedMine, dateRange]);

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
          mines={mines || []}
          onAnalysisComplete={setAnalysisData}
          onMonitoringStart={() => setRefreshTrigger(prev => prev + 1)}
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
                selectedMine={selectedMine}
                mines={mines || []}
                analysisData={analysisData}
              />
            </div>

            {/* Right Side: Alerts + Insight */}
            <div className="w-80 flex flex-col gap-4">
              <AlertsTimeline mineId={selectedMine} analysisData={analysisData} />
              <SystemInsight mineId={selectedMine} analysisData={analysisData} refreshKey={refreshTrigger} />
            </div>
          </div>

          {/* Bottom Section: Analytics + How It Works */}
          <div className="h-56 flex gap-4">
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden">
              <AnalyticsChart 
                selectedMine={selectedMine}
                dateRange={dateRange}
                analysisData={analysisData}
              />
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
