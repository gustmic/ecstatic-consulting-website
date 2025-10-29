import { Card } from "@/components/ui/card";

interface Step {
  title: string;
  description: string;
  duration: string;
}

interface MethodologyRoadmapProps {
  steps: Step[];
}

export default function MethodologyRoadmap({ steps }: MethodologyRoadmapProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <Card className="p-6 h-full">
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
              <div className="text-xs font-medium text-primary">{step.duration}</div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
