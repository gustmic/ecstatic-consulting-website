import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import technologyImage from "@/assets/technology-bg.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import { HeroChallenge } from "@/components/HeroChallenge";

const Technology = () => {
  const solutions = [
    "Modern cloud infrastructure and migration strategies",
    "Enterprise integration and API development",
    "Comprehensive security frameworks and compliance",
    "IT optimization and automation solutions",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Sticky Banner */}
      <section className="sticky top-0 z-40 h-[25vh] md:h-[30vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${technologyImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/90 to-primary/70" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6">
              Technology Solutions
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/90">
              Cutting-edge technology that streamlines operations and positions your business for digital success
            </p>
          </div>
        </div>
      </section>

      {/* Hero Challenge Section */}
      <HeroChallenge
        industry="retail"
        problem="This retail chain was drowning in legacy point-of-sale systems and disconnected inventory management. Customer data was scattered across 15 different systems, making personalization impossible and causing massive inefficiencies."
        problemMetric="15 disconnected systems | 48-hour inventory sync delays | 0% omnichannel capability"
        solution="Unified Technology Ecosystem - We designed and implemented a cloud-based integrated platform that connected all systems, enabled real-time inventory management, and created a single customer view."
        results={{
          metric1: "Real-time inventory visibility across 200+ locations",
          metric2: "Customer satisfaction increased by 45%",
          metric3: "Operational costs reduced by 32% while sales grew 28%"
        }}
      />

      {/* Case Study Spotlight */}
      <CaseStudySpotlight
        title="Critical System Performance Issue Resolution"
        description="Diagnosed and resolved performance bottleneck affecting 10,000+ users, restoring system performance to optimal levels within 48 hours."
        category="Troubleshooting"
        link="/technology/cases"
        icon="🔧"
      />

      {/* Solution Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6 text-center">
              Our Technology Solutions
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Future-proof your business with modern technology
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

            <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2">
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Technology Methodology</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong>Technology Audit</strong>
                    <p className="text-muted-foreground">Comprehensive evaluation of current infrastructure and digital capabilities</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong>Solution Design</strong>
                    <p className="text-muted-foreground">Architecture planning aligned with business objectives and scalability needs</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong>Seamless Deployment</strong>
                    <p className="text-muted-foreground">Phased implementation with minimal disruption and comprehensive training</p>
                  </div>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-accent to-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-6">
            Transform Your Technology Infrastructure
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/technology/blog">
              <Button variant="secondary" size="lg">
                Read Insights <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/technology/cases">
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent">
                View Case Studies
              </Button>
            </Link>
            <Link to="/about#contact">
              <Button size="lg" variant="secondary">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
