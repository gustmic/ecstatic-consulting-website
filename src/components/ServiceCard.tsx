import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
  delay?: number;
}

const ServiceCard = ({ title, description, link, image, delay = 0 }: ServiceCardProps) => {
  return (
    <Link to={link} className="group block">
      <Card 
        className="overflow-hidden h-full transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-2"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-6">
          <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
            Explore More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
