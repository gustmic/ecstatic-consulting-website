import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTestimonials = () => {
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

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin");
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
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/content")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content Management
          </Button>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Testimonials</h1>
              <p className="text-muted-foreground">
                Manage client testimonials and reviews
              </p>
            </div>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>

          <div className="text-center py-20 text-muted-foreground">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Testimonials management interface coming soon</p>
            <p className="text-sm mt-2">Database structure is ready for testimonials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;
