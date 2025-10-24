import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface EngagementTier {
  tier: string;
  count: number;
  color: string;
}

interface TopContact {
  name: string;
  company: string;
  score: number;
  tier: string;
}

interface EngagementScoreCardProps {
  tierData: EngagementTier[];
  topContacts: TopContact[];
}

const getTierBadgeColor = (tier: string) => {
  switch (tier) {
    case 'A': return 'bg-green-500';
    case 'B': return 'bg-blue-500';
    case 'C': return 'bg-yellow-500';
    case 'D': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-semibold mb-2">Tier {data.tier}</p>
        <p className="text-sm">Contacts: {data.count}</p>
      </div>
    );
  }
  return null;
};

const EngagementScoreCard = ({ tierData, topContacts }: EngagementScoreCardProps) => {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Contact Engagement</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Engagement tiers and most active relationships
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ tier, count }) => `${tier}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {tierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {tierData.map((tier) => (
              <div key={tier.tier} className="text-center p-2 bg-muted/30 rounded">
                <Badge className={getTierBadgeColor(tier.tier)}>{tier.tier}</Badge>
                <p className="text-lg font-bold mt-1">{tier.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Top 10 Engaged Contacts</h3>
          <div className="rounded-md border max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topContacts.map((contact, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {contact.company || 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={getTierBadgeColor(contact.tier)}>
                        {contact.score}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Engagement Scoring Algorithm:</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Recent interaction (within 30 days): +3 points</li>
          <li>• Interaction frequency: +1 per interaction in last 90 days</li>
          <li>• Has upcoming follow-up: +2 points</li>
          <li>• Email/Call interaction: +2 points vs +1 for notes</li>
          <li>• Tiers: A (8-10), B (5-7), C (2-4), D (0-1)</li>
        </ul>
      </div>
    </Card>
  );
};

export default EngagementScoreCard;
