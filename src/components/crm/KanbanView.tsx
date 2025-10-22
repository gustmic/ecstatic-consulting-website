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
  tags?: string[];
  next_followup?: string;
  has_overdue_followup?: boolean;
}

interface KanbanViewProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  onStageChange: (contactId: string, newStage: string) => void;
}

const stages = ["Lead", "Prospect", "Proposal", "Contract", "Client"];

const KanbanView = ({ contacts, onContactClick, onStageChange }: KanbanViewProps) => {
  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};
    stages.forEach(stage => {
      groups[stage] = contacts.filter(c => c.stage === stage);
    });
    return groups;
  }, [contacts]);

  const getOverdueCount = (stage: string) => {
    return groupedContacts[stage].filter(c => c.has_overdue_followup).length;
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
      Lead: "border-gray-300",
      Prospect: "border-blue-300",
      Proposal: "border-yellow-300",
      Contract: "border-green-300",
      Client: "border-purple-300",
    };
    return colors[stage] || "border-gray-300";
  };

  return (
    <div className="grid grid-cols-5 gap-4">
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
                
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {contact.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {contact.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{contact.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {contact.next_followup && (
                  <p className={`text-xs ${contact.has_overdue_followup ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
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
