import { Card } from "@/components/ui/card";

interface RootCauseCardProps {
  title: string;
  description: string;
}

export default function RootCauseCard({ title, description }: RootCauseCardProps) {
  return (
    <Card className="p-6 h-full">
      <h4 className="font-semibold text-lg mb-3 text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
