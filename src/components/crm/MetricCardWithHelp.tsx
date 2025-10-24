import { Card } from "@/components/ui/card";
import { HelpTooltip } from "./HelpTooltip";
import { LucideIcon } from "lucide-react";

interface MetricCardWithHelpProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  helpTitle: string;
  helpDescription: string;
  helpAction?: string;
  status?: "good" | "warning" | "critical";
  showHelp?: boolean;
}

export function MetricCardWithHelp({
  title,
  value,
  subtitle,
  icon: Icon,
  helpTitle,
  helpDescription,
  helpAction,
  status = "good",
  showHelp = true
}: MetricCardWithHelpProps) {
  const statusColors = {
    good: "text-foreground",
    warning: "text-yellow-600",
    critical: "text-red-600"
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {showHelp && (
          <HelpTooltip 
            title={helpTitle}
            description={helpDescription}
            actionable={helpAction}
          />
        )}
      </div>
      
      <p className={`text-2xl font-bold mb-1 ${statusColors[status]}`}>
        {value}
      </p>
      
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </Card>
  );
}
