import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import strategyImage from "@/assets/strategy-bg.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Strategy = () => {
  const challenges = [
    "Uncertain market positioning and competitive differentiation",
    "Unclear growth strategy and market expansion opportunities",
    "Inefficient resource allocation and organizational structure",
    "Lack of strategic alignment across departments",
  ];

  const solutions = [
    "Comprehensive market analysis and competitive positioning",
    "Data-driven growth strategies and expansion roadmaps",
    "Organizational optimization and resource planning",
    "Strategic framework implementation and alignment",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Sticky Banner */}
      <section className="sticky top-0 z-40 h-[25vh] md:h-[30vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${strategyImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 to-secondary/70" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6">
              Strategic Consulting
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/90">
              Paving the way for sustainable growth, market competitiveness, and optimal business performance
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6 text-center">
              Common Strategic Challenges
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Does your organization face any of these obstacles?
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <p className="text-foreground">{challenge}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6 text-center">
              Our Strategic Solutions
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Proven methodologies that deliver measurable results
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {solutions.map((solution, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-accent mt-1" />
                    <p className="text-foreground font-medium">{solution}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Proven Process</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong>Discovery & Analysis</strong>
                    <p className="text-muted-foreground">Deep dive into your business model, market position, and competitive landscape</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong>Strategy Development</strong>
                    <p className="text-muted-foreground">Craft tailored strategies aligned with your vision and market opportunities</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong>Implementation Support</strong>
                    <p className="text-muted-foreground">Guide execution with actionable roadmaps and ongoing partnership</p>
                  </div>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-6">
            Ready to Chart Your Strategic Course?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/strategy/blog">
              <Button variant="secondary" size="lg">
                Read Insights <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/strategy/cases">
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Case Studies
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.location.href = '/about#contact'}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Strategy;
