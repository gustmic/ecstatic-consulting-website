import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudySpotlightProps {
  title: string;
  description: string;
  category: string;
  link: string;
  icon?: string;
}

const CaseStudySpotlight = ({ title, description, category, link, icon = "📊" }: CaseStudySpotlightProps) => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-4xl font-bold text-foreground text-center">
              Featured Success Story
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            See how we delivered measurable impact
          </p>

          <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border-2 hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-[200px,1fr] gap-0">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-8 md:p-12">
                <div className="text-7xl md:text-8xl opacity-30">
                  {icon}
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {category}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {description}
                </p>
                <Link to={link}>
                  <Button variant="default" className="group">
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySpotlight;
