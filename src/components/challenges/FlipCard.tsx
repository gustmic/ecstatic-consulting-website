import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  profile: string;
  link: string;
  category: "strategi" | "teknik" | "data";
}

const categoryColors = {
  strategi: "#2B4C7E",
  teknik: "#E67E50",
  data: "#4A9B8E",
};

export default function FlipCard({ icon: Icon, title, description, profile, link, category }: FlipCardProps) {
  return (
    <Link to={link} className="group block h-full">
      <Card className="p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-t-4" style={{ borderTopColor: categoryColors[category] }}>
        <div>
          <div className="mb-4">
            <Icon className="h-8 w-8" style={{ color: categoryColors[category] }} />
          </div>
          <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
            {profile}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium mt-6 group-hover:gap-3 transition-all" style={{ color: categoryColors[category] }}>
          Läs mer
          <ArrowRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
