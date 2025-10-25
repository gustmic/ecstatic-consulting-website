import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VelocityData {
  stage: string;
  avgDays: number;
}

interface DealVelocityChartProps {
  data: VelocityData[];
  overallCycle: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-semibold mb-2">{data.stage}</p>
        <div className="space-y-1 text-sm">
          <p>Average: {data.avgDays} days</p>
        </div>
      </div>
    );
  }
  return null;
};

const DealVelocityChart = ({ data, overallCycle }: DealVelocityChartProps) => {
  if (data.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="font-serif text-2xl font-semibold mb-2">Deal Velocity</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Average time spent in each pipeline stage
        </p>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">No velocity data available</p>
          <p className="text-sm text-muted-foreground">
            Contact data needed to calculate deal velocity
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Deal Velocity</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Average time spent in each pipeline stage
      </p>

      <div className="mb-6 p-6 bg-blue-500/5 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Overall Deal Cycle</p>
            <p className="text-4xl font-bold">{overallCycle} days</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Average time from first to last stage
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="stage" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Days', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="avgDays" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.map((item, idx) => (
          <div key={idx} className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{item.stage}</p>
            <p className="text-xl font-bold">{item.avgDays}</p>
            <p className="text-xs text-muted-foreground">days</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DealVelocityChart;
