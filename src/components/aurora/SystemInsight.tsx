import { Brain, ArrowRight } from "lucide-react";

const SystemInsight = () => {
  return (
    <div className="bg-gradient-to-br from-card to-aurora-slate border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">System Insight</h3>
      </div>
      
      <p className="text-sm text-foreground leading-relaxed mb-3">
        Detected <span className="text-status-warning font-medium">3.1 ha</span> of new excavation activity in buffer zones during the last 30 days.
      </p>
      
      <div className="flex items-center gap-2 text-xs text-primary">
        <span className="font-medium">View detailed analysis</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
};

export default SystemInsight;
