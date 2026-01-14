import { useState } from "react";
import { ChevronDown, Play, Layers, MapPin, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mines = [
  { id: "m1", name: "Jharia Coal Fields", region: "Jharkhand" },
  { id: "m2", name: "Singrauli Complex", region: "Madhya Pradesh" },
  { id: "m3", name: "Talcher Coalfield", region: "Odisha" },
  { id: "m4", name: "Korba Coalfield", region: "Chhattisgarh" },
];

const ControlSidebar = () => {
  const [selectedMine, setSelectedMine] = useState("m1");
  const [dateRange, setDateRange] = useState([25, 85]);
  const [showLegalBoundary, setShowLegalBoundary] = useState(true);
  const [showNoGoZones, setShowNoGoZones] = useState(true);
  const [showExcavation, setShowExcavation] = useState(true);

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-4 border-b border-border">
        <p className="control-label mb-3">Region Selection</p>
        <Select value={selectedMine} onValueChange={setSelectedMine}>
          <SelectTrigger className="w-full bg-input border-border">
            <SelectValue placeholder="Select mine" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {mines.map((mine) => (
              <SelectItem key={mine.id} value={mine.id}>
                <div className="flex flex-col items-start">
                  <span className="text-sm">{mine.name}</span>
                  <span className="text-[10px] text-muted-foreground">{mine.region}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 border-b border-border">
        <p className="control-label mb-3">Temporal Range</p>
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>2023-01</span>
            <span>2024-01</span>
          </div>
          <Slider
            value={dateRange}
            onValueChange={setDateRange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <div className="px-2 py-1 bg-muted rounded-sm">
              <span className="font-mono text-foreground">Mar 2023</span>
            </div>
            <div className="px-2 py-1 bg-muted rounded-sm">
              <span className="font-mono text-foreground">Nov 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-border space-y-4">
        <p className="control-label">Layer Controls</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-legal" />
              <span className="text-sm text-sidebar-foreground">Legal Boundary</span>
            </div>
            <Switch
              checked={showLegalBoundary}
              onCheckedChange={setShowLegalBoundary}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-nogozone" />
              <span className="text-sm text-sidebar-foreground">No-Go Zones</span>
            </div>
            <Switch
              checked={showNoGoZones}
              onCheckedChange={setShowNoGoZones}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-excavation" />
              <span className="text-sm text-sidebar-foreground">Excavation States</span>
            </div>
            <Switch
              checked={showExcavation}
              onCheckedChange={setShowExcavation}
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Play className="w-4 h-4 mr-2" />
          Run Analysis
        </Button>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-sm border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Processing Status</p>
          <div className="flex items-center gap-2">
            <div className="status-dot status-dot-active" />
            <span className="text-xs text-foreground">Ready for analysis</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Layers className="w-3 h-3" />
          <span>Sentinel-2 L2A • 10m Resolution</span>
        </div>
      </div>
    </aside>
  );
};

export default ControlSidebar;
