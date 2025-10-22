import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Users, Briefcase, Settings, LayoutDashboard, FileText } from "lucide-react";

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GlobalSearch = ({ open, setOpen }: GlobalSearchProps) => {
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

  const handleSelect = useCallback((path: string) => {
    setOpen(false);
    navigate(path);
  }, [navigate, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, contacts, projects..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="CRM Pages">
          <CommandItem onSelect={() => handleSelect("/admin/crm")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/contacts")}>
            <Users className="mr-2 h-4 w-4" />
            <span>Contacts</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/projects")}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/crm/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Other">
          <CommandItem onSelect={() => handleSelect("/admin/dashboard")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Blog Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/admin/landing")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Admin Landing</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
