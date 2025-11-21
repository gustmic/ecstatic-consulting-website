import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  type: "Assessment" | "Pilot" | "Integration";
  pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
  project_status: "Planned" | "Ongoing" | "Completed" | null;
  project_value_kr: number;
  probability_percent: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLost, setShowLost] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/admin");
      return;
    }

    fetchProjects();
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (!showLost && p.pipeline_status === "Lost") return false;
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const groupedByStatus = {
    "Meeting Booked": filteredProjects.filter(
      (p) => p.pipeline_status === "Meeting Booked"
    ),
    "Proposal Sent": filteredProjects.filter(
      (p) => p.pipeline_status === "Proposal Sent"
    ),
    Won: filteredProjects.filter((p) => p.pipeline_status === "Won"),
    Lost: filteredProjects.filter((p) => p.pipeline_status === "Lost"),
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Assessment":
        return "bg-blue-500";
      case "Pilot":
        return "bg-green-500";
      case "Integration":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Projects Pipeline</h1>
          <Button onClick={() => navigate("/admin/crm/projects/new")}>
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

        {/* Kanban View */}
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(groupedByStatus).map(([status, projects]) => (
            <div key={status}>
              <h2 className="font-semibold text-lg mb-4">
                {status} ({projects.length})
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">{project.name}</h3>
                    <Badge className={getTypeBadgeColor(project.type)}>
                      {project.type}
                    </Badge>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <div>
                        Value: {project.project_value_kr.toLocaleString()} kr
                      </div>
                      <div>
                        Weighted:{" "}
                        {(
                          (project.project_value_kr *
                            project.probability_percent) /
                          100
                        ).toLocaleString()}{" "}
                        kr
                      </div>
                      {project.start_date && (
                        <div className="mt-2 text-xs">
                          Days in stage:{" "}
                          {Math.floor(
                            (new Date().getTime() -
                              new Date(project.created_at).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
