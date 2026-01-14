import { useState } from "react";
import { ChevronDown, Satellite, Layers, BarChart3, Bell } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const steps = [
  { icon: Satellite, label: "Capture", desc: "Sentinel-2 imagery" },
  { icon: Layers, label: "Detect", desc: "Change analysis" },
  { icon: BarChart3, label: "Analyze", desc: "Zone comparison" },
  { icon: Bell, label: "Alert", desc: "Violation reports" },
];

const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="h-full bg-card border border-border rounded-lg overflow-hidden flex flex-col"
    >
      <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">How It Works</h3>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      
      <CollapsibleContent className="flex-1 overflow-hidden">
        <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2.5 p-2.5 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">{step.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>

      {!isOpen && (
        <div className="flex-1 px-4 pb-4 flex items-center justify-around">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">{step.label}</span>
            </div>
          ))}
        </div>
      )}
    </Collapsible>
  );
};

export default HowItWorks;
