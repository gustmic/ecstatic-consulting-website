import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CompanyModal } from "@/components/crm/CompanyModal";
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

interface Company {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  contact_count?: number;
  project_count?: number;
}

const Companies = () => {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
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
    filterCompanies();
  }, [companies, searchQuery]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    fetchCompanies();
  };

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("name");

    if (error) {
      toast({
        title: "Error loading companies",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Get counts for each company
    const companiesWithCounts = await Promise.all(
      data.map(async (company) => {
        const { count: contactCount } = await supabase
          .from("contacts")
          .select("*", { count: "exact", head: true })
          .eq("company_id", company.id);

        const { count: projectCount } = await supabase
          .from("project_companies")
          .select("*", { count: "exact", head: true })
          .eq("company_id", company.id);

        return {
          ...company,
          contact_count: contactCount || 0,
          project_count: projectCount || 0,
        };
      })
    );

    setCompanies(companiesWithCounts);
  };

  const filterCompanies = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      setFilteredCompanies(
        companies.filter(c => c.name.toLowerCase().includes(query))
      );
    } else {
      setFilteredCompanies(companies);
    }
  };

  const handleSaveCompany = async (formData: any) => {
    const companyData = {
      name: formData.name,
      website: formData.website || null,
      notes: formData.notes || null,
    };

    if (editingCompany) {
      const { error } = await supabase
        .from("companies")
        .update(companyData)
        .eq("id", editingCompany.id);

      if (error) {
        toast({
          title: "Error updating company",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Company updated" });
    } else {
      const { error } = await supabase
        .from("companies")
        .insert([companyData]);

      if (error) {
        toast({
          title: "Error creating company",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Company created" });
    }

    setIsModalOpen(false);
    setEditingCompany(null);
    fetchCompanies();
  };

  const handleDeleteCompany = async (id: string, contactCount: number, projectCount: number) => {
    if (contactCount > 0 || projectCount > 0) {
      toast({
        title: "Cannot delete company",
        description: `This company has ${contactCount} contact(s) and ${projectCount} project(s). Remove them first.`,
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this company?")) return;

    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error deleting company",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Company deleted" });
      fetchCompanies();
    }
  };

  const handleViewDetails = async (company: Company) => {
    // Fetch contacts
    const { data: contacts } = await supabase
      .from("contacts")
      .select("id, name, title, email, is_primary")
      .eq("company_id", company.id)
      .order("name");

    // Fetch projects
    const { data: projectCompanies } = await supabase
      .from("project_companies")
      .select("projects(id, name, type, pipeline_status)")
      .eq("company_id", company.id);

    setSelectedCompany({
      ...company,
      contacts: contacts || [],
      projects: projectCompanies?.map(pc => (pc as any).projects).filter(Boolean) || [],
    });
    setDetailDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Companies</h1>
          <Button onClick={() => {
            setEditingCompany(null);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            New Company
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium"
                        onClick={() => handleViewDetails(company)}
                      >
                        {company.name}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Visit
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{company.contact_count || 0}</TableCell>
                    <TableCell>{company.project_count || 0}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCompany(company);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id, company.contact_count || 0, company.project_count || 0)}
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

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCompany(null);
        }}
        onSave={handleSaveCompany}
        company={editingCompany}
      />

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCompany?.name}</DialogTitle>
          </DialogHeader>

          {selectedCompany && (
            <div className="space-y-6">
              {selectedCompany.website && (
                <div>
                  <p className="text-sm font-semibold mb-1">Website</p>
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {selectedCompany.website}
                  </a>
                </div>
              )}

              {selectedCompany.notes && (
                <div>
                  <p className="text-sm font-semibold mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{selectedCompany.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold mb-2">Contacts ({selectedCompany.contacts.length})</p>
                {selectedCompany.contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No contacts</p>
                ) : (
                  <div className="space-y-2">
                    {selectedCompany.contacts.map((contact: any) => (
                      <div key={contact.id} className="p-3 border rounded-lg">
                        <div className="font-medium">
                          {contact.name}
                          {contact.is_primary && (
                            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {contact.title && `${contact.title} • `}{contact.email}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Projects ({selectedCompany.projects.length})</p>
                {selectedCompany.projects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No projects</p>
                ) : (
                  <div className="space-y-2">
                    {selectedCompany.projects.map((project: any) => (
                      <div key={project.id} className="p-3 border rounded-lg">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.type} • {project.pipeline_status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Companies;
