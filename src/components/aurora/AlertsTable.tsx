import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const violations = [
  { 
    id: 1,
    date: "Nov 28, 2023", 
    zone: "Buffer Zone A", 
    area: "2.3 ha", 
    confidence: 89, 
    status: "pending" 
  },
  { 
    id: 2,
    date: "Oct 15, 2023", 
    zone: "Forest Reserve", 
    area: "0.8 ha", 
    confidence: 94, 
    status: "reviewed" 
  },
  { 
    id: 3,
    date: "Sep 02, 2023", 
    zone: "Buffer Zone B", 
    area: "1.1 ha", 
    confidence: 76, 
    status: "pending" 
  },
  { 
    id: 4,
    date: "Jul 19, 2023", 
    zone: "Wetland Margin", 
    area: "0.4 ha", 
    confidence: 82, 
    status: "resolved" 
  },
];

const AlertsTable = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-status-warning/20 text-status-warning">
            <AlertTriangle className="w-3 h-3" />
            Pending Review
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
            Under Review
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Detected Violations</h3>
        <span className="text-sm text-muted-foreground">
          {violations.filter(v => v.status === "pending").length} pending review
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date Detected
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Zone Affected
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Area
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {violations.map((violation) => (
              <tr key={violation.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 text-sm font-mono text-foreground">
                  {violation.date}
                </td>
                <td className="py-3 px-4 text-sm text-foreground">
                  {violation.zone}
                </td>
                <td className="py-3 px-4 text-sm font-mono text-foreground">
                  {violation.area}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${violation.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{violation.confidence}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {getStatusBadge(violation.status)}
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/10">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;
