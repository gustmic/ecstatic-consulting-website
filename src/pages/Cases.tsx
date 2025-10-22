import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import strategyImage from "@/assets/strategy-bg.jpg";
import dataImage from "@/assets/data-bg.jpg";
import technologyImage from "@/assets/technology-bg.jpg";

interface CaseStudy {
  title: string;
  description: string;
  category: string;
  image?: string;
  featured?: boolean;
}

const caseStudies: Record<string, { title: string; categories: { name: string; cases: CaseStudy[] }[] }> = {
  strategy: {
    title: "Strategic Consulting Case Studies",
    categories: [
      {
        name: "Competitive Analysis",
        cases: [
          {
            title: "Market Position Assessment for Tech Startup",
            description: "Comprehensive competitive analysis revealing key market gaps and strategic positioning opportunities, leading to 40% market share growth.",
            category: "Competitive Analysis",
            featured: true,
          },
          {
            title: "Industry Landscape Mapping for Healthcare Provider",
            description: "In-depth competitive intelligence study identifying emerging threats and opportunities in the healthcare sector.",
            category: "Competitive Analysis",
          },
        ],
      },
      {
        name: "Strategy Development",
        cases: [
          {
            title: "Five-Year Growth Strategy for Manufacturing Firm",
            description: "Developed comprehensive strategic roadmap addressing market expansion, operational efficiency, and digital transformation.",
            category: "Strategy Development",
          },
          {
            title: "Digital Transformation Strategy for Retail Chain",
            description: "Created omnichannel strategy integrating online and offline operations, resulting in 60% increase in customer engagement.",
            category: "Strategy Development",
          },
        ],
      },
      {
        name: "Market Expansion",
        cases: [
          {
            title: "International Market Entry for SaaS Company",
            description: "Guided successful expansion into three new European markets, establishing local partnerships and go-to-market strategies.",
            category: "Market Expansion",
          },
          {
            title: "New Product Line Launch Strategy",
            description: "Developed market entry strategy for innovative product line, achieving $5M in first-year revenue.",
            category: "Market Expansion",
          },
        ],
      },
    ],
  },
  "data-analytics": {
    title: "Data Analytics Case Studies",
    categories: [
      {
        name: "Predictive Analysis",
        cases: [
          {
            title: "Customer Churn Prediction Model",
            description: "Developed machine learning model predicting customer churn with 85% accuracy, enabling proactive retention strategies.",
            category: "Predictive Analysis",
            featured: true,
          },
          {
            title: "Sales Forecasting System for Retail",
            description: "Implemented predictive analytics solution improving sales forecast accuracy by 45% and optimizing inventory management.",
            category: "Predictive Analysis",
          },
        ],
      },
      {
        name: "Big Data",
        cases: [
          {
            title: "Enterprise Data Lake Implementation",
            description: "Designed and deployed scalable data lake infrastructure processing 10TB+ daily, enabling advanced analytics capabilities.",
            category: "Big Data",
          },
          {
            title: "Real-time Analytics Platform for E-commerce",
            description: "Built high-performance analytics platform processing millions of transactions, providing instant business insights.",
            category: "Big Data",
          },
        ],
      },
      {
        name: "Data Visualization",
        cases: [
          {
            title: "Executive Dashboard for Financial Services",
            description: "Created interactive executive dashboard consolidating data from 15+ sources, enabling data-driven decision making at C-level.",
            category: "Data Visualization",
          },
          {
            title: "Operational KPI Dashboard for Manufacturing",
            description: "Developed real-time operational dashboard tracking 50+ KPIs, reducing reporting time by 80%.",
            category: "Data Visualization",
          },
        ],
      },
      {
        name: "Data Analysis",
        cases: [
          {
            title: "Customer Behavior Analysis for Subscription Service",
            description: "Conducted comprehensive analysis revealing key usage patterns and optimization opportunities, increasing retention by 30%.",
            category: "Data Analysis",
          },
          {
            title: "Supply Chain Optimization Study",
            description: "Analyzed logistics and supply chain data identifying $2M in annual cost savings opportunities.",
            category: "Data Analysis",
          },
        ],
      },
    ],
  },
  technology: {
    title: "Technology Solutions Case Studies",
    categories: [
      {
        name: "Troubleshooting",
        cases: [
          {
            title: "Critical System Performance Issue Resolution",
            description: "Diagnosed and resolved performance bottleneck affecting 10,000+ users, restoring system performance to optimal levels within 48 hours.",
            category: "Troubleshooting",
            featured: true,
          },
          {
            title: "Cloud Infrastructure Stability Enhancement",
            description: "Identified and fixed critical infrastructure issues causing intermittent outages, achieving 99.9% uptime.",
            category: "Troubleshooting",
          },
        ],
      },
      {
        name: "Electrostatics",
        cases: [
          {
            title: "Electrostatic Discharge Prevention in Manufacturing",
            description: "Implemented comprehensive ESD protection strategy reducing product defects by 75% in electronics manufacturing.",
            category: "Electrostatics",
          },
          {
            title: "Static Control for Pharmaceutical Production",
            description: "Designed and deployed static control solutions ensuring product quality and regulatory compliance.",
            category: "Electrostatics",
          },
        ],
      },
      {
        name: "Feasibility Studies",
        cases: [
          {
            title: "Cloud Migration Feasibility Assessment",
            description: "Comprehensive technical and financial analysis of cloud migration options, resulting in successful $3M infrastructure modernization.",
            category: "Feasibility Studies",
          },
          {
            title: "IoT Implementation Viability Study",
            description: "Evaluated technical feasibility and ROI for IoT sensor network deployment across manufacturing facilities.",
            category: "Feasibility Studies",
          },
        ],
      },
      {
        name: "Product Design and Development",
        cases: [
          {
            title: "Mobile App Development for Healthcare Provider",
            description: "Designed and developed patient engagement app serving 50,000+ users, improving patient satisfaction scores by 40%.",
            category: "Product Design and Development",
          },
          {
            title: "Custom ERP Solution for Distribution Company",
            description: "Architected and built tailored ERP system streamlining operations across 12 distribution centers.",
            category: "Product Design and Development",
          },
        ],
      },
      {
        name: "Courses, Lectures & Inhouse Training",
        cases: [
          {
            title: "Technical Leadership Training Program",
            description: "Developed and delivered comprehensive training program for 50+ technical leaders, improving team performance metrics by 35%.",
            category: "Courses, Lectures & Inhouse Training",
          },
          {
            title: "Data Analytics Workshop Series",
            description: "Created and conducted hands-on workshop series training 100+ employees in modern analytics tools and techniques.",
            category: "Courses, Lectures & Inhouse Training",
          },
        ],
      },
    ],
  },
};

