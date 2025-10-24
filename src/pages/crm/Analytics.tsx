import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import ConversionFunnel from "@/components/crm/ConversionFunnel";
import WinLossAnalysis from "@/components/crm/WinLossAnalysis";
import DealVelocityChart from "@/components/crm/DealVelocityChart";
import EngagementScoreCard from "@/components/crm/EngagementScoreCard";
import { formatCurrency } from "@/lib/formatters";
import { calculateEngagementScore, getEngagementTier, calculateDealVelocity } from "@/lib/analytics";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [winLossData, setWinLossData] = useState<any>(null);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [engagementData, setEngagementData] = useState<any>(null);
  const [metrics, setMetrics] = useState({
    overallConversion: 0,
    avgDealCycle: 0,
    totalPipelineValue: 0,
    engagementHealth: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchAnalyticsData();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchAnalyticsData = async () => {
    // Fetch all contacts with their stages and engagement data
    const { data: contacts } = await supabase
      .from('contacts')
      .select('id, name, company, stage, created_at, engagement_score, last_contacted, next_followup');

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

    // Total pipeline value
    const { data: projects } = await supabase
      .from('projects')
      .select('project_value_kr, status');
    
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
  };

  if (loading) {
    return null;
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

        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Pipeline Analytics</h1>
          <p className="text-muted-foreground">
            Data-driven insights for your consultancy
          </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Analytics;

