import { useState, useEffect } from "react";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface StickyMetricsSummaryProps {
  overallConversion: number;
  avgDealCycle: number;
  totalPipelineValue: number;
  engagementHealth: number;
}

export function StickyMetricsSummary({
  overallConversion,
  avgDealCycle,
  totalPipelineValue,
  engagementHealth,
}: StickyMetricsSummaryProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate overall health status
  const getOverallStatus = () => {
    const scores = [
      overallConversion >= 20 ? 2 : overallConversion >= 15 ? 1 : 0,
      avgDealCycle <= 60 ? 2 : avgDealCycle <= 90 ? 1 : 0,
      engagementHealth >= 60 ? 2 : engagementHealth >= 40 ? 1 : 0,
    ];
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (avgScore >= 1.5) return { emoji: "🟢", label: "Healthy", color: "text-green-600" };
    if (avgScore >= 1) return { emoji: "🟡", label: "Watch", color: "text-yellow-600" };
    return { emoji: "🔴", label: "Needs Attention", color: "text-red-600" };
  };

  const status = getOverallStatus();

  return (
    <div
      className={cn(
        "sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300",
        isScrolled ? "py-2 shadow-md" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {isScrolled ? (
          // Compact mode
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{overallConversion}%</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{avgDealCycle}d</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{formatCurrency(totalPipelineValue)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{engagementHealth}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <span className={cn("font-semibold flex items-center gap-1", status.color)}>
                {status.emoji} {status.label}
              </span>
            </div>
          </div>
        ) : (
          // Full mode
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">Key Health Metrics</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Overall Status:</span>
                <span className={cn("font-semibold flex items-center gap-1.5", status.color)}>
                  {status.emoji} {status.label}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Conversion</span>
                </div>
                <p className="text-2xl font-bold">{overallConversion}%</p>
                <p className="text-xs text-muted-foreground mt-1">Lead → Client</p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Deal Cycle</span>
                </div>
                <p className="text-2xl font-bold">{avgDealCycle}d</p>
                <p className="text-xs text-muted-foreground mt-1">Avg time to close</p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Pipeline Value</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(totalPipelineValue)}</p>
                <p className="text-xs text-muted-foreground mt-1">Active opportunities</p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Engagement</span>
                </div>
                <p className="text-2xl font-bold">{engagementHealth}%</p>
                <p className="text-xs text-muted-foreground mt-1">High engagement</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
