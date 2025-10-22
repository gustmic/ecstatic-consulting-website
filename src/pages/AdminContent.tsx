import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, ArrowLeft } from "lucide-react";

const AdminContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/landing")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Portal
          </Button>

          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Content Management</h1>
            <p className="text-muted-foreground">
              Manage your website content, blog posts, and testimonials
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/dashboard")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-2">Blog Posts</h2>
                  <p className="text-muted-foreground">
                    Create and manage blog articles for your website
                  </p>
                </div>
                <Button className="mt-4">
                  Manage Blog
                </Button>
              </div>
            </Card>

            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/testimonials")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-2">Testimonials</h2>
                  <p className="text-muted-foreground">
                    Manage client testimonials and reviews
                  </p>
                </div>
                <Button className="mt-4" variant="outline">
                  Manage Testimonials
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
