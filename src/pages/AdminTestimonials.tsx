import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import TestimonialModal from "@/components/admin/TestimonialModal";

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  client_company: string;
  quote: string;
  service_area: string | null;
  is_featured: boolean;
  image_url: string | null;
  logo_url: string | null;
  created_at: string;
}

const AdminTestimonials = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } else {
      setTestimonials(data || []);
    }
  };

  const generateSampleData = async () => {
    const sampleTestimonials = [
      {
        client_name: "Sarah Johnson",
        client_title: "CEO",
        client_company: "TechVision Inc",
        quote: "Their strategic consulting transformed our market approach. We saw a 40% increase in market share within six months.",
        service_area: "Strategy",
        is_featured: true,
      },
      {
        client_name: "Michael Chen",
        client_title: "CTO",
        client_company: "DataFlow Systems",
        quote: "The technology solutions they implemented streamlined our operations and reduced costs by 30%. Exceptional work!",
        service_area: "Technology",
        is_featured: true,
      },
      {
        client_name: "Emily Rodriguez",
        client_title: "VP of Analytics",
        client_company: "GlobalMetrics Corp",
        quote: "Their data analytics platform gave us insights we never knew existed. Game-changing for our business intelligence.",
        service_area: "Data Analytics",
        is_featured: false,
      },
    ];

    for (const testimonial of sampleTestimonials) {
      await supabase.from("testimonials").insert(testimonial);
    }

    toast({
      title: "Success",
      description: "Sample testimonials created",
    });
    
    fetchTestimonials();
  };

  const handleSave = async (testimonial: Omit<Testimonial, "id" | "created_at">) => {
    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(testimonial)
        .eq("id", editingTestimonial.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update testimonial",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase.from("testimonials").insert(testimonial);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create testimonial",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
        fetchTestimonials();
      }
    }
    
    setEditingTestimonial(undefined);
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", testimonialToDelete);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      fetchTestimonials();
    }

    setDeleteDialogOpen(false);
    setTestimonialToDelete(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchTestimonials();
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
            
            <div className="flex gap-2">
              {testimonials.length === 0 && (
                <Button variant="outline" onClick={generateSampleData}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Samples
                </Button>
              )}
              <Button onClick={() => {
                setEditingTestimonial(undefined);
                setModalOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </div>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
              <p className="text-lg mb-2">No testimonials yet</p>
              <p className="text-sm">Add your first testimonial or generate sample data to get started</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Service Area</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{testimonial.client_name}</div>
                          {testimonial.client_title && (
                            <div className="text-sm text-muted-foreground">
                              {testimonial.client_title}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{testimonial.client_company}</TableCell>
                      <TableCell>
                        {testimonial.service_area && (
                          <Badge variant="outline">{testimonial.service_area}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{testimonial.quote}</p>
                      </TableCell>
                      <TableCell>
                        {testimonial.is_featured && (
                          <Badge>Featured</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingTestimonial(testimonial);
                              setModalOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setTestimonialToDelete(testimonial.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <TestimonialModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        testimonial={editingTestimonial}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTestimonials;
