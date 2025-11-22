import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, LayoutGrid, LayoutList } from "lucide-react";
import ContactsKanban from "@/components/crm/ContactsKanban";
import ContactDetailPanel from "@/components/crm/ContactDetailPanel";
import NewContactDialog from "@/components/crm/NewContactDialog";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

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

interface Company {
  id: string;
  name: string;
}

const STAGES = ["Qualified Prospect", "First Meeting", "Proposal", "Client Won", "Client Lost", "No Stage"];

const NewContacts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchContacts();
    fetchCompanies();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate("/admin");
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*, companies(name)")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading contacts", variant: "destructive" });
    } else if (data) {
      setContacts(data);
    }
  };

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from("companies")
      .select("id, name")
      .order("name");
    if (data) setCompanies(data);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const contactId = active.id as string;
    const newStage = over.id as string;

    const { error } = await supabase
      .from("contacts")
      .update({ stage: newStage as any })
      .eq("id", contactId);

    if (error) {
      toast({ title: "Error updating stage", variant: "destructive" });
    } else {
      fetchContacts();
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.companies?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = stageFilter === "all" || contact.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <Button onClick={() => setShowNewDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Contact
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {STAGES.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "kanban" ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <ContactsKanban
              contacts={filteredContacts}
              onContactClick={setSelectedContact}
              stages={STAGES}
            />
          </DndContext>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Next Follow-up</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map(contact => (
                  <TableRow
                    key={contact.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.companies?.name || "-"}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      {contact.next_followup ? (
                        <span className={contact.has_overdue_followup ? "text-destructive" : ""}>
                          {contact.next_followup}
                        </span>
                      ) : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {contact.tags?.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {(contact.tags?.length || 0) > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{(contact.tags?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      <ContactDetailPanel
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onUpdate={fetchContacts}
        companies={companies}
      />

      <NewContactDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSuccess={fetchContacts}
        companies={companies}
      />
    </div>
  );
};

export default NewContacts;
