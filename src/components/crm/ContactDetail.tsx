import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Building, Briefcase, Calendar, Tag, StickyNote } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContactDetailProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string | null;
  onEdit: () => void;
}

const ContactDetail = ({ isOpen, onClose, contactId, onEdit }: ContactDetailProps) => {
  const [contact, setContact] = useState<any>(null);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId && isOpen) {
      fetchContactDetails();
    }
  }, [contactId, isOpen]);

  const fetchContactDetails = async () => {
    if (!contactId) return;

    setLoading(true);
    
    const { data: contactData } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .single();

    const { data: interactionsData } = await supabase
      .from('interactions')
      .select('*')
      .eq('contact_id', contactId)
      .order('date', { ascending: false });

    setContact(contactData);
    setInteractions(interactionsData || []);
    setLoading(false);
  };

  if (!contact || loading) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{contact.name}</DialogTitle>
            <Button onClick={onEdit} size="sm">Edit Contact</Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.company}</span>
                  </div>
                )}
                {contact.title && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.title}</span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pipeline Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stage</p>
                  <Badge>{contact.stage}</Badge>
                </div>
                {contact.next_followup && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next Follow-Up</p>
                      <p className="text-sm font-medium">{formatDate(contact.next_followup)}</p>
                    </div>
                  </div>
                )}
                {contact.last_contacted && (
                  <div>
                    <p className="text-sm text-muted-foreground">Last Contacted</p>
                    <p className="text-sm">{formatDate(contact.last_contacted)}</p>
                  </div>
                )}
              </div>
            </Card>

            {contact.notes && (
              <Card className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <StickyNote className="h-4 w-4" /> Notes
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contact.notes}</p>
              </Card>
            )}
          </div>

          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Interaction History</h3>
              
              {interactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No interactions logged yet
                </p>
              ) : (
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div key={interaction.id}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline">{interaction.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(interaction.date)}
                            </span>
                          </div>
                          {interaction.subject && (
                            <p className="font-medium text-sm mb-1">{interaction.subject}</p>
                          )}
                          {interaction.notes && (
                            <p className="text-sm text-muted-foreground">{interaction.notes}</p>
                          )}
                        </div>
                      </div>
                      {interaction !== interactions[interactions.length - 1] && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetail;
