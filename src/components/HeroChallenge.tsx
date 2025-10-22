import { useState } from "react";
import { TrendingDown, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HeroChallengeProps {
  industry: string;
  problem: string;
  problemMetric: string;
  solution: string;
  results: {
    metric1: string;
    metric2: string;
    metric3: string;
  };
}

export const HeroChallenge = ({ 
  industry, 
  problem, 
  problemMetric,
  solution, 
  results 
}: HeroChallengeProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The Challenge</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A {industry} company's journey from struggle to success
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Problem State */}
            <Card 
              className={`p-8 transition-all duration-700 ${
                isRevealed ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-8 h-8 text-destructive animate-pulse" />
                  <h3 className="text-2xl font-bold text-destructive">The Problem</h3>
                </div>
                
                <p className="text-lg text-muted-foreground">{problem}</p>
                
                <div className="bg-destructive/10 rounded-lg p-6 border-l-4 border-destructive">
                  <p className="font-semibold text-destructive">{problemMetric}</p>
                </div>

                {/* Animated Chart Going Down */}
                <div className="relative h-32 bg-muted/50 rounded-lg overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <polyline
                      points="0,20 50,30 100,50 150,75 200,90"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Interactive Lightbulb */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div
                className="relative cursor-pointer transition-all duration-500"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setIsRevealed(true)}
              >
                <div className={`transition-all duration-500 ${
                  isHovering || isRevealed ? 'scale-110' : 'scale-100'
                }`}>
                  <Lightbulb 
                    className={`w-24 h-24 transition-all duration-500 ${
                      isHovering || isRevealed 
                        ? 'text-primary fill-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.6)]' 
                        : 'text-muted-foreground'
                    }`}
                  />
                </div>
                
                {(isHovering || isRevealed) && (
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
                      {isRevealed ? 'Solution Found!' : 'Click for Solution!'}
                    </span>
                  </div>
                )}
              </div>

              {!isRevealed && (
                <Button 
                  onClick={() => setIsRevealed(true)}
                  className="mt-8 group"
                  size="lg"
                >
                  Discover the Solution
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>

            {/* Solution State - Revealed on Click */}
            <Card 
              className={`md:col-span-2 p-8 transition-all duration-700 ${
                isRevealed 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 translate-y-8 hidden'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
                    <h3 className="text-2xl font-bold text-primary">The Solution</h3>
                  </div>
                  
                  <p className="text-lg font-semibold">{solution}</p>

                  {/* Animated Chart Going Up */}
                  <div className="relative h-32 bg-primary/5 rounded-lg overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <polyline
                        points="0,90 50,75 100,50 150,30 200,10"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold">The Results</h4>
                  <div className="space-y-3">
                    <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <p className="font-semibold">{results.metric1}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <p className="font-semibold">{results.metric2}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <p className="font-semibold">{results.metric3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
