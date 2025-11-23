import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ExternalLink, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactModal } from "@/components/crm/ContactModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  name: string;
  title: string | null;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  company_id: string | null;
  is_primary: boolean;
  notes: string | null;
  companies?: { name: string };
  project_count?: number;
}

interface Company {
  id: string;
  name: string;
}

const Contacts = () => {
  const [searchParams] = useSearchParams();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [projectsDialogOpen, setProjectsDialogOpen] = useState(false);
  const [selectedContactProjects, setSelectedContactProjects] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, companyFilter]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchContacts();
    fetchCompanies();
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select(`
        *,
        companies(name)
      `)
      .order("name");

    if (error) {
      toast({
        title: "Error loading contacts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Get project counts for each contact
    const contactsWithCounts = await Promise.all(
      data.map(async (contact) => {
        // Count as primary contact
        const { count: primaryCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("primary_contact_id", contact.id);

        // Count as related contact
        const { count: relatedCount } = await supabase
          .from("project_contacts")
          .select("*", { count: "exact", head: true })
          .eq("contact_id", contact.id);

        return {
          ...contact,
          project_count: (primaryCount || 0) + (relatedCount || 0),
        };
      })
    );

    setContacts(contactsWithCounts);
  };

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from("companies")
      .select("id, name")
      .order("name");
    if (data) setCompanies(data);
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (companyFilter !== "all") {
      filtered = filtered.filter(c => c.company_id === companyFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.companies?.name.toLowerCase().includes(query)
      );
    }

    setFilteredContacts(filtered);
  };

  const handleSaveContact = async (formData: any) => {
    const { data: { user } } = await supabase.auth.getUser();

    const contactData = {
      name: formData.name,
      title: formData.title || null,
      email: formData.email,
      phone: formData.phone || null,
      linkedin_url: formData.linkedin_url || null,
      company_id: formData.company_id || null,
      is_primary: formData.is_primary,
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
    // Check if contact is used in projects
    const { count: primaryCount } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("primary_contact_id", id);

    const { count: relatedCount } = await supabase
      .from("project_contacts")
      .select("*", { count: "exact", head: true })
      .eq("contact_id", id);

    const totalProjects = (primaryCount || 0) + (relatedCount || 0);

    if (totalProjects > 0) {
      toast({
        title: "Cannot delete contact",
        description: `This contact is associated with ${totalProjects} project(s). Remove them from projects first.`,
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this contact?")) return;

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
    } else {
      toast({ title: "Contact deleted" });
      fetchContacts();
    }
  };

  const handleViewProjects = async (contactId: string) => {
    // Get projects where contact is primary
    const { data: primaryProjects } = await supabase
      .from("projects")
      .select("id, name, type, pipeline_status")
      .eq("primary_contact_id", contactId);

    // Get projects where contact is related
    const { data: relatedProjectIds } = await supabase
      .from("project_contacts")
      .select("project_id")
      .eq("contact_id", contactId);

    if (relatedProjectIds && relatedProjectIds.length > 0) {
      const { data: relatedProjects } = await supabase
        .from("projects")
        .select("id, name, type, pipeline_status")
        .in("id", relatedProjectIds.map(p => p.project_id));

      setSelectedContactProjects([
        ...(primaryProjects || []).map(p => ({ ...p, role: "Primary Contact" })),
        ...(relatedProjects || []).map(p => ({ ...p, role: "Related Contact" })),
      ]);
    } else {
      setSelectedContactProjects((primaryProjects || []).map(p => ({ ...p, role: "Primary Contact" })));
    }

    setProjectsDialogOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Title", "Company", "Email", "Phone", "LinkedIn URL", "Primary Contact", "Projects"];
    const rows = filteredContacts.map(c => [
      c.name,
      c.title || "",
      c.companies?.name || "",
      c.email,
      c.phone || "",
      c.linkedin_url || "",
      c.is_primary ? "Yes" : "No",
      c.project_count?.toString() || "0",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const today = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `ecstatic_contacts_${today}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "Contacts exported" });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Contacts</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => {
              setEditingContact(null);
              setIsModalOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Contact
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      {contact.name}
                      {contact.is_primary && (
                        <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{contact.title || "-"}</TableCell>
                    <TableCell>{contact.companies?.name || "-"}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      {contact.linkedin_url ? (
                        <a
                          href={contact.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          LinkedIn
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{contact.phone || "-"}</TableCell>
                    <TableCell>
                      {contact.project_count ? (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => handleViewProjects(contact.id)}
                        >
                          {contact.project_count} project{contact.project_count !== 1 ? "s" : ""}
                        </Button>
                      ) : (
                        "0"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingContact(contact);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
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

      <Dialog open={projectsDialogOpen} onOpenChange={setProjectsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Associated Projects</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {selectedContactProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No projects found</p>
            ) : (
              selectedContactProjects.map((project) => (
                <div key={project.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.type} • {project.pipeline_status} • {project.role}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
