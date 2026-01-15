import { Brain, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface SystemInsightProps {
  mineId?: string;
  analysisData?: any;
  refreshKey?: number;
}

const SystemInsight = ({ mineId = "m1", analysisData, refreshKey = 0 }: SystemInsightProps) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    // If analysis data is passed, use it directly
    if (analysisData && analysisData.statistics) {
      const stats = analysisData.statistics;
      setInsights({
        excavationAreaHa: Number(stats.max_nogo_area_ha) || 0,
        bufferZoneViolations: Number(stats.violation_count) || 0,
        totalLegalArea: Number(stats.total_legal_area_ha) || 0,
        totalNoGoArea: Number(stats.total_nogo_area_ha) || 0,
      });
      setLoading(false);
    } else {
      setInsights(null);
      setLoading(false);
    }
  }, [analysisData, refreshKey]);

  if (loading || !insights) {
    return (
      <div className="bg-gradient-to-br from-card to-aurora-slate border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">System Insight</h3>
        </div>
        <p className="text-sm text-muted-foreground">Click "Start Monitoring" to analyze excavation data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-card to-aurora-slate border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">System Insight</h3>
      </div>
      
      <p className="text-sm text-foreground leading-relaxed mb-3">
        Detected <span className="text-status-warning font-medium">{insights.excavationAreaHa.toFixed(2)} ha</span> of violation activity {insights.bufferZoneViolations > 0 ? `in buffer zones (${insights.bufferZoneViolations} violations)` : "in monitored areas"} during the monitoring period.
      </p>
      
      <div className="text-xs space-y-1 mb-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Legal Area:</span>
          <span className="font-medium text-foreground">{insights.totalLegalArea.toFixed(1)} ha</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">No-Go Area:</span>
          <span className="font-medium text-status-danger">{insights.totalNoGoArea.toFixed(1)} ha</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-primary cursor-pointer hover:text-primary/80" onClick={() => setShowDetailed(!showDetailed)}>
        <span className="font-medium">View detailed analysis</span>
        {showDetailed ? <ChevronUp className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
      </div>
      
      {showDetailed && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Detailed Analysis</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analysis Period:</span>
              <span className="font-medium text-foreground">Last 30 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Excavated Area:</span>
              <span className="font-medium text-foreground">{(Number(insights.totalLegalArea || 0) + Number(insights.totalNoGoArea || 0)).toFixed(1)} ha</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compliance Rate:</span>
              <span className="font-medium text-foreground">
                {(() => {
                  const total = Number(insights.totalLegalArea || 0) + Number(insights.totalNoGoArea || 0);
                  return total > 0 ? ((Number(insights.totalLegalArea || 0) / total) * 100).toFixed(1) : '0.0';
                })()}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Level:</span>
              <span className={`font-medium ${insights.bufferZoneViolations > 5 ? 'text-status-danger' : insights.bufferZoneViolations > 2 ? 'text-status-warning' : 'text-primary'}`}>
                {insights.bufferZoneViolations > 5 ? 'High' : insights.bufferZoneViolations > 2 ? 'Medium' : 'Low'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemInsight;
