import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnalyticsSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AnalyticsSection({
  title,
  icon,
  children,
  className,
}: AnalyticsSectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        {icon && <div className="text-2xl">{icon}</div>}
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
