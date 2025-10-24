import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Mail } from "lucide-react";
import { formatDate } from "@/lib/formatters";

interface Contact {
  id: string;
  name: string;
  company?: string;
  email: string;
  stage: string;
  tags?: string[];
  last_contacted?: string;
  next_followup?: string;
  phone?: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onEmail?: (contact: Contact) => void;
  selectedContacts?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

const ContactsTable = ({ contacts, onEdit, onDelete, onEmail, selectedContacts = [], onSelectionChange }: ContactsTableProps) => {
  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      Lead: "bg-gray-500",
      Prospect: "bg-blue-500",
      Proposal: "bg-yellow-500",
      Contract: "bg-green-500",
      Client: "bg-purple-500",
    };
    return colors[stage] || "bg-gray-500";
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(contacts.map(c => c.id));
    }
  };

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      onSelectionChange?.(selectedContacts.filter(cid => cid !== id));
    } else {
      onSelectionChange?.([...selectedContacts, id]);
    }
  };

  if (contacts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No contacts found</p>
        <p className="text-sm text-muted-foreground">Start by adding your first contact</p>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {onSelectionChange && (
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedContacts.length === contacts.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead>Next Follow-Up</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              {onSelectionChange && (
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleSelectContact(contact.id)}
                  />
                </TableCell>
              )}
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.company || "-"}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                {contact.stage ? (
                  <Badge className={getStageColor(contact.stage)}>
                    {contact.stage}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    No Stage
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {contact.tags && contact.tags.length > 0 ? (
                  <div className="flex gap-1 flex-wrap">
                    {contact.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {contact.last_contacted ? formatDate(contact.last_contacted) : "-"}
              </TableCell>
              <TableCell>
                {contact.next_followup ? (
                  <span className={new Date(contact.next_followup) < new Date() ? "text-destructive font-medium" : ""}>
                    {formatDate(contact.next_followup)}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {onEmail && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEmail(contact)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(contact)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContactsTable;
