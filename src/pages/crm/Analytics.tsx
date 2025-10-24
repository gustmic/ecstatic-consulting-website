import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, TrendingUp, Clock, DollarSign, Users, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ConversionFunnel from "@/components/crm/ConversionFunnel";
import WinLossAnalysis from "@/components/crm/WinLossAnalysis";
import DealVelocityChart from "@/components/crm/DealVelocityChart";
import EngagementScoreCard from "@/components/crm/EngagementScoreCard";
import ServiceProfitability from "@/components/crm/ServiceProfitability";
import { formatCurrency } from "@/lib/formatters";
import { calculateEngagementScore, getEngagementTier, calculateDealVelocity, groupProjectsByServiceType } from "@/lib/analytics";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [winLossData, setWinLossData] = useState<any>(null);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [engagementData, setEngagementData] = useState<any>(null);
  const [profitabilityData, setProfitabilityData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    overallConversion: 0,
    avgDealCycle: 0,
    totalPipelineValue: 0,
    engagementHealth: 0,
  });
  const [dateRange, setDateRange] = useState<'30' | '90' | '365' | 'all'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchAnalyticsData();
    };

    checkAuth();
  }, [navigate, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Calculate date filter
      let dateFilter: Date | null = null;
      if (dateRange !== 'all') {
        const days = parseInt(dateRange);
        dateFilter = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      }

      // Fetch all contacts with their stages and engagement data
      let contactsQuery = supabase
        .from('contacts')
        .select('id, name, company, stage, created_at, engagement_score, last_contacted, next_followup');
      
      if (dateFilter) {
        contactsQuery = contactsQuery.gte('created_at', dateFilter.toISOString());
      }

      const { data: contacts, error: contactsError } = await contactsQuery;

      if (contactsError) {
        toast({
          title: "Error fetching contacts",
          description: contactsError.message,
          variant: "destructive",
        });
        return;
      }

    if (!contacts) return;

    // Fetch all interactions
    const { data: interactions } = await supabase
      .from('interactions')
      .select('id, contact_id, type, date, created_at');

    // Calculate funnel data
    const stages = ['Lead', 'Prospect', 'Proposal', 'Contract', 'Client'];
    const stageCounts: Record<string, number> = {};
    
    stages.forEach(stage => {
      stageCounts[stage] = contacts.filter(c => c.stage === stage).length;
    });

    const funnelWithConversion = stages.map((stage, idx) => {
      const count = stageCounts[stage];
      let conversionRate = undefined;
      
      if (idx > 0) {
        const prevCount = stageCounts[stages[idx - 1]];
        conversionRate = prevCount > 0 ? Math.round((count / prevCount) * 100) : 0;
      }
      
      return { stage, count, conversionRate };
    });

    setFunnelData(funnelWithConversion);

    // Calculate win/loss data
    const totalContacts = contacts.length;
    const clientContacts = contacts.filter(c => c.stage === 'Client').length;
    const overallWinRate = totalContacts > 0 ? Math.round((clientContacts / totalContacts) * 100) : 0;

    const stageBreakdown = stages.map(stage => {
      const total = stageCounts[stage];
      const won = stage === 'Client' ? total : Math.round(total * (clientContacts / totalContacts));
      const winRate = total > 0 ? Math.round((won / total) * 100) : 0;
      
      return { stage, total, won, winRate };
    });

    setWinLossData({ overallWinRate, stageBreakdown });

    // Calculate key metrics
    // Overall conversion (Lead to Client)
    const leadCount = stageCounts['Lead'] || 0;
    const overallConversion = leadCount > 0 ? Math.round((clientContacts / (leadCount + clientContacts)) * 100) : 0;

    // Average deal cycle (simplified - based on days since creation)
    const clientContactsWithDates = contacts.filter(c => c.stage === 'Client');
    let avgDealCycle = 0;
    if (clientContactsWithDates.length > 0) {
      const totalDays = clientContactsWithDates.reduce((sum, c) => {
        const created = new Date(c.created_at);
        const now = new Date();
        const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0);
      avgDealCycle = Math.round(totalDays / clientContactsWithDates.length);
    }

    // Total pipeline value and fetch projects for profitability
    let projectsQuery = supabase
      .from('projects')
      .select('id, name, type, project_value_kr, actual_hours, hourly_rate, status, created_at');
    
    if (dateFilter) {
      projectsQuery = projectsQuery.gte('created_at', dateFilter.toISOString());
    }

    const { data: projects } = await projectsQuery;
    
    const totalPipelineValue = projects
      ?.filter(p => p.status !== 'Client' && p.status !== 'Completed')
      .reduce((sum, p) => sum + (p.project_value_kr || 0), 0) || 0;

    // Engagement health
    const highEngagement = contacts.filter(c => (c.engagement_score || 0) > 5).length;
    const engagementHealth = contacts.length > 0 ? Math.round((highEngagement / contacts.length) * 100) : 0;

    setMetrics({
      overallConversion,
      avgDealCycle,
      totalPipelineValue,
      engagementHealth,
    });

    // Calculate deal velocity
    const velocity = calculateDealVelocity(contacts as any);
    setVelocityData(velocity);

    // Calculate engagement scores and tiers
    const contactsWithScores = contacts.map(contact => ({
      ...contact,
      score: calculateEngagementScore(contact as any, interactions || []),
      tier: getEngagementTier(calculateEngagementScore(contact as any, interactions || []))
    }));

    // Group by tier
    const tierCounts = {
      A: contactsWithScores.filter(c => c.tier === 'A').length,
      B: contactsWithScores.filter(c => c.tier === 'B').length,
      C: contactsWithScores.filter(c => c.tier === 'C').length,
      D: contactsWithScores.filter(c => c.tier === 'D').length,
    };

    const tierData = [
      { tier: 'A', count: tierCounts.A, color: '#22c55e' },
      { tier: 'B', count: tierCounts.B, color: '#3b82f6' },
      { tier: 'C', count: tierCounts.C, color: '#eab308' },
      { tier: 'D', count: tierCounts.D, color: '#ef4444' },
    ];

    // Get top 10 engaged contacts
    const topContacts = contactsWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(c => ({
        name: c.name,
        company: c.company || '',
        score: c.score,
        tier: c.tier
      }));

    setEngagementData({ tierData, topContacts });

    // Calculate service profitability
    if (projects && projects.length > 0) {
      const profitability = groupProjectsByServiceType(projects as any);
      setProfitabilityData(profitability);
    } else {
      setProfitabilityData([]);
    }
    } catch (error: any) {
      toast({
        title: "Error loading analytics",
        description: error.message || "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
          <div className="mb-6">
            <Skeleton className="h-10 w-48" />
          </div>

          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-20 w-full" />
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-64 w-full" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/crm">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to CRM Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Pipeline Analytics</h1>
            <p className="text-muted-foreground">
              Data-driven insights for your consultancy
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{metrics.overallConversion}%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Pipeline Conversion Rate</h3>
            <p className="text-xs text-muted-foreground mt-1">Overall Lead→Client %</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{metrics.avgDealCycle}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Avg Deal Cycle</h3>
            <p className="text-xs text-muted-foreground mt-1">Days from Lead to Client</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{formatCurrency(metrics.totalPipelineValue)}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Pipeline Value</h3>
            <p className="text-xs text-muted-foreground mt-1">Active opportunities</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{metrics.engagementHealth}%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Engagement Health</h3>
            <p className="text-xs text-muted-foreground mt-1">Contacts with score &gt;5</p>
          </Card>
        </div>

        {/* Charts - Phase 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ConversionFunnel data={funnelData} />
          {winLossData && <WinLossAnalysis data={winLossData} />}
        </div>

        {/* Charts - Phase 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {velocityData.length > 0 && (
            <DealVelocityChart data={velocityData} overallCycle={metrics.avgDealCycle} />
          )}
          {engagementData && (
            <EngagementScoreCard 
              tierData={engagementData.tierData} 
              topContacts={engagementData.topContacts} 
            />
          )}
        </div>

        {/* Phase 3 - Service Profitability */}
        <ServiceProfitability data={profitabilityData} />
      </div>
    </div>
  );
};

export default Analytics;

