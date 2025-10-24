import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

interface WinLossData {
  overallWinRate: number;
  stageBreakdown: {
    stage: string;
    total: number;
    won: number;
    winRate: number;
  }[];
}

interface WinLossAnalysisProps {
  data: WinLossData;
}

const WinLossAnalysis = ({ data }: WinLossAnalysisProps) => {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Win/Loss Analysis</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Understand your conversion success across pipeline stages
      </p>

      <div className="mb-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Overall Win Rate</p>
            <p className="text-4xl font-bold">{data.overallWinRate}%</p>
          </div>
          {data.overallWinRate >= 50 ? (
            <TrendingUp className="h-12 w-12 text-green-500" />
          ) : (
            <TrendingDown className="h-12 w-12 text-yellow-500" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Percentage of contacts that reached Client stage
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Won</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.stageBreakdown.map((stage) => (
              <TableRow key={stage.stage}>
                <TableCell className="font-medium">{stage.stage}</TableCell>
                <TableCell className="text-right">{stage.total}</TableCell>
                <TableCell className="text-right">{stage.won}</TableCell>
                <TableCell className="text-right">
                  <span 
                    className={`font-semibold ${
                      stage.winRate >= 50 
                        ? 'text-green-600' 
                        : stage.winRate >= 30 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}
                  >
                    {stage.winRate}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default WinLossAnalysis;
