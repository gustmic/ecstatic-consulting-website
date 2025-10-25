import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search, LayoutGrid, Table as TableIcon, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContactsTable from "@/components/crm/ContactsTable";
import ContactModal from "@/components/crm/ContactModal";
import KanbanView from "@/components/crm/KanbanView";
import ContactDetail from "@/components/crm/ContactDetail";
import EmailModal from "@/components/crm/EmailModal";
import { formatDate, formatCurrency } from "@/lib/formatters";

const Contacts = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [detailContactId, setDetailContactId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [emailContactId, setEmailContactId] = useState<string | null>(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [stages, setStages] = useState<string[]>([]);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set search query from URL parameter on mount
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Fetch user preferences first
      const { data: prefsData } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (prefsData?.default_contacts_view) {
        setViewMode(prefsData.default_contacts_view as "table" | "kanban");
      }
      setPreferencesLoaded(true);

      await fetchContacts();
      await fetchStages();
      setLoading(false);
    };

    checkAuth();

    // Set up realtime subscription for contacts
    const contactsChannel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'contacts'
      }, () => {
        fetchContacts();
      })
      .subscribe();

    // Set up realtime subscription for settings
    const settingsChannel = supabase
      .channel('contacts-settings-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'settings'
      }, () => {
        fetchStages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(settingsChannel);
    };
  }, [navigate]);

  useEffect(() => {
    // Filter contacts based on search query and stage
    let filtered = contacts;

    if (stageFilter !== "all") {
      filtered = filtered.filter(c => c.stage === stageFilter);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query))
      );
    }

    setFilteredContacts(filtered);
  }, [searchQuery, contacts, stageFilter]);

  const fetchStages = async () => {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'stages')
      .single();
    
    if (data) {
      setStages(data.value as string[]);
    }
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading contacts",
        description: error.message,
      });
    } else {
      setContacts(data || []);
      setFilteredContacts(data || []);
    }
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: any) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting contact",
        description: error.message,
      });
    } else {
      toast({ title: "Contact deleted" });
      fetchContacts();
    }
  };

  const handleSaveContact = async (contactData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (editingContact) {
      // Update existing contact
      const { error } = await supabase
        .from('contacts')
        .update(contactData)
        .eq('id', editingContact.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating contact",
          description: error.message,
        });
        return;
      }
      toast({ title: "Contact updated" });
    } else {
      // Create new contact
      const { error } = await supabase
        .from('contacts')
        .insert([{ ...contactData, created_by: session?.user.id }]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating contact",
          description: error.message,
        });
        return;
      }
      toast({ title: "Contact created" });
    }

    setIsModalOpen(false);
    fetchContacts();
  };

  const handleStageChange = async (contactId: string, newStage: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ stage: newStage })
      .eq('id', contactId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating stage",
        description: error.message,
      });
    } else {
      // Log interaction
      const { data: { session } } = await supabase.auth.getSession();
      const contact = contacts.find(c => c.id === contactId);
      
      await supabase.from('interactions').insert({
        contact_id: contactId,
        type: 'Follow-up',
        subject: `Stage changed to ${newStage}`,
        notes: `Stage changed from ${contact?.stage} to ${newStage}`,
        logged_by: session?.user.id,
        date: new Date().toISOString().split('T')[0],
      });

      toast({ title: "Stage updated" });
      fetchContacts();
    }
  };

  const handleViewContact = (contact: any) => {
    setDetailContactId(contact.id);
    setIsDetailOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Company", "Email", "Stage", "Phone", "Last Contacted", "Next Follow-Up"];
    const rows = filteredContacts.map(c => [
      c.name,
      c.company || "",
      c.email,
      c.stage,
      c.phone || "",
      c.last_contacted ? formatDate(c.last_contacted) : "",
      c.next_followup ? formatDate(c.next_followup) : "",
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map(row => row.join(";"))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const today = new Date().toISOString().split('T')[0];
    
    link.setAttribute("href", url);
    link.setAttribute("download", `ecstatic_contacts_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "Contacts exported" });
  };

  const handleEmailContact = (contact: any) => {
    setEmailContactId(contact.id);
    setIsEmailOpen(true);
  };

  const handleBulkAction = async () => {
    if (selectedContacts.length === 0 || !bulkAction) return;

    if (bulkAction.startsWith("stage:")) {
      const newStage = bulkAction.split(":")[1];
      
      // Get names of selected contacts for confirmation
      const selectedContactNames = contacts
        .filter(c => selectedContacts.includes(c.id))
        .map(c => c.name);
      
      const namesList = selectedContactNames.slice(0, 5).join(', ') + 
        (selectedContactNames.length > 5 ? ` and ${selectedContactNames.length - 5} more` : '');
      
      const confirmed = confirm(
        `Change stage to "${newStage}" for ${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''}?\n\n${namesList}`
      );
      
      if (!confirmed) {
        setBulkAction("");
        return;
      }
      
      const { error } = await supabase
        .from('contacts')
        .update({ stage: newStage })
        .in('id', selectedContacts);

      if (!error) {
        // Log interactions for stage changes
        const { data: { session } } = await supabase.auth.getSession();
        const interactions = selectedContacts.map(contactId => ({
          contact_id: contactId,
          type: 'Follow-up',
          subject: `Bulk stage change to ${newStage}`,
          notes: `Stage changed to ${newStage} via bulk action`,
          logged_by: session?.user.id,
          date: new Date().toISOString().split('T')[0],
        }));
        
        await supabase.from('interactions').insert(interactions);
        
        toast({ title: `Stage updated for ${selectedContacts.length} contacts` });
        setSelectedContacts([]);
        fetchContacts();
      } else {
        toast({
          variant: "destructive",
          title: "Error updating stages",
          description: error.message,
        });
      }
    }
    
    setBulkAction("");
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/crm">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Contacts</h1>
            <p className="text-muted-foreground">
              Manage your contacts and relationships
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button onClick={handleAddContact}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {stages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedContacts.length > 0 && (
            <>
              <Select value={bulkAction} onValueChange={setBulkAction}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Change stage for selected" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage} value={`stage:${stage}`}>Change to {stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleBulkAction} disabled={!bulkAction}>
                Apply to {selectedContacts.length}
              </Button>
            </>
          )}

          <div className="flex gap-2 border rounded-md p-1">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "table" ? (
          <ContactsTable
            contacts={filteredContacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onEmail={handleEmailContact}
            selectedContacts={selectedContacts}
            onSelectionChange={setSelectedContacts}
          />
        ) : (
          <KanbanView
            contacts={filteredContacts}
            onContactClick={handleViewContact}
            onStageChange={handleStageChange}
            stages={stages}
          />
        )}

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContact}
          contact={editingContact}
        />

        <ContactDetail
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          contactId={detailContactId}
          onEdit={() => {
            const contact = contacts.find(c => c.id === detailContactId);
            if (contact) {
              setIsDetailOpen(false);
              handleEditContact(contact);
            }
          }}
        />

        <EmailModal
          isOpen={isEmailOpen}
          onClose={() => {
            setIsEmailOpen(false);
            fetchContacts(); // Refresh to show updated last_contacted
          }}
          contactId={emailContactId}
          contactEmail={contacts.find(c => c.id === emailContactId)?.email}
          contactName={contacts.find(c => c.id === emailContactId)?.name}
        />
      </div>
    </div>
  );
};

export default Contacts;
