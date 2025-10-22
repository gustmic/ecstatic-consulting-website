import { Card } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, Calendar } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface SummaryCardsProps {
  totalContacts: number;
  activeProjects: number;
  pipelineValue: number;
  nextFollowUp: { date: string; contactName: string } | null;
}

const SummaryCards = ({ totalContacts, activeProjects, pipelineValue, nextFollowUp }: SummaryCardsProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Contacts</p>
            <p className="text-3xl font-bold">{totalContacts}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
            <p className="text-3xl font-bold">{activeProjects}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pipeline Value</p>
            <p className="text-2xl font-bold">{formatCurrency(pipelineValue)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Next Follow-Up</p>
            {nextFollowUp ? (
              <p className="text-sm font-semibold">
                {formatDate(nextFollowUp.date)} - {nextFollowUp.contactName}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">None scheduled</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;
