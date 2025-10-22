import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dataImage from "@/assets/data-bg.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";
import { HeroChallenge } from "@/components/HeroChallenge";

const DataAnalytics = () => {
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

      {/* Hero Challenge Section */}
      <HeroChallenge
        industry="healthcare provider"
        problem="A regional healthcare network was making critical decisions based on 60-90 day old data. Patient outcomes were suffering, resources were being misallocated, and they had no way to predict capacity needs or identify at-risk patients early."
        problemMetric="60-90 day data lag | No predictive capabilities | 23% readmission rate"
        solution="Predictive Analytics Platform - We built a real-time analytics system with AI-powered predictive models that transformed their data from historical reports into actionable intelligence for proactive care."
        results={{
          metric1: "Real-time dashboards enabling same-day decision making",
          metric2: "Readmission rate reduced from 23% to 11%",
          metric3: "Early intervention increased patient outcomes by 34% while reducing costs by $8.2M annually"
        }}
      />

      {/* Case Study Spotlight */}
      <CaseStudySpotlight
        title="Customer Churn Prediction Model"
        description="Developed machine learning model predicting customer churn with 85% accuracy, enabling proactive retention strategies."
        category="Predictive Analysis"
        link="/data-analytics/cases"
        icon="📊"
      />

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

      {/* Testimonials Carousel */}
      <TestimonialsCarousel serviceArea="Data Analytics" />

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

export default DataAnalytics;
