import { Satellite, Layers, TrendingUp, Bell } from "lucide-react";

const steps = [
  {
    icon: Satellite,
    title: "Satellite Data Collection",
    description: "The system automatically downloads Sentinel-2 satellite images every 5 days, covering the entire mining region at 10-meter resolution."
  },
  {
    icon: Layers,
    title: "Change Detection",
    description: "Advanced algorithms compare images over time to detect changes in land cover, identifying new excavation activity and ground disturbances."
  },
  {
    icon: TrendingUp,
    title: "Activity Analysis",
    description: "Detected changes are analyzed against legal boundaries and no-go zones. The system calculates excavation areas and tracks progression trends."
  },
  {
    icon: Bell,
    title: "Alert Generation",
    description: "When activity is detected in restricted zones, the system creates an alert with location details and confidence scores for review."
  },
];

const HowItWorks = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm text-muted-foreground">?</span>
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">How the System Works</h2>
          <p className="text-sm text-muted-foreground">A simple overview of the monitoring process</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">Step {index + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 -right-3 w-6 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
