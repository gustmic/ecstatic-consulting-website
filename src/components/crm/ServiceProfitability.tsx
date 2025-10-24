import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface ServiceData {
  serviceType: string;
  projectCount: number;
  totalRevenue: number;
  estimatedHours: number;
  actualHours: number;
  profitMargin: number;
  utilization: number;
}

interface ServiceProfitabilityProps {
  data: ServiceData[];
}

type SortField = 'serviceType' | 'projectCount' | 'totalRevenue' | 'profitMargin' | 'utilization';

const ServiceProfitability = ({ data }: ServiceProfitabilityProps) => {
  const [sortField, setSortField] = useState<SortField>('totalRevenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => handleSort(field)}
      className="h-8 px-2 lg:px-3"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-600';
    if (margin >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90 && utilization <= 110) return 'text-green-600';
    if (utilization >= 70 && utilization < 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const avgHourlyRate = data.reduce((sum, s) => sum + s.totalRevenue, 0) / 
                        data.reduce((sum, s) => sum + s.estimatedHours, 0);

  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Service Profitability</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Analyze revenue, hours, and margins by service type
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Services</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold">{formatCurrency(data.reduce((s, d) => s + d.totalRevenue, 0))}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Avg Hourly Rate</p>
          <p className="text-2xl font-bold">{formatCurrency(Math.round(avgHourlyRate))}/h</p>
        </div>
      </div>

      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortButton field="serviceType" label="Service Type" />
              </TableHead>
              <TableHead className="text-right">
                <SortButton field="projectCount" label="Projects" />
              </TableHead>
              <TableHead className="text-right">
                <SortButton field="totalRevenue" label="Revenue" />
              </TableHead>
              <TableHead className="text-right">Est. Hours</TableHead>
              <TableHead className="text-right">Actual Hours</TableHead>
              <TableHead className="text-right">
                <SortButton field="profitMargin" label="Margin %" />
              </TableHead>
              <TableHead className="text-right">
                <SortButton field="utilization" label="Utilization" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No project data available. Add projects to see profitability analysis.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((service) => (
                <TableRow key={service.serviceType}>
                  <TableCell className="font-medium">{service.serviceType}</TableCell>
                  <TableCell className="text-right">{service.projectCount}</TableCell>
                  <TableCell className="text-right">{formatCurrency(service.totalRevenue)}</TableCell>
                  <TableCell className="text-right">{service.estimatedHours.toFixed(0)} h</TableCell>
                  <TableCell className="text-right">
                    {service.actualHours > 0 ? `${service.actualHours.toFixed(0)} h` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${getMarginColor(service.profitMargin)}`}>
                      {service.profitMargin}%
                      {service.profitMargin >= 40 ? (
                        <TrendingUp className="inline ml-1 h-3 w-3" />
                      ) : (
                        <TrendingDown className="inline ml-1 h-3 w-3" />
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${getUtilizationColor(service.utilization)}`}>
                      {service.utilization}%
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 bg-muted/30 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Understanding the Metrics:</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• <strong>Estimated Hours:</strong> Revenue / Hourly Rate (default 1,500 kr/h)</li>
          <li>• <strong>Actual Hours:</strong> Tracked time spent (if logged)</li>
          <li>• <strong>Profit Margin:</strong> (Revenue - Costs) / Revenue × 100</li>
          <li>• <strong>Utilization:</strong> Actual Hours / Estimated Hours × 100</li>
          <li>• <strong>Good Margin:</strong> ≥40% (green), 20-40% (yellow), &lt;20% (red)</li>
          <li>• <strong>Good Utilization:</strong> 90-110% (green), 70-90% (yellow), other (red)</li>
        </ul>
      </div>
    </Card>
  );
};

export default ServiceProfitability;