const Cases = () => {
  const { category } = useParams<{ category: string }>();
  const categoryData = category ? caseStudies[category] : null;
  
  const bannerImages: Record<string, string> = {
    strategy: strategyImage,
    "data-analytics": dataImage,
    technology: technologyImage,
  };
  
  const bannerImage = category ? bannerImages[category] : undefined;

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Category not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Static Banner */}
      <section className="relative h-[25vh] md:h-[30vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={bannerImage ? {
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : {}}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 to-secondary/70" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6">
              {categoryData.title}
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/90">
              Real-world examples of our expertise in action
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 px-6 bg-muted/30 sticky top-[73px] z-40 border-b border-border">
        <div className="container mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">View by category:</p>
          <div className="flex flex-wrap gap-3">
            {categoryData.categories.map((cat) => (
              <Button
                key={cat.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  const element = document.getElementById(cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies by Category */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl space-y-20">
          {categoryData.categories.map((categorySection) => (
            <div key={categorySection.name} id={categorySection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10 pb-4 border-b border-border">
                {categorySection.name}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categorySection.cases.map((caseStudy, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                        {categorySection.name === "Predictive Analysis" && "📊"}
                        {categorySection.name === "Big Data" && "🗄️"}
                        {categorySection.name === "Data Visualization" && "📈"}
                        {categorySection.name === "Data Analysis" && "🔍"}
                        {categorySection.name === "Competitive Analysis" && "🎯"}
                        {categorySection.name === "Strategy Development" && "📋"}
                        {categorySection.name === "Market Expansion" && "🌍"}
                        {categorySection.name === "Troubleshooting" && "🔧"}
                        {categorySection.name === "Electrostatics" && "⚡"}
                        {categorySection.name === "Feasibility Studies" && "📐"}
                        {categorySection.name === "Product Design and Development" && "💡"}
                        {categorySection.name === "Courses, Lectures & Inhouse Training" && "🎓"}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {caseStudy.description}
                      </p>
                      <div className="text-primary text-sm font-medium group-hover:underline">
                        View Case →
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can help transform your business challenges into opportunities.
          </p>
          <Link to="/about#contact">
            <Button size="lg">Book a Consultation</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Ecstatic Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cases;
