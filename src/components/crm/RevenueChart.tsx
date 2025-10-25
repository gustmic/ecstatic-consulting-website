import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, getMonthName } from "@/lib/formatters";

interface MonthlyRevenue {
  month: string;
  confirmed: number;
  potential: number;
}

interface RevenueChartProps {
  data: MonthlyRevenue[];
  timeRange: 3 | 6 | 12;
  onTimeRangeChange: (range: 3 | 6 | 12) => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const confirmed = payload[0]?.value || 0;
    const potential = payload[1]?.value || 0;
    const total = confirmed + potential;
    
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-semibold mb-2">{payload[0]?.payload.month}</p>
        <div className="space-y-1 text-sm">
          <p className="text-blue-600">
            Confirmed: {formatCurrency(confirmed)}
          </p>
          <p className="text-blue-300">
            Potential: {formatCurrency(potential)}
          </p>
          <p className="font-semibold border-t pt-1 mt-1">
            Total: {formatCurrency(total)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M kr`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k kr`;
  }
  return formatCurrency(value);
};

const RevenueChart = ({ data, timeRange, onTimeRangeChange }: RevenueChartProps) => {
  const displayData = data.slice(0, timeRange);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-semibold">Revenue Projection</h2>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeRangeChange(3)}
          >
            3 mo
          </Button>
          <Button
            variant={timeRange === 6 ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeRangeChange(6)}
          >
            6 mo
          </Button>
          <Button
            variant={timeRange === 12 ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeRangeChange(12)}
          >
            12 mo
          </Button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="month" 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => value === 'confirmed' ? 'Confirmed' : 'Potential'}
          />
          <Bar 
            dataKey="confirmed" 
            stackId="a" 
            fill="#3B82F6" 
            radius={[0, 0, 4, 4]}
            name="confirmed"
          />
          <Bar 
            dataKey="potential" 
            stackId="a" 
            fill="#93C5FD" 
            radius={[4, 4, 0, 0]}
            name="potential"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
