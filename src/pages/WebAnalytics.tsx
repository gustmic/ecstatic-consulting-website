import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, Users, MousePointerClick } from "lucide-react";
import logo from "@/assets/logo.webp";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const WebAnalytics = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Ecstatic Consulting" className="h-8" />
              <span className="font-serif text-xl font-semibold">Web Analytics</span>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Placeholder Content */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Website Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              PostHog analytics integration coming soon
            </p>
          </div>

          {/* Stats Grid - Placeholder */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-3xl font-bold">---</div>
                    <p className="text-xs text-muted-foreground">Awaiting data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>CTA Clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <MousePointerClick className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="text-3xl font-bold">---</div>
                    <p className="text-xs text-muted-foreground">Awaiting data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg. Scroll Depth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-3xl font-bold">---</div>
                    <p className="text-xs text-muted-foreground">Awaiting data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Engagement Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <BarChart3 className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="text-3xl font-bold">---</div>
                    <p className="text-xs text-muted-foreground">Awaiting data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Ready for PostHog Integration</CardTitle>
              <CardDescription>
                This dashboard is prepared to display PostHog analytics data once the integration is complete.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Scroll depth tracking (25/50/75/100%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>CTA button click tracking with location data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Engagement detection (30s near bottom)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Calendly widget open tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Page load event tracking</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WebAnalytics;
