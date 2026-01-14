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

const generateData = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  return months.map((month, i) => ({
    month,
    excavated: 45 + Math.sin(i * 0.5) * 15 + i * 2.5,
    noGoZone: 2 + Math.sin(i * 0.8) * 1.5 + (i > 6 ? (i - 6) * 0.8 : 0),
  }));
};

const TimeSeriesChart = () => {
  const data = useMemo(() => generateData(), []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-md p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label} 2023</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.name}:
              </span>
              <span className="font-mono text-foreground">{entry.value.toFixed(1)} ha</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-foreground">Excavation Area Over Time</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-excavation rounded-full" />
            <span className="text-sm text-muted-foreground">Legal Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-nogozone rounded-full" />
            <span className="text-sm text-muted-foreground">No-Go Zone</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="excavatedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(40 18% 58%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(40 18% 58%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(220 10% 20%)" 
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: 'hsl(40 8% 55%)' }}
            axisLine={{ stroke: 'hsl(220 10% 20%)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: 'hsl(40 8% 55%)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value} ha`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="excavated"
            stroke="hsl(40 18% 58%)"
            strokeWidth={2}
            fill="url(#excavatedGradient)"
            name="Legal Zone Activity"
          />
          <Line
            type="monotone"
            dataKey="noGoZone"
            stroke="hsl(10 45% 35%)"
            strokeWidth={2}
            dot={false}
            name="No-Go Zone Activity"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
