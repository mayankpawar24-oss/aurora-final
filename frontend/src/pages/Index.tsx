import { useState, useEffect, Suspense } from "react";
import Header from "@/components/aurora/Header";
import ControlPanel from "@/components/aurora/ControlPanel";
import MapPanel from "@/components/aurora/MapPanel";
import AnalyticsChart from "@/components/aurora/AnalyticsChart";
import AlertsTimeline from "@/components/aurora/AlertsTimeline";
import SystemInsight from "@/components/aurora/SystemInsight";
import HowItWorks from "@/components/aurora/HowItWorks";
import { mineAPI, monitoringAPI } from "@/lib/api";

const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center h-full bg-muted">
    <p className="text-muted-foreground">Loading...</p>
  </div>
);

const Index = () => {
  const [selectedMine, setSelectedMine] = useState("m1");
  const [dateRange, setDateRange] = useState([25, 85]);
  const [showLegalBoundary, setShowLegalBoundary] = useState(true);
  const [showNoGoZones, setShowNoGoZones] = useState(true);
  const [showExcavation, setShowExcavation] = useState(true);
  const [mines, setMines] = useState<any[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<"analysis" | "how_it_works" | null>(null);
  const [loading, setLoading] = useState(true);

  // Load mines on mount
  useEffect(() => {
    const loadMines = async () => {
      try {
        console.log('Loading mines...');
        const data = await mineAPI.getMines();
        console.log('Mines loaded:', data);
        setMines(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load mines:', error);
        setMines([]);
        setLoading(false);
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
        setAnalysisData(null);
      }
    };
    
    runAnalysis();
  }, [selectedMine, dateRange, refreshTrigger]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingPlaceholder />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <div className="flex-1 flex min-h-0">
        {/* Left Control Panel */}
        <Suspense fallback={<LoadingPlaceholder />}>
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
        </Suspense>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 p-4 gap-4">
          {/* Top Section: Map + Alerts */}
          <div className="flex-1 flex gap-4 min-h-0">
            {/* Hero Map Panel */}
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              <Suspense fallback={<LoadingPlaceholder />}>
                <MapPanel 
                  showLegalBoundary={showLegalBoundary}
                  showNoGoZones={showNoGoZones}
                  showExcavation={showExcavation}
                  selectedMine={selectedMine}
                  mines={mines || []}
                  analysisData={analysisData}
                />
              </Suspense>
            </div>

            {/* Right Side: Alerts + Detailed Analysis + How It Works */}
            <div className="w-80 flex flex-col gap-4 overflow-y-auto">
              <Suspense fallback={<LoadingPlaceholder />}>
                <AlertsTimeline mineId={selectedMine} analysisData={analysisData} />
              </Suspense>

              {/* Accordion Stack: Only one expands at a time */}
              <Suspense fallback={<LoadingPlaceholder />}>
                <SystemInsight 
                  mineId={selectedMine} 
                  analysisData={analysisData} 
                  refreshKey={refreshTrigger}
                  isExpanded={activeAccordion === "analysis"}
                  onToggle={() => setActiveAccordion(activeAccordion === "analysis" ? null : "analysis")}
                />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <HowItWorks 
                  isExpanded={activeAccordion === "how_it_works"}
                  onToggle={() => setActiveAccordion(activeAccordion === "how_it_works" ? null : "how_it_works")}
                />
              </Suspense>
            </div>
          </div>

          {/* Bottom Section: Analytics Only */}
          <div className="h-56 flex gap-4">
            <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden">
              <Suspense fallback={<LoadingPlaceholder />}>
                <AnalyticsChart 
                  selectedMine={selectedMine}
                  dateRange={dateRange}
                  analysisData={analysisData}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
