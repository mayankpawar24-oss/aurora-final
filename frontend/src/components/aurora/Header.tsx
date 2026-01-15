import { Satellite, Radio } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-gradient-to-r from-card via-card to-aurora-slate px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-aurora-olive/30 flex items-center justify-center border border-primary/20">
              <Satellite className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              AURORA <span className="text-primary">2.0</span>
            </h1>
            <p className="text-xs text-muted-foreground tracking-wide">
              Satellite-based Monitoring of Mining Activity
            </p>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg border border-border">
          <Radio className="w-4 h-4 text-primary animate-pulse" />
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Source</p>
            <p className="text-xs font-mono text-foreground">Sentinel-2 L2A</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="text-xs font-medium text-primary">System Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
