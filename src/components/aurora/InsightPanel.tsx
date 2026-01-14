import { Activity, AlertTriangle, TrendingUp, Shield } from "lucide-react";

const excavationData = {
  dominantBehavior: "Iron oxide absorption",
  temporalStability: 0.87,
  confidence: 0.92,
  spectralSignature: "Fe2O3 + Clay minerals",
};

const violations = [
  { date: "2023-11-28", zone: "Buffer Zone A", area: "2.3 ha", confidence: 0.89, severity: "warning" },
  { date: "2023-10-15", zone: "Forest Reserve", area: "0.8 ha", confidence: 0.94, severity: "critical" },
  { date: "2023-09-02", zone: "Buffer Zone B", area: "1.1 ha", confidence: 0.76, severity: "warning" },
  { date: "2023-07-19", zone: "Wetland Margin", area: "0.4 ha", confidence: 0.82, severity: "warning" },
];

const InsightPanel = () => {
  return (
    <aside className="w-72 border-l border-border bg-card flex flex-col overflow-hidden">
      {/* Excavation DNA Summary */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Excavation DNA Summary</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-sm border border-border">
            <p className="control-label mb-1">Dominant Spectral Behavior</p>
            <p className="data-value">{excavationData.dominantBehavior}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{excavationData.spectralSignature}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-muted/50 rounded-sm border border-border">
              <p className="control-label mb-1">Temporal Stability</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-mono font-semibold text-foreground">
                  {(excavationData.temporalStability * 100).toFixed(0)}
                </span>
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${excavationData.temporalStability * 100}%` }}
                />
              </div>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-sm border border-border">
              <p className="control-label mb-1">Confidence</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-mono font-semibold text-foreground">
                  {(excavationData.confidence * 100).toFixed(0)}
                </span>
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-aurora-olive rounded-full transition-all"
                  style={{ width: `${excavationData.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Violation Alerts */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-status-warning" />
              <h3 className="text-sm font-semibold text-foreground">Violation Alerts</h3>
            </div>
            <span className="px-1.5 py-0.5 text-[10px] font-mono bg-status-warning/20 text-status-warning rounded-sm">
              {violations.length} DETECTED
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            {violations.map((violation, index) => (
              <div 
                key={index}
                className={`alert-row ${violation.severity === 'critical' ? 'alert-row-critical' : 'alert-row-warning'} bg-muted/30 rounded-sm`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-mono text-foreground">{violation.date}</span>
                  <span className={`text-[10px] font-mono ${
                    violation.severity === 'critical' ? 'text-nogozone' : 'text-status-warning'
                  }`}>
                    {(violation.confidence * 100).toFixed(0)}% conf
                  </span>
                </div>
                <p className="text-xs text-foreground mb-0.5">{violation.zone}</p>
                <p className="text-[10px] text-muted-foreground">Area affected: {violation.area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="control-label mb-1">Total Violations</p>
            <p className="text-lg font-mono font-semibold text-foreground">4</p>
          </div>
          <div>
            <p className="control-label mb-1">Area Impacted</p>
            <p className="text-lg font-mono font-semibold text-foreground">4.6 <span className="text-xs">ha</span></p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InsightPanel;
