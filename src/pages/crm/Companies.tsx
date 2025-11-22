import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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

interface Company {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  created_at: string;
}

const Companies = () => {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const company = companies.find(c => c.id === id);
      if (company) {
        setEditingCompany(company);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, companies]);

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
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading companies",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setCompanies(data || []);
  };

  const filterCompanies = () => {
    if (!searchQuery.trim()) {
      setFilteredCompanies(companies);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = companies.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.website?.toLowerCase().includes(query)
    );

    setFilteredCompanies(filtered);
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

  const handleDeleteCompany = async (id: string) => {
    const confirmed = confirm("Delete this company?");
    if (!confirmed) return;

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
      return;
    }

    toast({ title: "Company deleted" });
    fetchCompanies();
  };

  return (
    <div className="min-h-screen bg-background">
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

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {company.notes || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingCompany(company);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
    </div>
  );
};

export default Companies;
