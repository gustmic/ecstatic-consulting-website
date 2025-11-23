import { useState, useEffect } from "react";
import { CRMNav } from "@/components/crm/CRMNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatCurrencySEK, formatDate } from "@/lib/formatters";
import { Search } from "lucide-react";

interface Project {
  id: string;
  name: string;
  type: string;
  client_name: string;
  project_value_kr: number;
  pipeline_status: string;
  project_status: string | null;
  start_date: string | null;
  end_date: string | null;
  updated_at: string;
  primary_contact_id: string | null;
  contacts?: {
    name: string;
  };
}

const Archive = () => {
  const { toast } = useToast();
  const [lostProjects, setLostProjects] = useState<Project[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [filteredLost, setFilteredLost] = useState<Project[]>([]);
  const [filteredCompleted, setFilteredCompleted] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [reopenModalOpen, setReopenModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<string>("Meeting Booked");

  useEffect(() => {
    fetchArchivedProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchQuery, lostProjects, completedProjects]);

  const fetchArchivedProjects = async () => {
    const { data: lost } = await supabase
      .from("projects")
      .select("*, contacts(name)")
      .eq("pipeline_status", "Lost")
      .order("updated_at", { ascending: false });

    const { data: completed } = await supabase
      .from("projects")
      .select("*, contacts(name)")
      .eq("project_status", "Completed")
      .order("updated_at", { ascending: false });

    if (lost) setLostProjects(lost);
    if (completed) setCompletedProjects(completed);
  };

  const filterProjects = () => {
    const query = searchQuery.toLowerCase();
    
    const filteredLostList = lostProjects.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.client_name.toLowerCase().includes(query) ||
      (p.contacts?.name || "").toLowerCase().includes(query)
    );
    
    const filteredCompletedList = completedProjects.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.client_name.toLowerCase().includes(query) ||
      (p.contacts?.name || "").toLowerCase().includes(query)
    );
    
    setFilteredLost(filteredLostList);
    setFilteredCompleted(filteredCompletedList);
  };

  const handleRestore = async () => {
    if (!selectedProject) return;

    const { error } = await supabase
      .from("projects")
      .update({ pipeline_status: restoreStatus })
      .eq("id", selectedProject.id);

    if (error) {
      toast({
        title: "Error restoring project",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Project restored successfully" });
      setRestoreModalOpen(false);
      setSelectedProject(null);
      fetchArchivedProjects();
    }
  };

  const handleReopen = async () => {
    if (!selectedProject) return;

    const { error } = await supabase
      .from("projects")
      .update({ project_status: "Ongoing" })
      .eq("id", selectedProject.id);

    if (error) {
      toast({
        title: "Error reopening project",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Project reopened successfully" });
      setReopenModalOpen(false);
      setSelectedProject(null);
      fetchArchivedProjects();
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Assessment":
        return "secondary";
      case "Pilot":
        return "default";
      case "Integration":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <CRMNav />
      <div className="container mx-auto px-6 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-6">Archived Projects</h1>

        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="lost" className="w-full">
          <TabsList>
            <TabsTrigger value="lost">Lost Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="lost" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Date Lost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLost.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        {searchQuery ? "No projects match your search" : "No lost projects. Great work!"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLost.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadgeVariant(project.type)}>
                            {project.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.contacts?.name || "-"}</TableCell>
                        <TableCell>{project.client_name}</TableCell>
                        <TableCell>{formatCurrencySEK(project.project_value_kr)}</TableCell>
                        <TableCell>{formatDate(project.updated_at)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project);
                              setRestoreStatus("Meeting Booked");
                              setRestoreModalOpen(true);
                            }}
                          >
                            Restore
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompleted.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        {searchQuery ? "No projects match your search" : "No completed projects yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCompleted.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadgeVariant(project.type)}>
                            {project.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.contacts?.name || "-"}</TableCell>
                        <TableCell>{project.client_name}</TableCell>
                        <TableCell>{formatCurrencySEK(project.project_value_kr)}</TableCell>
                        <TableCell>{project.start_date ? formatDate(project.start_date) : "-"}</TableCell>
                        <TableCell>{project.end_date ? formatDate(project.end_date) : "-"}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project);
                              setReopenModalOpen(true);
                            }}
                          >
                            Reopen
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Restore Modal */}
      <Dialog open={restoreModalOpen} onOpenChange={setRestoreModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore {selectedProject?.name}?</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="restore_status">Restore to status:</Label>
              <Select value={restoreStatus} onValueChange={setRestoreStatus}>
                <SelectTrigger id="restore_status" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting Booked">Meeting Booked</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRestoreModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRestore}>
              Restore
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reopen Modal */}
      <Dialog open={reopenModalOpen} onOpenChange={setReopenModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reopen {selectedProject?.name}?</DialogTitle>
            <DialogDescription>
              This will set the project status back to Ongoing.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReopenModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReopen}>
              Reopen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Archive;
