import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ecstatic Consulting" className="h-8" />
            <span className="font-serif text-xl font-semibold">Admin</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-3 text-center">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Choose a section to manage
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* CRM Card */}
            <Link to="/admin/crm">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">CRM</CardTitle>
                  <CardDescription className="text-base">
                    Manage your projects, contacts, and companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Projects Pipeline</li>
                    <li>• Contact Management</li>
                    <li>• Company Profiles</li>
                    <li>• CRM Analytics</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            {/* Web Analytics Card */}
            <Link to="/admin/analytics">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Web Analytics</CardTitle>
                  <CardDescription className="text-base">
                    Track website performance and user behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Visitor Tracking</li>
                    <li>• Scroll Depth Analysis</li>
                    <li>• CTA Performance</li>
                    <li>• Engagement Metrics</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
