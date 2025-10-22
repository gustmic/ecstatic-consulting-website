import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SummaryCards from "@/components/crm/SummaryCards";
import UpcomingFollowUps from "@/components/crm/UpcomingFollowUps";
import RecentActivity from "@/components/crm/RecentActivity";
import { useToast } from "@/hooks/use-toast";

const CRMDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalContacts, setTotalContacts] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [pipelineValue, setPipelineValue] = useState(0);
  const [nextFollowUp, setNextFollowUp] = useState<{ date: string; contactName: string } | null>(null);
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchDashboardData();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchDashboardData = async () => {
    // Fetch total contacts
    const { count: contactCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true });
    setTotalContacts(contactCount || 0);

    // Fetch active projects
    const { count: projectCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Ongoing');
    setActiveProjects(projectCount || 0);

    // Fetch pipeline value (weighted)
    const { data: projects } = await supabase
      .from('projects')
      .select('status, project_value_kr');
    
    const weights: Record<string, number> = { Lead: 0.2, Prospect: 0.4, Proposal: 0.6, Contract: 1.0, Client: 0 };
    const totalValue = projects?.reduce((sum, p) => sum + (p.project_value_kr * (weights[p.status] || 0)), 0) || 0;
    setPipelineValue(totalValue);

    // Fetch next follow-up
    const { data: nextFollow } = await supabase
      .from('contacts')
      .select('name, next_followup')
      .not('next_followup', 'is', null)
      .gte('next_followup', new Date().toISOString().split('T')[0])
      .order('next_followup', { ascending: true })
      .limit(1)
      .maybeSingle();
    
    if (nextFollow) {
      setNextFollowUp({ date: nextFollow.next_followup, contactName: nextFollow.name });
    }

    // Fetch upcoming follow-ups (next 7 days or overdue)
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const { data: upcomingFollowUps } = await supabase
      .from('contacts')
      .select('id, name, company, stage, next_followup, has_overdue_followup')
      .not('next_followup', 'is', null)
      .or(`next_followup.lte.${nextWeek},has_overdue_followup.eq.true`)
      .order('next_followup', { ascending: true });
    
    setFollowUps(upcomingFollowUps?.map(f => ({
      id: f.id,
      contact_name: f.name,
      company: f.company || 'No company',
      stage: f.stage,
      next_followup: f.next_followup,
      is_overdue: f.has_overdue_followup
    })) || []);

    // Fetch recent activity
    const { data: interactions } = await supabase
      .from('interactions')
      .select(`
        id,
        type,
        date,
        subject,
        contacts (name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);
    
    setRecentActivities(interactions?.map(i => ({
      id: i.id,
      contact_name: (i.contacts as any)?.name || 'Unknown',
      type: i.type,
      date: i.date,
      subject: i.subject
    })) || []);
  };

  const handleCompleteFollowUp = async (contactId: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ next_followup: null })
      .eq('id', contactId);

    if (!error) {
      toast({ title: "Follow-up completed" });
      fetchDashboardData();
    }
  };

  const handleSnoozeFollowUp = async (contactId: string, days: number) => {
    const newDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const { error } = await supabase
      .from('contacts')
      .update({ next_followup: newDate })
      .eq('id', contactId);

    if (!error) {
      toast({ title: `Follow-up snoozed for ${days} days` });
      fetchDashboardData();
    }
  };

  const handleEmailFollowUp = (contactId: string) => {
    // TODO: Implement email modal
    toast({ title: "Email feature coming soon" });
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/landing">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Portal
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your contacts, projects, and revenue
          </p>
        </div>

        <div className="space-y-8">
          <SummaryCards
            totalContacts={totalContacts}
            activeProjects={activeProjects}
            pipelineValue={pipelineValue}
            nextFollowUp={nextFollowUp}
          />

          <UpcomingFollowUps
            followUps={followUps}
            onComplete={handleCompleteFollowUp}
            onSnooze={handleSnoozeFollowUp}
            onEmail={handleEmailFollowUp}
          />

          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
