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
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Users, Briefcase } from "lucide-react";

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
    if (open && searchQuery.length > 0) {
      const timeoutId = setTimeout(() => {
        searchData(searchQuery);
      }, 300); // Debounce search by 300ms

      return () => clearTimeout(timeoutId);
    } else {
      setContacts([]);
      setProjects([]);
    }
  }, [searchQuery, open]);

  const searchData = async (query: string) => {
    try {
      const searchTerm = `%${query}%`;

      // Search contacts
      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('id, name, company, email, stage')
        .or(`name.ilike.${searchTerm},company.ilike.${searchTerm},email.ilike.${searchTerm}`)
        .limit(5);

      if (contactError) {
        console.error('Contact search error:', contactError);
      }

      // Search projects
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id, name, status, type')
        .or(`name.ilike.${searchTerm},type.ilike.${searchTerm}`)
        .limit(5);

      if (projectError) {
        console.error('Project search error:', projectError);
      }

      setContacts(contactData || []);
      setProjects(projectData || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleSelect = useCallback((path: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(path);
  }, [navigate, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setSearchQuery("");
        setContacts([]);
        setProjects([]);
      }
    }} shouldFilter={false}>
      <VisuallyHidden>
        <DialogTitle>Search Contacts and Projects</DialogTitle>
        <DialogDescription>
          Search for contacts by name, company, or email, and projects by name or type
        </DialogDescription>
      </VisuallyHidden>
      <CommandInput 
        placeholder="Search contacts, projects..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        {searchQuery.length === 0 ? (
          <CommandEmpty>
            Type to search contacts and projects...
          </CommandEmpty>
        ) : contacts.length === 0 && projects.length === 0 ? (
          <CommandEmpty>
            No results found for "{searchQuery}"
          </CommandEmpty>
        ) : null}
        
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
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
