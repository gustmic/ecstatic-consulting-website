import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Contact {
  id: string;
  name: string;
  email: string;
  company_id: string | null;
  phone: string | null;
  title: string | null;
  linkedin_url: string | null;
  stage: string;
  tags: string[] | null;
  notes: string | null;
  next_followup: string | null;
  has_overdue_followup: boolean;
  engagement_score: number;
  companies?: { name: string };
}

interface ContactsKanbanProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  stages: string[];
}

function ContactCard({ contact, onClick }: { contact: Contact; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: contact.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 cursor-pointer hover:shadow-md transition-all border-l-4 border-primary"
      onClick={onClick}
    >
      <h4 className="font-semibold mb-1">{contact.name}</h4>
      {contact.companies && (
        <p className="text-sm text-muted-foreground mb-2">{contact.companies.name}</p>
      )}
      <p className="text-xs text-muted-foreground mb-2">{contact.email}</p>

      {contact.next_followup && (
        <p className={`text-xs ${contact.has_overdue_followup ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
          📅 {formatDate(contact.next_followup)}
        </p>
      )}

      {contact.tags && contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {contact.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}

const ContactsKanban = ({ contacts, onContactClick, stages }: ContactsKanbanProps) => {
  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};
    stages.forEach(stage => {
      groups[stage] = contacts.filter(c => c.stage === stage);
    });
    return groups;
  }, [contacts, stages]);

  const getOverdueCount = (stage: string) => {
    return groupedContacts[stage].filter(c => c.has_overdue_followup).length;
  };

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map(stage => (
        <div key={stage} className="flex flex-col">
          <div className="mb-4 pb-3 border-b">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold">{stage}</h3>
              <Badge variant="outline">{groupedContacts[stage].length}</Badge>
            </div>
            {getOverdueCount(stage) > 0 && (
              <Badge variant="destructive" className="text-xs">
                {getOverdueCount(stage)} overdue
              </Badge>
            )}
          </div>

          <div className="space-y-3 flex-1">
            {groupedContacts[stage].map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onClick={() => onContactClick(contact)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsKanban;
