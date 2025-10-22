import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";

interface Activity {
  id: string;
  contact_name: string;
  type: string;
  date: string;
  subject?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-2xl font-semibold mb-6">Recent Activity</h2>
      
      {activities.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.contact_name}</span>
                  {' - '}
                  <span className="text-muted-foreground">{activity.type}</span>
                  {activity.subject && (
                    <>
                      {': '}
                      <span className="text-muted-foreground">{activity.subject}</span>
                    </>
                  )}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(activity.date)}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
