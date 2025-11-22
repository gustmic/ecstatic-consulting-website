import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CRMNav } from "@/components/crm/CRMNav";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Briefcase, Calendar, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

const NewDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeProjects: 0,
    upcomingFollowups: 0,
    totalPipelineValue: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate("/admin");
  };

  const fetchStats = async () => {
    const { data: contacts } = await supabase
      .from("contacts")
      .select("id");

    const { data: projects } = await supabase
      .from("projects")
      .select("id, project_value_kr")
      .eq("status", "Active");

    const { data: followups } = await supabase
      .from("contacts")
      .select("id")
      .gte("next_followup", new Date().toISOString().split("T")[0])
      .lte("next_followup", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);

    const totalPipelineValue = projects?.reduce((sum, p) => sum + (p.project_value_kr || 0), 0) || 0;

    setStats({
      totalContacts: contacts?.length || 0,
      activeProjects: projects?.length || 0,
      upcomingFollowups: followups?.length || 0,
      totalPipelineValue,
    });
  };

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />
      
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Contacts"
            value={stats.totalContacts}
            color="bg-blue-500"
          />
          <StatCard
            icon={Briefcase}
            title="Active Projects"
            value={stats.activeProjects}
            color="bg-green-500"
          />
          <StatCard
            icon={Calendar}
            title="Upcoming Follow-ups"
            value={stats.upcomingFollowups}
            color="bg-orange-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Pipeline Value"
            value={formatCurrency(stats.totalPipelineValue)}
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/crm/contacts")}
                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <p className="font-medium">Manage Contacts</p>
                <p className="text-sm text-muted-foreground">View and edit your contacts</p>
              </button>
              <button
                onClick={() => navigate("/crm/projects")}
                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <p className="font-medium">Manage Projects</p>
                <p className="text-sm text-muted-foreground">Track your projects</p>
              </button>
              <button
                onClick={() => navigate("/crm/companies")}
                className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <p className="font-medium">Manage Companies</p>
                <p className="text-sm text-muted-foreground">Organize your companies</p>
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
