import { Satellite } from "lucide-react";

const Header = () => {
  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center">
            <Satellite className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              AURORA 2.0
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Adaptive Mining Activity Monitoring
            </p>
          </div>
        </div>
        
        <div className="h-8 w-px bg-border" />
        
        <p className="text-xs text-muted-foreground">
          Sentinel-2 Time Series Analysis System
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-sm">
          <div className="status-dot status-dot-active" />
          <span className="text-xs font-mono text-muted-foreground">
            Satellite Data: <span className="text-foreground">Sentinel-2 L2A</span>
          </span>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Last Sync</p>
          <p className="text-xs font-mono text-foreground">2024-01-14 09:42 UTC</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
