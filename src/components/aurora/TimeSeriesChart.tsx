import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { TrendingUp } from "lucide-react";

const generateData = () => {
  const months = [
    "Jan 23", "Feb 23", "Mar 23", "Apr 23", "May 23", "Jun 23",
    "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23", "Dec 23", "Jan 24"
  ];
  
  return months.map((month, i) => ({
    month,
    excavated: 45 + Math.sin(i * 0.5) * 15 + i * 2.5 + Math.random() * 5,
    noGoZone: 2 + Math.sin(i * 0.8) * 1.5 + (i > 6 ? (i - 6) * 0.8 : 0) + Math.random() * 1,
  }));
};

const TimeSeriesChart = () => {
  const data = useMemo(() => generateData(), []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-sm p-3 shadow-panel">
          <p className="text-xs font-mono text-muted-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-foreground">
                {entry.name}: <span className="font-mono">{entry.value.toFixed(1)} ha</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48 border-t border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Excavation Progression</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-excavation rounded-full" />
            <span className="text-[10px] text-muted-foreground">Legal Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-nogozone rounded-full" />
            <span className="text-[10px] text-muted-foreground">No-Go Zone</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="excavatedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(40 18% 58%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(40 18% 58%)" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="noGoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(10 45% 35%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(10 45% 35%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(220 10% 20%)" 
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 10, fill: 'hsl(40 8% 55%)' }}
            axisLine={{ stroke: 'hsl(220 10% 20%)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(40 8% 55%)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
            label={{ 
              value: 'Area (ha)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: 10, fill: 'hsl(40 8% 55%)' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="excavated"
            stroke="hsl(40 18% 58%)"
            strokeWidth={2}
            fill="url(#excavatedGradient)"
            name="Excavated Area"
          />
          <Line
            type="monotone"
            dataKey="noGoZone"
            stroke="hsl(10 45% 35%)"
            strokeWidth={2}
            dot={false}
            name="No-Go Zone Incursion"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
