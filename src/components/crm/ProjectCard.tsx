import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { formatCurrencySEK } from "@/lib/formatters";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    type: string;
    project_value_kr: number;
    probability_percent: number;
    primary_contact_name?: string;
    company_names?: string;
    days_in_stage: number;
  };
  onClick: () => void;
}

const TYPE_COLORS = {
  Assessment: "bg-blue-500",
  Pilot: "bg-green-500",
  Integration: "bg-purple-500",
} as const;

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const weightedValue = (project.project_value_kr * project.probability_percent) / 100;

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        className="p-4 cursor-pointer hover:shadow-lg transition-shadow mb-3"
        onClick={onClick}
      >
        <div className="flex items-start gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing mt-1"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-2 truncate">{project.name}</h3>
            
            <Badge className={`${TYPE_COLORS[project.type]} text-white mb-2`}>
              {project.type}
            </Badge>
            
            <div className="text-sm text-muted-foreground space-y-1">
              {project.primary_contact_name && (
                <div className="truncate">
                  <span className="font-medium">{project.primary_contact_name}</span>
                  {project.company_names && (
                    <span className="text-xs"> • {project.company_names}</span>
                  )}
                </div>
              )}
              
              <div>
                Value: {formatCurrencySEK(project.project_value_kr)}
              </div>
              
              <div>
                Weighted: {formatCurrencySEK(weightedValue)}
              </div>
              
              <div className="text-xs mt-2 text-muted-foreground">
                {project.days_in_stage} days in stage
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
