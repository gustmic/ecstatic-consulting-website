import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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
        <div className="max-w-[1600px] mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Real-time insights from PostHog • Updated live</p>
          </div>

          {/* PostHog Dashboard Embed */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full" style={{ height: "2000px" }}>
                <iframe
                  src="https://eu.posthog.com/shared/AmFjDQl-Gy0dgRojmaEaWG2bz5J8sQ"
                  className="w-full h-full border-0"
                  title="PostHog Analytics Dashboard"
                  allow="clipboard-write"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://app.posthog.com/events"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Events →
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://app.posthog.com/recordings"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Session Recordings →
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://app.posthog.com/dashboard/439260"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Open in PostHog →
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WebAnalytics;
