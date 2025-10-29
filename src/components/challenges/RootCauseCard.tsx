import { Card } from "@/components/ui/card";

interface RootCauseCardProps {
  title: string;
  description: string;
}

export default function RootCauseCard({ title, description }: RootCauseCardProps) {
  return (
    <Card className="p-6 h-full border-l-4" style={{ borderLeftColor: "#2B4C7E" }}>
      <h4 className="font-semibold text-lg mb-3 text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
