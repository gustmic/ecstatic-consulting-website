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
  onOpenChange: (open: boolean) => void;
}

export const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

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
    console.log('=== GLOBAL SEARCH DEBUG ===');
    console.log('Search query:', query);

    // Search contacts
    console.log('Searching contacts with query:', query);
    const { data: contactResults, error: contactsError } = await supabase
      .from("contacts")
      .select("*, companies(name)")
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(5);
    
    console.log('Contacts result:', contactResults);
    console.log('Contacts error:', contactsError);

    // Search companies
    console.log('Searching companies with query:', query);
    const { data: companyResults, error: companiesError } = await supabase
      .from("companies")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(5);
    
    console.log('Companies result:', companyResults);
    console.log('Companies error:', companiesError);

    // Search projects
    console.log('Searching projects with query:', query);
    const { data: projectResults, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(5);
    
    console.log('Projects result:', projectResults);
    console.log('Projects error:', projectsError);
    
    console.log('=== END DEBUG ===');

    setContacts(contactResults || []);
    setCompanies(companyResults || []);
    setProjects(projectResults || []);
  };

  const handleSelect = (type: string, id?: string) => {
    onOpenChange(false);
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
    <CommandDialog open={open} onOpenChange={onOpenChange}>
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
                <span>{contact.name} - {contact.companies?.name || contact.email}</span>
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

export default GlobalSearch;
