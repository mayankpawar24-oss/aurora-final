import { useState } from "react";
import { Satellite, MapPin, TrendingUp, AlertCircle, HelpCircle, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MapPanel from "@/components/aurora/MapPanel";
import TimeSeriesChart from "@/components/aurora/TimeSeriesChart";
import AlertsTable from "@/components/aurora/AlertsTable";
import HowItWorks from "@/components/aurora/HowItWorks";

const mines = [
  { id: "m1", name: "Jharia Coal Fields", region: "Jharkhand" },
  { id: "m2", name: "Singrauli Complex", region: "Madhya Pradesh" },
  { id: "m3", name: "Talcher Coalfield", region: "Odisha" },
  { id: "m4", name: "Korba Coalfield", region: "Chhattisgarh" },
];

const Index = () => {
  const [selectedMine, setSelectedMine] = useState("m1");
  const [dateRange, setDateRange] = useState([25, 85]);
  const [showLegalBoundary, setShowLegalBoundary] = useState(true);
  const [showNoGoZones, setShowNoGoZones] = useState(true);
  const [showExcavation, setShowExcavation] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Satellite className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                AURORA 2.0 – Mining Activity Monitoring
              </h1>
              <p className="text-sm text-muted-foreground">
                Satellite-based monitoring of excavation and compliance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">System Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Step 1: Select Monitoring Area */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              1
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Select Monitoring Area</h2>
              <p className="text-sm text-muted-foreground">Choose a mine location and set the time period you want to analyze</p>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mine Location</label>
                <Select value={selectedMine} onValueChange={setSelectedMine}>
                  <SelectTrigger className="w-full bg-input border-border">
                    <SelectValue placeholder="Select mine" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {mines.map((mine) => (
                      <SelectItem key={mine.id} value={mine.id}>
                        <div className="flex flex-col items-start">
                          <span>{mine.name}</span>
                          <span className="text-xs text-muted-foreground">{mine.region}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <div className="space-y-3 pt-2">
                  <Slider
                    value={dateRange}
                    onValueChange={setDateRange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="font-mono">Jan 2023</span>
                    <span className="font-mono">Jan 2024</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Play className="w-4 h-4 mr-2" />
                  Start Monitoring
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Ground Activity View */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              2
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Ground Activity View</h2>
              <p className="text-sm text-muted-foreground">See the current state of the mining area from satellite imagery</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex flex-wrap items-center gap-6 p-4 border-b border-border bg-muted/30">
              <span className="text-sm font-medium text-foreground">Map Layers:</span>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={showLegalBoundary}
                  onCheckedChange={setShowLegalBoundary}
                  id="legal"
                />
                <label htmlFor="legal" className="flex items-center gap-2 text-sm cursor-pointer">
                  <div className="w-3 h-3 rounded-sm bg-legal" />
                  Legal Boundary
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={showNoGoZones}
                  onCheckedChange={setShowNoGoZones}
                  id="nogozone"
                />
                <label htmlFor="nogozone" className="flex items-center gap-2 text-sm cursor-pointer">
                  <div className="w-3 h-3 rounded-sm bg-nogozone" />
                  No-Go Zone
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={showExcavation}
                  onCheckedChange={setShowExcavation}
                  id="excavation"
                />
                <label htmlFor="excavation" className="flex items-center gap-2 text-sm cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-excavation" />
                  Excavated Area
                </label>
              </div>
            </div>

            <div className="h-[400px]">
              <MapPanel 
                showLegalBoundary={showLegalBoundary}
                showNoGoZones={showNoGoZones}
                showExcavation={showExcavation}
              />
            </div>

            <div className="p-4 bg-muted/20 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">How to read this map:</strong> The green dashed line shows the approved mining boundary. 
                Red zones indicate restricted areas where no mining is permitted. Tan/beige areas show detected excavation activity.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3: Activity Over Time */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              3
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Activity Over Time</h2>
              <p className="text-sm text-muted-foreground">Track how excavation has progressed during your selected time period</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <TimeSeriesChart />
            <div className="p-4 bg-muted/20 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">How to read this chart:</strong> The tan area shows total excavation in the legal zone. 
                The red line shows any activity detected in no-go zones. Rising trends may indicate increased mining activity.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Alerts & Actions */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              4
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Alerts & Actions</h2>
              <p className="text-sm text-muted-foreground">Review any detected violations that may require investigation</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <AlertsTable />
            <div className="p-4 bg-muted/20 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">When are alerts triggered?</strong> Alerts appear when the system detects excavation 
                activity in no-go zones or outside the legal boundary. Each alert includes a confidence score based on satellite data quality.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>AURORA 2.0 • Mining Activity Monitoring System</span>
          <span>Data Source: Sentinel-2 L2A • 10m Resolution</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
