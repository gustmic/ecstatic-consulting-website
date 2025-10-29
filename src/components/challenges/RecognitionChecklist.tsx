import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface RecognitionChecklistProps {
  items: string[];
  defaultVisible?: number;
}

export default function RecognitionChecklist({ items, defaultVisible = 3 }: RecognitionChecklistProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const displayedItems = expanded ? items : items.slice(0, defaultVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <div>
      <div ref={sectionRef} className="space-y-4 mb-6">
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 transition-all duration-500 ${
              visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
      
      {items.length > defaultVisible && (
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Visa färre
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              + Visa alla {items.length} igenkänningspunkter
            </>
          )}
        </Button>
      )}
    </div>
  );
}
