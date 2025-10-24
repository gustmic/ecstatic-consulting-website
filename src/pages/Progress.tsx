import { CheckCircle2, Circle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Progress = () => {
  const sections = [
    {
      title: "Phase 1: Foundation & Core Pipeline Insights",
      status: "complete",
      items: [
        { done: true, text: "Create Analytics page at /admin/crm/analytics" },
        { done: true, text: "Add routing configuration in App.tsx" },
        { done: true, text: "Add database fields (actual_hours, hourly_rate, lead_source, engagement_score)" },
        { done: true, text: "Create ConversionFunnel component with stage visualization" },
        { done: true, text: "Build Win/Loss Analysis component with metrics" },
        { done: true, text: "Add navigation link from CRM Dashboard" },
        { done: true, text: "Implement 4 key metric cards at top of page" },
      ]
    },
    {
      title: "Phase 2: Time & Relationship Insights",
      status: "complete",
      items: [
        { done: true, text: "Create DealVelocityChart component" },
        { done: true, text: "Calculate average time in each stage" },
        { done: true, text: "Build EngagementScoreCard component" },
        { done: true, text: "Implement engagement scoring algorithm" },
        { done: true, text: "Display engagement tier distribution (A/B/C/D)" },
        { done: true, text: "Show top 10 most engaged contacts" },
      ]
    },
    {
      title: "Phase 3: Pricing & Profitability Insights",
      status: "complete",
      items: [
        { done: true, text: "Create ServiceProfitability component" },
        { done: true, text: "Group projects by service type" },
        { done: true, text: "Calculate revenue, hours, and profit margins" },
        { done: true, text: "Add sorting and filtering to profitability table" },
        { done: true, text: "Display utilization percentages" },
      ]
    },
    {
      title: "Phase 4: Polish & Advanced Features",
      status: "complete",
      items: [
        { done: true, text: "Add date range filters (30/90/365 days, all time)" },
        { done: true, text: "Implement loading states for all components" },
        { done: true, text: "Add empty states with helpful messages" },
        { done: true, text: "Make all charts responsive on mobile" },
        { done: true, text: "Add chart tooltips with detailed breakdowns" },
        { done: true, text: "Create analytics helper functions in lib/analytics.ts" },
        { done: true, text: "Add error boundaries and toast notifications" },
        { done: true, text: "Final testing and refinement" },
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-500">Complete</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return null;
    }
  };

  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = sections.reduce(
    (acc, section) => acc + section.items.filter(item => item.done).length, 
    0
  );
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">
              CRM Analytics Dashboard Implementation
            </h1>
            <p className="text-muted-foreground mb-6">
              Comprehensive analytics for data-driven consultancy decisions
            </p>
            
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-2xl font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-primary rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{completedItems}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {sections.filter(s => s.status === 'partial').reduce((acc, s) => 
                      acc + s.items.filter(i => !i.done).length, 0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">
                    {totalItems - completedItems}
                  </p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
                  {getStatusBadge(section.status)}
                </div>
                
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.done ? "text-foreground" : "text-muted-foreground"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-8 bg-blue-500/10 border-blue-500/20">
            <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">📊 Analytics Goals</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Answer key business questions with data-driven insights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li><strong>Where should we focus our time?</strong> - Conversion funnel & deal velocity</li>
              <li><strong>Are we pricing correctly?</strong> - Service profitability analysis</li>
              <li><strong>What's our pipeline health?</strong> - Win/loss rates & stage metrics</li>
              <li><strong>Which relationships are worth nurturing?</strong> - Engagement scoring</li>
            </ul>
            <div className="bg-background/50 rounded p-4 border">
              <p className="text-sm font-medium mb-2">🎯 Phase Approach:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Foundation + Core Pipeline Insights (Funnel, Win/Loss)</li>
                <li>Time & Relationship Insights (Velocity, Engagement)</li>
                <li>Pricing Insights (Service Profitability)</li>
                <li>Polish & Advanced Features (Filters, UX refinement)</li>
              </ol>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
