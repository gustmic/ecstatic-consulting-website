import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StatCardProps {
  stat: string;
  description: string;
  tooltip?: string;
}

export default function StatCard({ stat, description, tooltip }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`p-6 text-center flex flex-col justify-center transition-all duration-500 relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-4xl font-bold mb-3" style={{ color: "#2B4C7E" }}>
        {stat}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Card>
  );
}
