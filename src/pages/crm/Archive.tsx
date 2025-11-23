import { useState } from "react";
import { CRMNav } from "@/components/crm/CRMNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { formatCurrencySEK, formatDate } from "@/lib/formatters";

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
}

const Archive = () => {
  const { toast } = useToast();
  const [lostProjects, setLostProjects] = useState<Project[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<string>("Meeting Booked");

  useEffect(() => {
    fetchArchivedProjects();
  }, []);

  const fetchArchivedProjects = async () => {
    const { data: lost } = await supabase
      .from("projects")
      .select("*")
      .eq("pipeline_status", "Lost")
      .order("updated_at", { ascending: false });

    const { data: completed } = await supabase
      .from("projects")
      .select("*")
      .eq("project_status", "Completed")
      .order("updated_at", { ascending: false });

    if (lost) setLostProjects(lost);
    if (completed) setCompletedProjects(completed);
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
      fetchArchivedProjects();
    }
  };

  const handleReopen = async (project: Project) => {
    const { error } = await supabase
      .from("projects")
      .update({ project_status: "Ongoing" })
      .eq("id", project.id);

    if (error) {
      toast({
        title: "Error reopening project",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Project reopened successfully" });
      fetchArchivedProjects();
    }
  };

  return (
    <>
      <CRMNav />
      <div className="container mx-auto px-6 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-6">Archived Projects</h1>

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
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Lost Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lostProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No lost projects
                      </TableCell>
                    </TableRow>
                  ) : (
                    lostProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>{project.client_name}</TableCell>
                        <TableCell>{formatCurrencySEK(project.project_value_kr)}</TableCell>
                        <TableCell>{formatDate(project.updated_at)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project);
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
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No completed projects
                      </TableCell>
                    </TableRow>
                  ) : (
                    completedProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.type}</TableCell>
                        <TableCell>{project.client_name}</TableCell>
                        <TableCell>{formatCurrencySEK(project.project_value_kr)}</TableCell>
                        <TableCell>{project.start_date ? formatDate(project.start_date) : "-"}</TableCell>
                        <TableCell>{project.end_date ? formatDate(project.end_date) : "-"}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReopen(project)}
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

      <Dialog open={restoreModalOpen} onOpenChange={setRestoreModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Project</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Restore "{selectedProject?.name}" to which pipeline status?
            </p>
            
            <div>
              <Label htmlFor="restore_status">Pipeline Status</Label>
              <Select value={restoreStatus} onValueChange={setRestoreStatus}>
                <SelectTrigger>
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
    </>
  );
};

export default Archive;
