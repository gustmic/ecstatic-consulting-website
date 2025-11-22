import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import SummaryCards from "@/components/crm/SummaryCards";
import RevenueChart from "@/components/crm/RevenueChart";
import ConversionFunnel from "@/components/crm/ConversionFunnel";
import WinLossAnalysis from "@/components/crm/WinLossAnalysis";
import ServiceProfitability from "@/components/crm/ServiceProfitability";
import DealVelocityChart from "@/components/crm/DealVelocityChart";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalContacts: 0,
    activeProjects: 0,
    pipelineValue: 0,
    nextFollowUp: null as { date: string; contactName: string } | null,
  });
  const [timeRange, setTimeRange] = useState<3 | 6 | 12>(6);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchAnalyticsData();
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    
    try {
      // Fetch contacts count
      const { count: contactsCount } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true });

      // Fetch active projects
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .neq("pipeline_status", "Lost")
        .neq("pipeline_status", "Won");

      // Calculate pipeline value
      const { data: pipelineData } = await supabase
        .from("projects")
        .select("project_value_kr, probability_percent")
        .neq("pipeline_status", "Lost")
        .neq("pipeline_status", "Won");

      const totalPipelineValue = pipelineData?.reduce((sum, p) => {
        const value = p.project_value_kr || 0;
        const probability = (p.probability_percent || 0) / 100;
        return sum + (value * probability);
      }, 0) || 0;

      setAnalyticsData({
        totalContacts: contactsCount || 0,
        activeProjects: projectsCount || 0,
        pipelineValue: totalPipelineValue,
        nextFollowUp: null,
      });
    } catch (error: any) {
      toast({
        title: "Error loading analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CRMNav />
        <div className="container mx-auto px-6 py-8 pt-24">
          <h1 className="font-serif text-4xl font-bold mb-8">Analytics</h1>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <h1 className="font-serif text-4xl font-bold mb-8">Analytics</h1>
        
        <div className="space-y-8">
          <SummaryCards
            totalContacts={analyticsData.totalContacts}
            activeProjects={analyticsData.activeProjects}
            pipelineValue={analyticsData.pipelineValue}
            nextFollowUp={analyticsData.nextFollowUp}
          />
          <RevenueChart
            data={[]}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <ConversionFunnel data={[]} />
          <WinLossAnalysis data={{ overallWinRate: 0, stageBreakdown: [] }} />
          <ServiceProfitability data={[]} />
          <DealVelocityChart data={[]} overallCycle={0} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
