import { Card } from "@/components/ui/card";
import { Target, BarChart3, CheckCircle } from "lucide-react";

interface Step {
  title: string;
  description: string;
  duration: string;
  deliverable: string;
}

interface MethodologyRoadmapProps {
  steps: Step[];
}

export default function MethodologyRoadmap({ steps }: MethodologyRoadmapProps) {
  const icons = [Target, BarChart3, CheckCircle];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => {
        const IconComponent = icons[index];
        return (
          <div key={index} className="relative">
            <Card className="p-6 h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                  <h4 className="font-semibold text-lg text-foreground">{step.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                <div className="text-xs font-medium text-primary mb-3">{step.duration}</div>
                <div className="bg-primary/5 border-l-2 border-primary rounded px-3 py-2">
                  <p className="text-xs font-medium text-foreground">
                    <span className="text-primary">→</span> {step.deliverable}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
