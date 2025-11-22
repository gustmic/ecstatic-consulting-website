import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatCurrencySEK } from "@/lib/formatters";

interface Project {
  id: string;
  type: "Assessment" | "Pilot" | "Integration";
  pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
  project_status: "Planned" | "Ongoing" | "Completed" | null;
  project_value_kr: number;
  probability_percent: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const Analytics = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchProjects();
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setProjects((data || []) as Project[]);
    setLoading(false);
  };

  // Filter projects by date
  const filteredProjects = projects.filter(p => {
    if (timeFilter === "all") return true;
    const days = parseInt(timeFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return new Date(p.created_at) >= cutoffDate;
  });

  // Capacity Check
  const today = new Date();
  const activeAssessments = filteredProjects.filter(
    p =>
      p.type === "Assessment" &&
      p.project_status === "Ongoing" &&
      p.start_date &&
      p.end_date &&
      new Date(p.start_date) <= today &&
      new Date(p.end_date) >= today
  ).length;

  const activePilots = filteredProjects.filter(
    p =>
      p.type === "Pilot" &&
      p.project_status === "Ongoing" &&
      p.start_date &&
      p.end_date &&
      new Date(p.start_date) <= today &&
      new Date(p.end_date) >= today
  ).length;

  const startingThisMonth = filteredProjects.filter(p => {
    if (!p.start_date) return false;
    const startDate = new Date(p.start_date);
    return (
      startDate.getMonth() === today.getMonth() &&
      startDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // Pipeline Health
  const pipelineProjects = filteredProjects.filter(
    p => p.pipeline_status === "Meeting Booked" || p.pipeline_status === "Proposal Sent"
  );
  
  const pipelineValue = pipelineProjects.reduce(
    (sum, p) => sum + (p.project_value_kr * p.probability_percent) / 100,
    0
  );

  const meetingBookedCount = filteredProjects.filter(
    p => p.pipeline_status === "Meeting Booked"
  ).length;

  const proposalSentCount = filteredProjects.filter(
    p => p.pipeline_status === "Proposal Sent"
  ).length;

  const wonCount = filteredProjects.filter(p => p.pipeline_status === "Won").length;
  const lostCount = filteredProjects.filter(p => p.pipeline_status === "Lost").length;

  // Conversion Funnel Calculations
  const totalProjectsStarted = filteredProjects.length;
  
  // Stage-to-stage conversions
  const meetingToProposalOrWon = proposalSentCount + wonCount;
  const meetingToProposalRate = meetingBookedCount + meetingToProposalOrWon > 0
    ? ((meetingToProposalOrWon / (meetingBookedCount + meetingToProposalOrWon)) * 100).toFixed(1)
    : "0";

  const proposalToWonRate = proposalSentCount + wonCount > 0
    ? ((wonCount / (proposalSentCount + wonCount)) * 100).toFixed(1)
    : "0";

  // Overall win rate
  const overallWinRate = totalProjectsStarted > 0
    ? ((wonCount / totalProjectsStarted) * 100).toFixed(1)
    : "0";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CRMNav />
        <div className="container mx-auto px-6 py-8 pt-24">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Analytics</h1>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 365 days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Capacity Check */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Active Assessments
            </h3>
            <div className="text-3xl font-bold mb-2">
              {activeAssessments} / 2
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  activeAssessments >= 2 ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${Math.min((activeAssessments / 2) * 100, 100)}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Active Pilots
            </h3>
            <div className="text-3xl font-bold mb-2">{activePilots} / 4</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  activePilots >= 4 ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${Math.min((activePilots / 4) * 100, 100)}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Starting This Month
            </h3>
            <div className="text-3xl font-bold">{startingThisMonth}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>
        </div>

        {/* Pipeline Health */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Pipeline Value
            </h3>
            <div className="text-3xl font-bold">
              {formatCurrencySEK(pipelineValue)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">(weighted)</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Meeting Booked
            </h3>
            <div className="text-3xl font-bold">{meetingBookedCount}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Proposal Sent
            </h3>
            <div className="text-3xl font-bold">{proposalSentCount}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="p-6 mb-8">
          <h2 className="font-serif text-2xl font-bold mb-6">
            Conversion Funnel
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Meeting Booked</span>
                <span className="text-muted-foreground">
                  {meetingBookedCount} projects (100%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-6">
                <div
                  className="bg-primary h-6 rounded-full flex items-center justify-end pr-3 text-xs text-white font-semibold"
                  style={{ width: "100%" }}
                >
                  {meetingBookedCount}
                </div>
              </div>
            </div>

            <div className="pl-8">
              <div className="text-sm text-muted-foreground mb-2">
                ↓ {meetingToProposalRate}% converted to Proposal Sent or Won
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Proposal Sent</span>
                <span className="text-muted-foreground">
                  {proposalSentCount} projects (
                  {meetingBookedCount > 0
                    ? ((proposalSentCount / meetingBookedCount) * 100).toFixed(0)
                    : "0"}
                  %)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-6">
                <div
                  className="bg-primary h-6 rounded-full flex items-center justify-end pr-3 text-xs text-white font-semibold"
                  style={{
                    width: `${
                      meetingBookedCount > 0
                        ? Math.min((proposalSentCount / meetingBookedCount) * 100, 100)
                        : 0
                    }%`,
                  }}
                >
                  {proposalSentCount}
                </div>
              </div>
            </div>

            <div className="pl-8">
              <div className="text-sm text-muted-foreground mb-2">
                ↓ {proposalToWonRate}% converted to Won
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Won</span>
                <span className="text-muted-foreground">
                  {wonCount} projects (
                  {meetingBookedCount > 0
                    ? ((wonCount / meetingBookedCount) * 100).toFixed(0)
                    : "0"}
                  %)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-6">
                <div
                  className="bg-green-600 h-6 rounded-full flex items-center justify-end pr-3 text-xs text-white font-semibold"
                  style={{
                    width: `${
                      meetingBookedCount > 0
                        ? Math.min((wonCount / meetingBookedCount) * 100, 100)
                        : 0
                    }%`,
                  }}
                >
                  {wonCount}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Overall Win Rate
              </p>
              <p className="text-2xl font-bold">{overallWinRate}%</p>
            </Card>

            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Meeting → Proposal
              </p>
              <p className="text-2xl font-bold">{meetingToProposalRate}%</p>
            </Card>

            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Proposal → Won
              </p>
              <p className="text-2xl font-bold">{proposalToWonRate}%</p>
            </Card>
          </div>

          {lostCount > 0 && (
            <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm font-semibold mb-2">Lost Projects: {lostCount}</p>
              <p className="text-sm text-muted-foreground">
                Review lost projects to identify common patterns and improve conversion rates.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
