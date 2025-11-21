import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Users, Building2, Kanban } from "lucide-react";

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const GlobalSearch = ({ open, setOpen }: GlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  useEffect(() => {
    if (open && searchQuery) {
      searchData(searchQuery);
    } else {
      setContacts([]);
      setCompanies([]);
      setProjects([]);
    }
  }, [searchQuery, open]);

  const searchData = async (query: string) => {
    const { data: contactResults } = await supabase
      .from("contacts")
      .select("*")
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%`)
      .limit(5);

    const { data: companyResults } = await supabase
      .from("companies")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(5);

    const { data: projectResults } = await supabase
      .from("projects")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(5);

    setContacts(contactResults || []);
    setCompanies(companyResults || []);
    setProjects(projectResults || []);
  };

  const handleSelect = (type: string, id?: string) => {
    setOpen(false);
    setSearchQuery("");

    if (type === "contacts") {
      navigate(`/admin/crm/contacts?search=${searchQuery}`);
    } else if (type === "companies") {
      navigate(`/admin/crm/companies?id=${id}`);
    } else if (type === "projects") {
      navigate(`/admin/crm?search=${searchQuery}`);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Search contacts, companies, projects..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>
          {searchQuery ? "No results found." : "Type to search..."}
        </CommandEmpty>

        {contacts.length > 0 && (
          <CommandGroup heading="Contacts">
            {contacts.map((contact) => (
              <CommandItem
                key={contact.id}
                onSelect={() => handleSelect("contacts")}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>{contact.name} - {contact.company || contact.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {companies.length > 0 && (
          <CommandGroup heading="Companies">
            {companies.map((company) => (
              <CommandItem
                key={company.id}
                onSelect={() => handleSelect("companies", company.id)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                <span>{company.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {projects.length > 0 && (
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => handleSelect("projects")}
              >
                <Kanban className="mr-2 h-4 w-4" />
                <span>{project.name} - {project.type}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
