import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  Line,
  ComposedChart,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const generateData = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  return months.map((month, i) => ({
    month,
    excavated: Math.round(42 + Math.sin(i * 0.4) * 12 + i * 2.8),
    noGoZone: Math.round((1.5 + Math.sin(i * 0.7) * 1 + (i > 5 ? (i - 5) * 0.6 : 0)) * 10) / 10,
  }));
};

const AnalyticsChart = () => {
  const data = useMemo(() => generateData(), []);
  
  const latestExcavated = data[data.length - 1].excavated;
  const previousExcavated = data[data.length - 2].excavated;
  const trend = latestExcavated > previousExcavated ? "up" : "down";
  const change = Math.abs(((latestExcavated - previousExcavated) / previousExcavated) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-foreground mb-2">{label} 2023</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-mono font-medium text-foreground">{entry.value} ha</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-foreground">Excavation Activity Timeline</h3>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            trend === "up" ? "bg-status-warning/10 text-status-warning" : "bg-primary/10 text-primary"
          }`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">{change}%</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-excavation/50 to-excavation rounded-full" />
            <span className="text-xs text-muted-foreground">Legal Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-nogozone rounded-full" />
            <span className="text-xs text-muted-foreground">No-Go Zone</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 15, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="excavatedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(40 18% 58%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(40 18% 58%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(220 10% 18%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11, fill: 'hsl(40 8% 50%)' }}
              axisLine={{ stroke: 'hsl(220 10% 18%)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(40 8% 50%)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="excavated"
              stroke="hsl(40 18% 58%)"
              strokeWidth={2}
              fill="url(#excavatedGradient)"
              name="Legal Zone"
            />
            <Line
              type="monotone"
              dataKey="noGoZone"
              stroke="hsl(10 45% 40%)"
              strokeWidth={2}
              dot={false}
              name="No-Go Zone"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
