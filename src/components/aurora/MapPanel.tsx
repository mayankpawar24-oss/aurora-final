import { Maximize2, ZoomIn, ZoomOut, Crosshair, Compass } from "lucide-react";
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
      {/* Satellite-style terrain background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 55% 35%, hsl(80 12% 16%) 0%, transparent 45%),
            radial-gradient(ellipse at 25% 65%, hsl(35 18% 14%) 0%, transparent 35%),
            radial-gradient(ellipse at 75% 75%, hsl(25 12% 11%) 0%, transparent 30%),
            radial-gradient(ellipse at 40% 80%, hsl(30 15% 12%) 0%, transparent 25%),
            linear-gradient(180deg, hsl(220 15% 9%) 0%, hsl(220 12% 7%) 100%)
          `,
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scan line animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            animation: 'scan 8s linear infinite',
            top: '0%',
          }}
        />
      </div>

      {/* Map features SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Legal boundary */}
        {showLegalBoundary && (
          <polygon
            points="20,15 78,18 85,65 75,88 28,85 15,48"
            fill="none"
            stroke="hsl(var(--legal-boundary))"
            strokeWidth="0.4"
            strokeDasharray="3,1.5"
            opacity="0.85"
            filter="url(#glow)"
          />
        )}
        
        {/* No-go zones */}
        {showNoGoZones && (
          <>
            <polygon
              points="52,30 72,35 70,52 50,48"
              fill="hsl(var(--no-go-zone))"
              fillOpacity="0.15"
              stroke="hsl(var(--no-go-zone))"
              strokeWidth="0.35"
              opacity="0.9"
            />
            <polygon
              points="25,55 38,52 42,68 30,72"
              fill="hsl(var(--no-go-zone))"
              fillOpacity="0.12"
              stroke="hsl(var(--no-go-zone))"
              strokeWidth="0.3"
              opacity="0.8"
            />
          </>
        )}
        
        {/* Excavation areas */}
        {showExcavation && (
          <>
            <ellipse
              cx="42"
              cy="42"
              rx="12"
              ry="9"
              fill="hsl(var(--excavation-area))"
              fillOpacity="0.25"
              stroke="hsl(var(--excavation-area))"
              strokeWidth="0.25"
            />
            <ellipse
              cx="58"
              cy="68"
              rx="9"
              ry="7"
              fill="hsl(var(--excavation-area))"
              fillOpacity="0.22"
              stroke="hsl(var(--excavation-area))"
              strokeWidth="0.25"
            />
            <ellipse
              cx="35"
              cy="38"
              rx="5"
              ry="4"
              fill="hsl(var(--excavation-area))"
              fillOpacity="0.18"
              stroke="hsl(var(--excavation-area))"
              strokeWidth="0.2"
            />
          </>
        )}
        
        {/* Violation markers */}
        {showNoGoZones && (
          <>
            <circle cx="62" cy="42" r="1.5" fill="hsl(var(--status-warning))" opacity="0.9">
              <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="64" cy="44" r="1" fill="hsl(var(--status-warning))" opacity="0.7" />
            <circle cx="33" cy="62" r="1.2" fill="hsl(var(--status-warning))" opacity="0.8">
              <animate attributeName="r" values="1.2;1.6;1.2" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
        {[ZoomIn, ZoomOut, Crosshair, Compass, Maximize2].map((Icon, i) => (
          <Button 
            key={i}
            variant="secondary" 
            size="icon" 
            className="w-9 h-9 bg-card/95 backdrop-blur-sm border border-border hover:bg-muted hover:border-primary/30 transition-all"
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 p-4 bg-card/95 backdrop-blur-sm rounded-lg border border-border">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 font-semibold">Legend</p>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[3px] border border-dashed border-legal rounded-sm" />
            <span className="text-xs text-foreground">Legal Boundary</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-4 bg-nogozone/25 border border-nogozone/60 rounded-sm" />
            <span className="text-xs text-foreground">No-Go Zone</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-4 bg-excavation/35 rounded-full" />
            <span className="text-xs text-foreground">Excavation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-status-warning rounded-full animate-pulse" />
            <span className="text-xs text-foreground">Violation</span>
          </div>
        </div>
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="flex">
          <div className="w-10 h-1.5 bg-foreground/70 rounded-l-sm" />
          <div className="w-10 h-1.5 bg-foreground/30 rounded-r-sm" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">500m</span>
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-4 right-4 px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg border border-border">
        <p className="text-xs font-mono text-foreground">
          23.7957°N, 86.4304°E
        </p>
        <p className="text-[10px] text-muted-foreground">Jharia Coal Fields, Jharkhand</p>
      </div>

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 15% 5% / 0.4) 100%)',
        }}
      />

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MapPanel;
