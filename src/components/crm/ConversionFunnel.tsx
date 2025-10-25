import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FunnelData {
  stage: string;
  count: number;
  conversionRate?: number;
}

interface ConversionFunnelProps {
  data: FunnelData[];
}

const getConversionColor = (rate?: number, stage?: string) => {
  // Check for specific stage names
  if (stage === 'Client Lost') return '#ef4444'; // red-500
  if (stage?.includes('Won') || stage === 'Client') return '#22c55e'; // green-500
  if (stage === 'Qualified Prospect') return '#d3d5d9'; // light grey
  if (stage === 'First Meeting') return '#9dc5ed'; // light blue
  if (stage === 'Proposal') return '#71e5cf'; // turquoise
  
  // Default grey for other stages
  return '#94a3b8'; // slate-400
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-semibold mb-2">{data.stage}</p>
        <div className="space-y-1 text-sm">
          <p>Contacts: {data.count}</p>
          {data.conversionRate !== undefined && (
            <p className="font-semibold" style={{ color: getConversionColor(data.conversionRate, data.stage) }}>
              Conversion: {data.conversionRate}%
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const ConversionFunnel = ({ data }: ConversionFunnelProps) => {
  if (data.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="font-serif text-2xl font-semibold mb-2">Conversion Funnel</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Track how contacts move through your pipeline stages
        </p>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">No contact data available</p>
          <p className="text-sm text-muted-foreground">
            Add contacts to see your conversion funnel
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Conversion Funnel</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Track how contacts move through your pipeline stages
      </p>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis type="number" allowDecimals={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis 
            dataKey="stage" 
            type="category" 
            width={90}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getConversionColor(entry.conversionRate, entry.stage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {data.map((item, idx) => (
          <div key={idx} className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{item.stage}</p>
            <p className="text-xl font-bold">{item.count}</p>
            {item.conversionRate !== undefined && (
              <p 
                className="text-xs font-semibold mt-1"
                style={{ color: getConversionColor(item.conversionRate, item.stage) }}
              >
                {item.conversionRate}%
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ConversionFunnel;
