import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface RelatedChallengeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'profitability' | 'growth' | 'efficiency';
  path: string;
}

export default function RelatedChallengeCard({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  path 
}: RelatedChallengeCardProps) {
  
  const categoryColors = {
    profitability: "#2D7A4F",
    growth: "#2B4C7E",
    efficiency: "#E67E50"
  };

  const color = categoryColors[category];

  return (
    <Link to={path}>
      <div 
        className="group p-6 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg bg-muted/30"
        style={{ 
          borderColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'transparent';
        }}
      >
        <Icon className="w-8 h-8 mb-3" style={{ color }} />
        
        <h3 
          className="font-semibold text-lg mb-2 transition-colors"
          style={{ color: 'inherit' }}
          onMouseEnter={(e) => {
            (e.currentTarget.parentElement as HTMLElement).style.color = color;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget.parentElement as HTMLElement).style.color = '';
          }}
        >
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-medium" style={{ color }}>
          Läs mer
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
