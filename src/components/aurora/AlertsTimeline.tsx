import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const alerts = [
  { 
    id: 1,
    date: "Nov 28", 
    time: "14:32",
    zone: "Buffer Zone A", 
    area: "2.3 ha", 
    confidence: 89, 
    status: "new" 
  },
  { 
    id: 2,
    date: "Oct 15", 
    time: "09:15",
    zone: "Forest Reserve", 
    area: "0.8 ha", 
    confidence: 94, 
    status: "reviewing" 
  },
  { 
    id: 3,
    date: "Sep 02", 
    time: "16:48",
    zone: "Buffer Zone B", 
    area: "1.1 ha", 
    confidence: 76, 
    status: "resolved" 
  },
];

const AlertsTimeline = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertTriangle className="w-3.5 h-3.5 text-status-warning" />;
      case "reviewing":
        return <Clock className="w-3.5 h-3.5 text-primary" />;
      case "resolved":
        return <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new":
        return "border-l-status-warning bg-status-warning/5";
      case "reviewing":
        return "border-l-primary bg-primary/5";
      case "resolved":
        return "border-l-muted bg-muted/30";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Violation Alerts</h3>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-status-warning/15 text-status-warning rounded-full">
            {alerts.filter(a => a.status === "new").length} NEW
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`border-l-2 rounded-r-lg p-3 transition-colors hover:bg-muted/20 ${getStatusStyle(alert.status)}`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-2">
                {getStatusIcon(alert.status)}
                <span className="text-xs font-mono text-muted-foreground">{alert.date} • {alert.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-10 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${alert.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{alert.confidence}%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-foreground mb-0.5">{alert.zone}</p>
            <p className="text-xs text-muted-foreground">Area: {alert.area}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsTimeline;
