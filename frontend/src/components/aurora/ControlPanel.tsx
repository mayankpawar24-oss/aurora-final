import { useState } from "react";
import { MapPin, Calendar, Layers, Play, Shield, AlertTriangle, Mountain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { monitoringAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultMines = [
  { id: "m1", name: "Jharia Coal Fields", region: "Jharkhand" },
  { id: "m2", name: "Singrauli Complex", region: "Madhya Pradesh" },
  { id: "m3", name: "Talcher Coalfield", region: "Odisha" },
  { id: "m4", name: "Korba Coalfield", region: "Chhattisgarh" },
];

interface ControlPanelProps {
  selectedMine: string;
  setSelectedMine: (value: string) => void;
  dateRange: number[];
  setDateRange: (value: number[]) => void;
  showLegalBoundary: boolean;
  setShowLegalBoundary: (value: boolean) => void;
  showNoGoZones: boolean;
  setShowNoGoZones: (value: boolean) => void;
  showExcavation: boolean;
  setShowExcavation: (value: boolean) => void;
  mines?: any[];
  onAnalysisComplete?: (data: any) => void;
  onMonitoringStart?: () => void;
}

const ControlPanel = ({
  selectedMine,
  setSelectedMine,
  dateRange,
  setDateRange,
  showLegalBoundary,
  setShowLegalBoundary,
  showNoGoZones,
  setShowNoGoZones,
  showExcavation,
  setShowExcavation,
  mines = defaultMines,
  onAnalysisComplete,
  onMonitoringStart,
}: ControlPanelProps) => {
  const { toast } = useToast();
  const [actualAnalysisRange, setActualAnalysisRange] = useState<{start: string, end: string} | null>(null);

  // Calculate dates from slider values (0-100 mapped to Mar 2023 - Nov 2023)
  const startDate = new Date(2023, 2, 1 + Math.floor((dateRange?.[0] || 25) * 0.08)); // Mar 1 + days
  const endDate = new Date(2023, 2, 1 + Math.floor((dateRange?.[1] || 85) * 0.08)); // Mar 1 + days
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleStartMonitoring = async () => {
    try {
      onMonitoringStart?.();
      const startDateStr = startDate.toISOString().slice(0, 7); // YYYY-MM
      const endDateStr = endDate.toISOString().slice(0, 7); // YYYY-MM
      
      // Store the requested range
      const requestedRange = { start: startDateStr, end: endDateStr };
      
      const data = await monitoringAPI.startMonitoring(selectedMine, startDateStr, endDateStr);
      onAnalysisComplete?.(data);
      
      // Update actual range (backend may have expanded it)
      setActualAnalysisRange(requestedRange);
      
      toast({
        title: "Success",
        description: "Monitoring started successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start monitoring",
        variant: "destructive",
      });
    }
  };
  return (
    <aside className="w-72 border-r border-border bg-gradient-to-b from-sidebar to-background flex flex-col">
      {/* Mine Selection */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Monitoring Region
          </span>
        </div>
        <Select value={selectedMine} onValueChange={setSelectedMine}>
          <SelectTrigger className="w-full bg-input border-border h-11">
            <SelectValue placeholder="Select mine" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {(mines || []).map((mine) => (
              <SelectItem key={mine?.id || 'unknown'} value={mine?.id || 'unknown'}>
                <div className="flex flex-col items-start py-1">
                  <span className="text-sm font-medium">{mine?.name || 'Unknown Mine'}</span>
                  <span className="text-[10px] text-muted-foreground">{mine?.region || 'Unknown Region'}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Timeline Slider */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Time Period
          </span>
        </div>
        <div className="space-y-4">
          <Slider
            value={dateRange}
            onValueChange={setDateRange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <div className="px-2.5 py-1.5 bg-muted rounded-md">
              <span className="text-xs font-mono text-foreground">{formatDate(startDate)}</span>
            </div>
            <div className="h-px flex-1 mx-3 bg-border" />
            <div className="px-2.5 py-1.5 bg-muted rounded-md">
              <span className="text-xs font-mono text-foreground">{formatDate(endDate)}</span>
            </div>
          </div>
          {actualAnalysisRange && actualAnalysisRange.start === actualAnalysisRange.end && (
            <div className="text-[10px] text-muted-foreground text-center">
              Range auto-expanded for trend analysis
            </div>
          )}
        </div>
      </div>

      {/* Layer Controls */}
      <div className="p-5 border-b border-border flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Map Layers
          </span>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-legal/20 flex items-center justify-center group-hover:bg-legal/30 transition-colors">
                <Shield className="w-4 h-4 text-legal" />
              </div>
              <div>
                <span className="text-sm text-foreground">Legal Boundary</span>
                <p className="text-[10px] text-muted-foreground">Approved mining zone</p>
              </div>
            </div>
            <Switch
              checked={showLegalBoundary}
              onCheckedChange={setShowLegalBoundary}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-nogozone/20 flex items-center justify-center group-hover:bg-nogozone/30 transition-colors">
                <AlertTriangle className="w-4 h-4 text-nogozone" />
              </div>
              <div>
                <span className="text-sm text-foreground">No-Go Zones</span>
                <p className="text-[10px] text-muted-foreground">Restricted areas</p>
              </div>
            </div>
            <Switch
              checked={showNoGoZones}
              onCheckedChange={setShowNoGoZones}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-excavation/20 flex items-center justify-center group-hover:bg-excavation/30 transition-colors">
                <Mountain className="w-4 h-4 text-excavation" />
              </div>
              <div>
                <span className="text-sm text-foreground">Excavation Areas</span>
                <p className="text-[10px] text-muted-foreground">Detected activity</p>
              </div>
            </div>
            <Switch
              checked={showExcavation}
              onCheckedChange={setShowExcavation}
            />
          </label>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5">
        <Button 
          onClick={handleStartMonitoring}
          className="w-full h-12 bg-gradient-to-r from-primary to-aurora-olive hover:from-primary/90 hover:to-aurora-olive/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Monitoring
        </Button>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Real-time analysis ready</span>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
