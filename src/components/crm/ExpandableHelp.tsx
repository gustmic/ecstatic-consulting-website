import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpandableHelpProps {
  title: string;
  children: React.ReactNode;
}

export function ExpandableHelp({ title, children }: ExpandableHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l-2 border-accent/30 pl-4 mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        <Lightbulb className="h-4 w-4 mr-2" />
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-2" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-2" />
        )}
      </Button>
      
      {isOpen && (
        <div className="mt-3 text-sm text-muted-foreground space-y-2 bg-accent/5 p-4 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
}
