import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RootCause {
  title: string;
  description: string;
}

interface RootCauseAccordionProps {
  causes: RootCause[];
}

export default function RootCauseAccordion({ causes }: RootCauseAccordionProps) {
  return (
    <Accordion type="multiple" className="space-y-4">
      {causes.map((cause, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`}
          className="border rounded-lg bg-card px-6"
        >
          <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-4">
            {cause.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
            {cause.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
