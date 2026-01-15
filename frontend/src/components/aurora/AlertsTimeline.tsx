import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { alertAPI } from "@/lib/api";

interface AlertsTimelineProps {
  mineId?: string;
  analysisData?: any;
}

const AlertsTimeline = ({ mineId = "m1", analysisData }: AlertsTimelineProps) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If analysis data is passed, use it directly
    if (analysisData?.alerts) {
      setAlerts(analysisData.alerts);
      setLoading(false);
    } else {
      // Fallback to API call if no analysis data
      const loadAlerts = async () => {
        setLoading(true);
        try {
          const data = await alertAPI.getAlerts(mineId);
          setAlerts(data);
        } catch (error) {
          console.error('Failed to load alerts:', error);
        } finally {
          setLoading(false);
        }
      };
      loadAlerts();
    }
  }, [mineId, analysisData]);

  const getStatusIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="w-3.5 h-3.5 text-status-warning" />;
      case "medium":
        return <Clock className="w-3.5 h-3.5 text-primary" />;
      case "low":
        return <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return "border-l-status-warning bg-status-warning/5";
      case "medium":
        return "border-l-primary bg-primary/5";
      case "low":
        return "border-l-muted bg-muted/30";
      default:
        return "";
    }
  };

  const formatDate = (date: string) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'Invalid date';
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[d.getMonth()]} ${d.getDate()}`;
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = (date: string) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'Invalid time';
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Invalid time';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground">Violation Alerts</h3>
        </div>
        <div className="flex-1 p-4 text-center text-muted-foreground">Loading alerts...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Violation Alerts</h3>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-status-warning/15 text-status-warning rounded-full">
            {alerts.filter(a => a.severity === "high" || a.severity === "critical").length} CRITICAL
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No alerts
          </div>
        ) : (
          (alerts || []).map((alert, index) => (
            <div 
              key={alert?.id || index}
              className={`border-l-2 rounded-r-lg p-3 transition-colors hover:bg-muted/20 ${getSeverityStyle(alert?.severity)}`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(alert?.severity)}
                  <span className="text-xs font-mono text-muted-foreground">
                    {alert?.timestamp ? `${formatDate(alert.timestamp)} • ${formatTime(alert.timestamp)}` : 'Unknown time'}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mb-0.5">{alert?.title || 'Unknown Alert'}</p>
              <p className="text-xs text-muted-foreground">{alert?.description || 'No description available'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsTimeline;
