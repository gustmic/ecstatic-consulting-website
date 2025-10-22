import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dataImage from "@/assets/data-bg.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DataAnalytics = () => {
  const challenges = [
    "Overwhelming data volumes with limited actionable insights",
    "Disconnected data sources and siloed information",
    "Lack of predictive capabilities for strategic planning",
    "Inability to measure ROI on business initiatives",
  ];

  const solutions = [
    "Advanced analytics platforms with intuitive dashboards",
    "Unified data architecture and integration solutions",
    "Predictive modeling and AI-powered forecasting",
    "Custom KPI frameworks and performance tracking",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Sticky Banner */}
      <section className="sticky top-0 z-40 h-[25vh] md:h-[30vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${dataImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-accent/80" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6">
              Data Analytics
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/90">
              Transforming complexity into clarity through data-driven insights that empower smarter decisions
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6 text-center">
              Data Analytics Challenges
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Struggling to extract value from your data?
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
              Our Analytics Solutions
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Turn data into your competitive advantage
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {solutions.map((solution, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-card to-secondary/5 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-secondary mt-1" />
                    <p className="text-foreground font-medium">{solution}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border-2">
              <h3 className="font-serif text-2xl font-semibold mb-4">Our Analytics Approach</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong>Data Assessment</strong>
                    <p className="text-muted-foreground">Audit existing data infrastructure and identify optimization opportunities</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong>Platform Implementation</strong>
                    <p className="text-muted-foreground">Deploy scalable analytics solutions tailored to your business needs</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong>Continuous Optimization</strong>
                    <p className="text-muted-foreground">Ongoing refinement and training to maximize analytical capabilities</p>
                  </div>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-secondary to-accent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-6">
            Unlock the Power of Your Data
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/data-analytics/blog">
              <Button variant="secondary" size="lg">
                Read Insights <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/data-analytics/cases">
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-secondary">
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

export default DataAnalytics;
