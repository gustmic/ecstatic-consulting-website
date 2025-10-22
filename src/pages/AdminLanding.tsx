import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, LayoutDashboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLanding = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Admin Portal</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>
            
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/crm")}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-2">CRM & PSA</h2>
                  <p className="text-muted-foreground">
                    Manage contacts, projects, and revenue forecasts
                  </p>
                </div>
                <Button className="w-full">
                  Open CRM Dashboard
                </Button>
              </div>
            </Card>

            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/dashboard")}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-2">Blog System</h2>
                  <p className="text-muted-foreground">
                    Create and manage blog posts for the website
                  </p>
                </div>
                <Button variant="secondary" className="w-full">
                  Open Blog Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
