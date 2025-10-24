import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectsTable from "@/components/crm/ProjectsTable";
import ProjectModal from "@/components/crm/ProjectModal";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set search query from URL parameter on mount
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchProjects();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(query) ||
        (project.client_name && project.client_name.toLowerCase().includes(query))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        contacts (name, company)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading projects",
        description: error.message,
      });
    } else {
      const projectsWithClient = data?.map(p => ({
        ...p,
        client_name: (p.contacts as any)?.name || 'Unknown',
        client_company: (p.contacts as any)?.company || '',
      })) || [];
      setProjects(projectsWithClient);
      setFilteredProjects(projectsWithClient);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting project",
        description: error.message,
      });
    } else {
      toast({ title: "Project deleted" });
      fetchProjects();
    }
  };

  const handleSaveProject = async (projectData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating project",
          description: error.message,
        });
        return;
      }
      toast({ title: "Project updated" });
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([{ ...projectData, created_by: session?.user.id }]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating project",
          description: error.message,
        });
        return;
      }
      toast({ title: "Project created" });
    }

    setIsModalOpen(false);
    fetchProjects();
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/crm">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Manage your consulting projects
            </p>
          </div>
          
          <Button onClick={handleAddProject}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ProjectsTable
          projects={filteredProjects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProject}
          project={editingProject}
        />
      </div>
    </div>
  );
};

export default Projects;
