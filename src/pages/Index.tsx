import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceCard from "@/components/ServiceCard";
import heroImage from "@/assets/hero-bg.jpg";
import strategyImage from "@/assets/strategy-bg.jpg";
import dataImage from "@/assets/data-bg.jpg";
import technologyImage from "@/assets/technology-bg.jpg";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/60" />
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Turning <span className="italic">Static</span> Challenges
            <br />
            into <span className="italic">Dynamic</span> Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto animate-slide-up">
            Empowering business growth through strategic insights, data analytics, and technology solutions
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="animate-scale-in text-lg px-8 py-6 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Services
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="animate-scale-in text-lg px-8 py-6 shadow-lg hover:shadow-xl bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.location.href = '/about'}
            >
              About Us
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 observe opacity-0">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider text-sm">Our Expertise</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Empowering Growth for Businesses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three core areas of excellence that drive sustainable competitive advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="observe opacity-0">
              <ServiceCard
                title="Strategic Consulting"
                description="Our strategic insights and plans pave the way for sustainable growth, market competitiveness, and optimal business performance."
                link="/strategy"
                image={strategyImage}
                delay={100}
              />
            </div>
            
            <div className="observe opacity-0">
              <ServiceCard
                title="Data Analytics"
                description="Our data-driven solutions transform complexity into clarity, empowering smarter decisions, operational efficiency, and measurable business impact."
                link="/data-analytics"
                image={dataImage}
                delay={200}
              />
            </div>
            
            <div className="observe opacity-0">
              <ServiceCard
                title="Technology"
                description="Cutting-edge technology solutions that streamline operations, enhance innovation, and position your business for digital transformation success."
                link="/technology"
                image={technologyImage}
                delay={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you turn your challenges into opportunities
          </p>
          <Link to="/about#contact">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
            >
              Book a Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 Ecstatic Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
