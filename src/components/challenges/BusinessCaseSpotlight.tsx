import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp, Search, Settings } from "lucide-react";
import { useState } from "react";

interface BusinessCaseSpotlightProps {
  company: string;
  challenge: string;
  approach?: string;
  results: string[];
  quote: string;
  discovery?: string;
  detailedApproach?: string;
  secondaryInsight?: string;
  categoryColor?: string;
}

export default function BusinessCaseSpotlight({
  company,
  challenge,
  approach,
  results,
  quote,
  discovery,
  detailedApproach,
  secondaryInsight,
  categoryColor = "#2B4C7E",
}: BusinessCaseSpotlightProps) {
  const [expanded, setExpanded] = useState(false);
  
  const hasExpandableContent = discovery || detailedApproach || secondaryInsight;
  
  return (
    <Card className="p-8 bg-gradient-to-br from-muted/30 to-background border-l-4" style={{ borderLeftColor: categoryColor }}>
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <div className="inline-block px-4 py-2 bg-muted rounded-full text-sm font-medium mb-4">
            {company}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Problem
              </h4>
              <p className="text-foreground leading-relaxed">{challenge}</p>
            </div>
            {approach && (
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Tillvägagångssätt
                </h4>
                <p className="text-foreground leading-relaxed">{approach}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Resultat
            </h4>
            <ul className="space-y-3">
              {results.map((result, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: categoryColor }} />
                  <span className="text-foreground leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t">
            <blockquote className="italic text-muted-foreground border-l-2 pl-4" style={{ borderLeftColor: categoryColor }}>
              "{quote}"
            </blockquote>
          </div>
        </div>
      </div>
      
      {hasExpandableContent && (
        <>
          <Button 
            variant="outline" 
            onClick={() => setExpanded(!expanded)}
            className="w-full"
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Visa mindre
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Läs hela caset
              </>
            )}
          </Button>
          
          {expanded && (
            <div className="mt-6 space-y-6 border-t pt-6">
              {discovery && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5" style={{ color: categoryColor }} />
                    Upptäckt
                  </h4>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {discovery}
                  </p>
                </div>
              )}
              
              {detailedApproach && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" style={{ color: categoryColor }} />
                    Genomförande
                  </h4>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {detailedApproach}
                  </p>
                </div>
              )}
              
              {secondaryInsight && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Mest överraskande för ledningen
                  </h4>
                  <p className="text-foreground text-sm leading-relaxed">
                    {secondaryInsight}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
