import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

interface FollowUp {
  id: string;
  contact_name: string;
  company: string;
  stage: string;
  next_followup: string;
  is_overdue: boolean;
}

interface UpcomingFollowUpsProps {
  followUps: FollowUp[];
  onComplete: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
  onEmail: (id: string) => void;
}

const UpcomingFollowUps = ({ followUps, onComplete, onSnooze, onEmail }: UpcomingFollowUpsProps) => {
  if (followUps.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-muted-foreground">All caught up!</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-6">Upcoming Follow-Ups</h2>
      
      <div className="space-y-4">
        {followUps.map((followUp) => (
          <div 
            key={followUp.id} 
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">{followUp.contact_name}</h3>
                {followUp.is_overdue && (
                  <Badge variant="destructive" className="text-xs">Overdue</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{followUp.company}</span>
                <span>•</span>
                <span>{followUp.stage}</span>
                <span>•</span>
                <span className={followUp.is_overdue ? "text-destructive font-medium" : ""}>
                  {formatDate(followUp.next_followup)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onComplete(followUp.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
              
              <div className="relative group">
                <Button size="sm" variant="ghost">
                  <Clock className="h-4 w-4 mr-1" />
                  Snooze
                </Button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-background border rounded-md shadow-lg z-10">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => onSnooze(followUp.id, 3)}
                  >
                    +3 days
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => onSnooze(followUp.id, 7)}
                  >
                    +7 days
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => onSnooze(followUp.id, 14)}
                  >
                    +14 days
                  </Button>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEmail(followUp.id)}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingFollowUps;
