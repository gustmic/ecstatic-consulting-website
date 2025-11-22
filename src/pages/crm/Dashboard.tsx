import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectModal from "@/components/crm/ProjectModal";
import { ProjectCard } from "@/components/crm/ProjectCard";
import { KanbanColumn } from "@/components/crm/KanbanColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface Project {
  id: string;
  name: string;
  client_name: string;
  type: string;
  pipeline_status: string;
  project_status: string | null;
  project_value_kr: number;
  probability_percent: number;
  primary_contact_id: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
  primary_contact_name?: string;
  company_names?: string;
  days_in_stage: number;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showLost, setShowLost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    filterProjects();
  }, [projects, searchQuery, typeFilter, showLost]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchProjects();
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        contacts!projects_primary_contact_id_fkey(name),
        project_companies(companies(name))
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const projectsWithDetails = data?.map(p => {
      const primaryContact = (p.contacts as any);
      const companies = (p.project_companies as any[]) || [];
      const companyNames = companies
        .map(pc => pc.companies?.name)
        .filter(Boolean)
        .join(", ");
      
      const daysInStage = Math.floor(
        (new Date().getTime() - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        ...p,
        primary_contact_name: primaryContact?.name,
        company_names: companyNames,
        days_in_stage: daysInStage,
      };
    }) || [];

    setProjects(projectsWithDetails);
  };

  const filterProjects = () => {
    let filtered = projects;

    if (!showLost) {
      filtered = filtered.filter(p => p.pipeline_status !== "Lost");
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.company_names?.toLowerCase().includes(query)
      );
    }

    setFilteredProjects(filtered);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const projectId = active.id as string;
    const newStatus = over.id as "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
    
    const project = projects.find(p => p.id === projectId);
    if (!project || project.pipeline_status === newStatus) return;

    // If dragging to Lost, confirm
    if (newStatus === "Lost") {
      const confirmed = confirm("Mark this project as Lost?");
      if (!confirmed) return;
    }

    // If dragging to Won, open modal to set project_status and dates
    if (newStatus === "Won") {
      // Pre-set pipeline_status to "Won" in the editing project
      const projectToEdit = { ...project, pipeline_status: "Won" };
      setEditingProject(projectToEdit);
      setIsModalOpen(true);
      return; // Don't update database yet, wait for modal save
    }

    // For other statuses, update immediately
    const { error } = await supabase
      .from("projects")
      .update({ pipeline_status: newStatus })
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Project updated" });
    fetchProjects();
  };

  const handleSaveProject = async (formData: any) => {
    const { data: { user } } = await supabase.auth.getUser();

    const projectData = {
      name: formData.name,
      client_name: formData.client_name || formData.name,
      type: formData.type,
      pipeline_status: formData.pipeline_status,
      project_status: formData.project_status,
      primary_contact_id: formData.primary_contact_id,
      project_value_kr: formData.project_value_kr,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      notes: formData.notes || null,
      created_by: user?.id,
    };

    if (editingProject) {
      // Update project
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (error) {
        toast({
          title: "Error updating project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Update companies
      await supabase
        .from("project_companies")
        .delete()
        .eq("project_id", editingProject.id);

      if (formData.company_ids.length > 0) {
        await supabase
          .from("project_companies")
          .insert(formData.company_ids.map((cid: string) => ({
            project_id: editingProject.id,
            company_id: cid,
          })));
      }

      // Update related contacts
      await supabase
        .from("project_contacts")
        .delete()
        .eq("project_id", editingProject.id);

      if (formData.related_contact_ids.length > 0) {
        await supabase
          .from("project_contacts")
          .insert(formData.related_contact_ids.map((cid: string) => ({
            project_id: editingProject.id,
            contact_id: cid,
          })));
      }

      toast({ title: "Project updated" });
    } else {
      // Create project
      const { data: newProject, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error creating project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Add companies
      if (formData.company_ids.length > 0) {
        await supabase
          .from("project_companies")
          .insert(formData.company_ids.map((cid: string) => ({
            project_id: newProject.id,
            company_id: cid,
          })));
      }

      // Add related contacts
      if (formData.related_contact_ids.length > 0) {
        await supabase
          .from("project_contacts")
          .insert(formData.related_contact_ids.map((cid: string) => ({
            project_id: newProject.id,
            contact_id: cid,
          })));
      }

      toast({ title: "Project created" });
    }

    setIsModalOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  const groupedProjects = {
    "Meeting Booked": filteredProjects.filter(p => p.pipeline_status === "Meeting Booked"),
    "Proposal Sent": filteredProjects.filter(p => p.pipeline_status === "Proposal Sent"),
    "Won": filteredProjects.filter(p => p.pipeline_status === "Won"),
    "Lost": filteredProjects.filter(p => p.pipeline_status === "Lost"),
  };

  const activeProject = activeId ? projects.find(p => p.id === activeId) : null;

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Projects Pipeline</h1>
          <Button onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Assessment">Assessment</SelectItem>
              <SelectItem value="Pilot">Pilot</SelectItem>
              <SelectItem value="Integration">Integration</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showLost ? "default" : "outline"}
            onClick={() => setShowLost(!showLost)}
          >
            {showLost ? "Hide" : "Show"} Lost
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-4 gap-6">
            {Object.entries(groupedProjects).map(([status, projects]) => (
              <KanbanColumn
                key={status}
                id={status}
                title={status}
                count={projects.length}
              >
                <SortableContext
                  items={projects.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => {
                        setEditingProject(project);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </SortableContext>
              </KanbanColumn>
            ))}
          </div>

          <DragOverlay>
            {activeProject && (
              <ProjectCard
                project={activeProject}
                onClick={() => {}}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
};

export default Dashboard;
