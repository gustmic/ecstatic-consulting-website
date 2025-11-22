import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { useMemo } from "react";

interface Contact {
  id: string;
  name: string;
  company?: string;
  email: string;
  stage: string;
  next_followup?: string;
}

interface KanbanViewProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  onStageChange: (contactId: string, newStage: string) => void;
  stages: string[];
}

const KanbanView = ({ contacts, onContactClick, onStageChange, stages }: KanbanViewProps) => {
  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};
    stages.forEach(stage => {
      groups[stage] = contacts.filter(c => c.stage === stage);
    });
    return groups;
  }, [contacts, stages]);

  const getOverdueCount = (stage: string) => {
    const today = new Date().toISOString().split('T')[0];
    return groupedContacts[stage].filter(c => c.next_followup && c.next_followup < today).length;
  };

  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    e.dataTransfer.setData("contactId", contactId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    const contactId = e.dataTransfer.getData("contactId");
    onStageChange(contactId, stage);
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      "Qualified Prospect": "border-gray-300",
      "First Meeting": "border-blue-300",
      "Proposal": "border-teal-300",
      "Client Won": "border-green-300",
      "Client Lost": "border-red-300",
      "No Stage": "border-gray-200",
    };
    return colors[stage] || "border-gray-300";
  };

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map(stage => (
        <div 
          key={stage}
          className="flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage)}
        >
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
              <Card
                key={contact.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-all border-l-4 ${getStageColor(stage)}`}
                draggable
                onDragStart={(e) => handleDragStart(e, contact.id)}
                onClick={() => onContactClick(contact)}
              >
                <h4 className="font-semibold mb-1">{contact.name}</h4>
                {contact.company && (
                  <p className="text-sm text-muted-foreground mb-2">{contact.company}</p>
                )}
                <p className="text-xs text-muted-foreground mb-2">{contact.email}</p>

                {contact.next_followup && (
                  <p className={`text-xs ${contact.next_followup < new Date().toISOString().split('T')[0] ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                    📅 {formatDate(contact.next_followup)}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanView;
