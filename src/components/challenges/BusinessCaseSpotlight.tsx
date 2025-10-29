import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface BusinessCaseSpotlightProps {
  company: string;
  challenge: string;
  approach: string;
  results: string[];
  quote: string;
}

export default function BusinessCaseSpotlight({
  company,
  challenge,
  approach,
  results,
  quote,
}: BusinessCaseSpotlightProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Case Study</span>
          </div>
          <h4 className="font-serif text-2xl font-semibold mb-4 text-foreground">{company}</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Utmaning
              </h5>
              <p className="text-foreground">{challenge}</p>
            </div>
            
            <div>
              <h5 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Angreppssätt
              </h5>
              <p className="text-foreground">{approach}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Resultat
            </h5>
            <ul className="space-y-3">
              {results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-6 pt-6 border-t border-border">
            <Quote className="h-8 w-8 text-primary/20 absolute -top-2 left-0" />
            <p className="italic text-foreground pl-10">{quote}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
