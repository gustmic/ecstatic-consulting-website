import { Check } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface RecognitionChecklistProps {
  items: string[];
}

export default function RecognitionChecklist({ items }: RecognitionChecklistProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div ref={sectionRef} className="space-y-4">
      {items.map((item, index) => (
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
  );
}
