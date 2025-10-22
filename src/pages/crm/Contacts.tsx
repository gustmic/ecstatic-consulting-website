import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactsTable from "@/components/crm/ContactsTable";
import ContactModal from "@/components/crm/ContactModal";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchContacts();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Filter contacts based on search query
    if (searchQuery.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query))
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

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
          
          <Button onClick={handleAddContact}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ContactsTable
          contacts={filteredContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContact}
          contact={editingContact}
        />
      </div>
    </div>
  );
};

export default Contacts;
