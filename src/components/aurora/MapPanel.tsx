import { Maximize2, ZoomIn, ZoomOut, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapPanelProps {
  showLegalBoundary?: boolean;
  showNoGoZones?: boolean;
  showExcavation?: boolean;
}

const MapPanel = ({ 
  showLegalBoundary = true, 
  showNoGoZones = true, 
  showExcavation = true 
}: MapPanelProps) => {
  return (
    <div className="w-full h-full relative bg-aurora-charcoal overflow-hidden">
      {/* Simulated satellite map background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 40%, hsl(80 15% 18%) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, hsl(35 20% 15%) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, hsl(25 15% 12%) 0%, transparent 35%),
            linear-gradient(180deg, hsl(220 15% 10%) 0%, hsl(220 12% 8%) 100%)
          `,
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Map features */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Legal boundary */}
        {showLegalBoundary && (
          <polygon
            points="25,20 75,25 80,70 70,85 30,80 20,50"
            fill="none"
            stroke="hsl(var(--legal-boundary))"
            strokeWidth="0.4"
            strokeDasharray="2,1"
            opacity="0.9"
          />
        )}
        
        {/* No-go zone */}
        {showNoGoZones && (
          <polygon
            points="55,35 70,40 68,55 52,52"
            fill="hsl(var(--no-go-zone))"
            fillOpacity="0.2"
            stroke="hsl(var(--no-go-zone))"
            strokeWidth="0.3"
            opacity="0.9"
          />
        )}
        
        {/* Excavation areas */}
        {showExcavation && (
          <>
            <ellipse
              cx="40"
              cy="45"
              rx="10"
              ry="8"
              fill="hsl(var(--excavation-area))"
              fillOpacity="0.3"
              stroke="hsl(var(--excavation-area))"
              strokeWidth="0.2"
            />
            <ellipse
              cx="55"
              cy="65"
              rx="8"
              ry="6"
              fill="hsl(var(--excavation-area))"
              fillOpacity="0.25"
              stroke="hsl(var(--excavation-area))"
              strokeWidth="0.2"
            />
          </>
        )}
        
        {/* Detection markers */}
        {showNoGoZones && (
          <>
            <circle cx="60" cy="48" r="1.2" fill="hsl(var(--status-warning))" opacity="0.8" />
            <circle cx="62" cy="50" r="1" fill="hsl(var(--status-warning))" opacity="0.6" />
          </>
        )}
      </svg>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <Button variant="secondary" size="icon" className="w-8 h-8 bg-card/90 backdrop-blur-sm border border-border hover:bg-muted">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="w-8 h-8 bg-card/90 backdrop-blur-sm border border-border hover:bg-muted">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="w-8 h-8 bg-card/90 backdrop-blur-sm border border-border hover:bg-muted">
          <Crosshair className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="w-8 h-8 bg-card/90 backdrop-blur-sm border border-border hover:bg-muted">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="flex items-end gap-0.5">
          <div className="w-12 h-1 bg-foreground/60" />
          <div className="w-12 h-1 bg-foreground/30" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">500m</span>
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md border border-border">
        <p className="text-xs font-mono text-muted-foreground">
          23.7957°N, 86.4304°E
        </p>
      </div>
    </div>
  );
};

export default MapPanel;
