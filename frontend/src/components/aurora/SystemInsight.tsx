import { Brain, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface SystemInsightProps {
  mineId?: string;
  analysisData?: any;
  refreshKey?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const SystemInsight = ({ mineId = "m1", analysisData, refreshKey = 0, isExpanded = false, onToggle }: SystemInsightProps) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Calculate chart data
  const chartData = useMemo(() => {
    if (!analysisData) return { areaBreakdown: [], temporalData: [] };

    const stats = analysisData.statistics || {};
    const timeSeries = analysisData.time_series || {};

    // Area breakdown data
    const legalArea = Number(stats.total_legal_area_ha) || 0;
    const nogoArea = Number(stats.total_nogo_area_ha) || 0;
    const violatedArea = Number(stats.max_nogo_area_ha) || 0;

    const areaBreakdown = [
      { name: 'Legal', value: legalArea, color: 'hsl(var(--primary))' },
      { name: 'No-Go', value: nogoArea, color: 'hsl(var(--status-danger))' },
      { name: 'Violated', value: violatedArea, color: 'hsl(var(--status-warning))' },
    ].filter(item => item.value > 0);

    // Temporal data from time series
    const temporalData = [];
    if (timeSeries.dates && timeSeries.no_go_excavated_area) {
      timeSeries.dates.forEach((date: string, i: number) => {
        temporalData.push({
          month: new Date(date).toLocaleDateString('en-US', { month: 'short' }),
          violations: Number(timeSeries.no_go_excavated_area[i]) || 0,
        });
      });
    }

    return { areaBreakdown, temporalData };
  }, [analysisData]);

  // Calculate chart data
  const chartData = useMemo(() => {
    if (!analysisData) return { areaBreakdown: [], temporalData: [] };

    const stats = analysisData.statistics || {};
    const timeSeries = analysisData.time_series || {};

    // Area breakdown data
    const legalArea = Number(stats.total_legal_area_ha) || 0;
    const nogoArea = Number(stats.total_nogo_area_ha) || 0;
    const violatedArea = Number(stats.max_nogo_area_ha) || 0;

    const areaBreakdown = [
      { name: 'Legal', value: legalArea, color: 'hsl(var(--primary))' },
      { name: 'No-Go', value: nogoArea, color: 'hsl(var(--status-danger))' },
      { name: 'Violated', value: violatedArea, color: 'hsl(var(--status-warning))' },
    ].filter(item => item.value > 0);

    // Temporal data from time series
    const temporalData = [];
    if (timeSeries.dates && timeSeries.no_go_excavated_area) {
      timeSeries.dates.forEach((date: string, i: number) => {
        temporalData.push({
          month: new Date(date).toLocaleDateString('en-US', { month: 'short' }),
          violations: Number(timeSeries.no_go_excavated_area[i]) || 0,
        });
      });
    }

    return { areaBreakdown, temporalData };
  }, [analysisData]);

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
      
      <div className="flex items-center gap-2 text-xs text-primary cursor-pointer hover:text-primary/80" onClick={onToggle}>
        <span className="font-medium">View detailed analysis</span>
        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
      </div>
      
      {isExpanded && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Detailed Analysis</h4>
          
          {/* Area Breakdown Chart */}
          <div className="mb-4">
            <h5 className="text-xs font-medium text-foreground mb-2">Area Breakdown (ha)</h5>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.areaBreakdown} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]}>
                    {chartData.areaBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Temporal Chart */}
          <div>
            <h5 className="text-xs font-medium text-foreground mb-2">Violation Trend</h5>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.temporalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="violations" 
                    stroke="hsl(var(--status-warning))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemInsight;
