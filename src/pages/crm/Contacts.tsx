import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactModal from "@/components/crm/ContactModal";
import ContactsTable from "@/components/crm/ContactsTable";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  title: string | null;
  linkedin_url: string | null;
  notes: string | null;
  company_id: string | null;
  is_primary: boolean | null;
  created_at: string;
  stage?: string;
  last_contacted?: string;
  next_followup?: string;
  company?: string;
  companies?: {
    name: string;
  } | null;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchContacts();
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select(`
        *,
        companies(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading contacts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setContacts(data || []);
  };

  const filterContacts = () => {
    if (!searchQuery.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.companies?.name?.toLowerCase().includes(query)
    );

    setFilteredContacts(filtered);
  };

  const handleSaveContact = async (formData: any) => {
    const { data: { user } } = await supabase.auth.getUser();

    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      title: formData.title || null,
      linkedin_url: formData.linkedin || null,
      notes: formData.notes || null,
      created_by: user?.id,
    };

    if (editingContact) {
      const { error } = await supabase
        .from("contacts")
        .update(contactData)
        .eq("id", editingContact.id);

      if (error) {
        toast({
          title: "Error updating contact",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Contact updated" });
    } else {
      const { error } = await supabase
        .from("contacts")
        .insert([contactData]);

      if (error) {
        toast({
          title: "Error creating contact",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Contact created" });
    }

    setIsModalOpen(false);
    setEditingContact(null);
    fetchContacts();
  };

  const handleDeleteContact = async (id: string) => {
    const confirmed = confirm("Delete this contact?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error deleting contact",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Contact deleted" });
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Contacts</h1>
          <Button onClick={() => {
            setEditingContact(null);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Contact
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <ContactsTable
          contacts={filteredContacts.map(c => ({
            ...c,
            stage: c.stage || "No Stage",
            company: c.companies?.name || ""
          }))}
          onEdit={(contact) => {
            setEditingContact(contact);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteContact}
        />
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
      />
    </div>
  );
};

export default Contacts;
