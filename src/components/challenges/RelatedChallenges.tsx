import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Challenge {
  title: string;
  path: string;
}

interface RelatedChallengesProps {
  challenges: Challenge[];
}

export default function RelatedChallenges({ challenges }: RelatedChallengesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {challenges.map((challenge) => (
        <Link key={challenge.path} to={challenge.path} className="group">
          <Card className="p-4 h-full flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-1">
            <span className="text-sm font-medium text-foreground">{challenge.title}</span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
