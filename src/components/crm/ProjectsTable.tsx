import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/formatters";

interface Project {
  id: string;
  name: string;
  client_name: string;
  client_company?: string;
  type: string;
  start_date: string;
  end_date: string;
  status: string;
  project_value_kr: number;
}

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectsTable = ({ projects, onEdit, onDelete }: ProjectsTableProps) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Planned: "bg-gray-500",
      Ongoing: "bg-blue-500",
      Completed: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Strategy: "bg-purple-500",
      Technical: "bg-blue-500",
      "Data Analytics": "bg-green-500",
    };
    return colors[type] || "bg-gray-500";
  };

  if (projects.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No projects found</p>
        <p className="text-sm text-muted-foreground">Start by adding your first project</p>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{project.client_name}</p>
                  {project.client_company && (
                    <p className="text-xs text-muted-foreground">{project.client_company}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getTypeColor(project.type)} variant="default">
                  {project.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(project.status)} variant="default">
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(project.start_date)}</TableCell>
              <TableCell>{formatDate(project.end_date)}</TableCell>
              <TableCell className="font-medium">{formatCurrency(project.project_value_kr)}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProjectsTable;
