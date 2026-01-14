import Header from "@/components/aurora/Header";
import ControlSidebar from "@/components/aurora/ControlSidebar";
import MapPanel from "@/components/aurora/MapPanel";
import InsightPanel from "@/components/aurora/InsightPanel";
import TimeSeriesChart from "@/components/aurora/TimeSeriesChart";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <div className="flex-1 flex min-h-0">
        <ControlSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex min-h-0">
            <MapPanel />
            <InsightPanel />
          </div>
          <TimeSeriesChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
