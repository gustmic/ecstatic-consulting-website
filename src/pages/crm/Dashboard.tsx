import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CRMDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/landing">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Portal
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your contacts, projects, and revenue
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Contacts</h3>
            <p className="text-3xl font-bold">0</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Projects</h3>
            <p className="text-3xl font-bold">0</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Pipeline Value</h3>
            <p className="text-3xl font-bold">0 kr</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Next Follow-Up</h3>
            <p className="text-sm text-muted-foreground">No upcoming</p>
          </Card>
        </div>

        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            CRM system is ready. Start adding contacts and projects.
          </p>
          <div className="flex gap-4 justify-center">
            <Button>Add Contact</Button>
            <Button variant="outline">Add Project</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CRMDashboard;
