import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";
import ProfitabilityPattern from "./patterns/ProfitabilityPattern";
import GrowthPattern from "./patterns/GrowthPattern";
import EfficiencyPattern from "./patterns/EfficiencyPattern";

interface HeroImageCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  profile: string;
  link: string;
  category: 'profitability' | 'growth' | 'efficiency';
}

export default function HeroImageCard({ 
  icon: Icon, 
  title, 
  description, 
  profile, 
  link, 
  category 
}: HeroImageCardProps) {
  
  const categoryColors = {
    profitability: {
      gradient: "from-[#2D7A4F]/90 to-[#1e5234]/60",
      hoverGradient: "group-hover:from-[#2D7A4F]/95 group-hover:to-[#1e5234]/70",
      text: "text-[#2D7A4F]"
    },
    growth: {
      gradient: "from-[#2B4C7E]/90 to-[#1a2f4d]/60",
      hoverGradient: "group-hover:from-[#2B4C7E]/95 group-hover:to-[#1a2f4d]/70",
      text: "text-[#2B4C7E]"
    },
    efficiency: {
      gradient: "from-[#E67E50]/90 to-[#c25a35]/60",
      hoverGradient: "group-hover:from-[#E67E50]/95 group-hover:to-[#c25a35]/70",
      text: "text-[#E67E50]"
    }
  };

  const colors = categoryColors[category];

  return (
    <Link to={link} className="group block h-full">
      <div className="relative overflow-hidden rounded-lg h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-card border">
        
        {/* Background Pattern Layer */}
        <div className="absolute inset-0 bg-gradient-to-br transition-all duration-300" style={{
          background: `linear-gradient(to bottom right, ${category === 'profitability' ? 'rgba(45, 122, 79, 0.9)' : category === 'growth' ? 'rgba(43, 76, 126, 0.9)' : 'rgba(230, 126, 80, 0.9)'} 0%, ${category === 'profitability' ? 'rgba(30, 82, 52, 0.6)' : category === 'growth' ? 'rgba(26, 47, 77, 0.6)' : 'rgba(194, 90, 53, 0.6)'} 100%)`
        }}>
          <div className="absolute inset-0 opacity-15 transition-transform duration-500 group-hover:scale-105">
            {category === 'profitability' && <ProfitabilityPattern />}
            {category === 'growth' && <GrowthPattern />}
            {category === 'efficiency' && <EfficiencyPattern />}
          </div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
          
          {/* Top Section */}
          <div>
            <Icon className="w-10 h-10 mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-white/90 leading-relaxed mb-4">
              {description}
            </p>
          </div>

          {/* Bottom Section */}
          <div>
            <p className="text-sm text-white/70 mb-3">
              {profile}
            </p>
            <div className="flex items-center text-sm font-medium text-white">
              Läs mer
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}
