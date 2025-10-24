import { useEffect, useCallback, useState } from "react";
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
import { Users, Briefcase, LayoutDashboard, BarChart3, Settings } from "lucide-react";

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GlobalSearch = ({ open, setOpen }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

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
    if (open && searchQuery.length > 1) {
      searchData(searchQuery);
    } else {
      setContacts([]);
      setProjects([]);
    }
  }, [searchQuery, open]);

  const searchData = async (query: string) => {
    const searchTerm = `%${query}%`;

    // Search contacts
    const { data: contactData } = await supabase
      .from('contacts')
      .select('id, name, company, email, stage')
      .or(`name.ilike.${searchTerm},company.ilike.${searchTerm},email.ilike.${searchTerm}`)
      .limit(5);

    // Search projects
    const { data: projectData } = await supabase
      .from('projects')
      .select('id, name, status, type')
      .or(`name.ilike.${searchTerm},type.ilike.${searchTerm}`)
      .limit(5);

    setContacts(contactData || []);
    setProjects(projectData || []);
  };

  const handleSelect = useCallback((path: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(path);
  }, [navigate, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) setSearchQuery("");
    }}>
      <CommandInput 
        placeholder="Search contacts, projects..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {contacts.length > 0 && (
          <CommandGroup heading="Contacts">
            {contacts.map((contact) => (
              <CommandItem 
                key={contact.id} 
                onSelect={() => handleSelect(`/admin/crm/contacts?id=${contact.id}`)}
              >
                <Users className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{contact.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {contact.company} • {contact.stage}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {projects.length > 0 && (
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem 
                key={project.id} 
                onSelect={() => handleSelect(`/admin/crm/projects?id=${project.id}`)}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{project.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {project.type} • {project.status}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => handleSelect("/admin/crm")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/contacts")}>
            <Users className="mr-2 h-4 w-4" />
            <span>All Contacts</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/projects")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>All Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
