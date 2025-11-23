import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Users, Building2, BarChart3, Archive as ArchiveIcon, Settings as SettingsIcon, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp";
import { useState } from "react";
import { GlobalSearch } from "./GlobalSearch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CRMNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem('session_start_time');
      await supabase.auth.signOut();
      navigate("/admin");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16 gap-6">
            {/* Logo - links to main homepage */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Ecstatic Consulting" className="h-8" />
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-1 ml-6">
              <Link to="/admin/crm">
                <Button 
                  variant={isActive("/admin/crm") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Pipeline
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
              
              <Link to="/admin/crm/contacts">
                <Button 
                  variant={isActive("/admin/crm/contacts") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Contacts
                </Button>
              </Link>
              
              <Link to="/admin/crm/companies">
                <Button 
                  variant={isActive("/admin/crm/companies") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  Companies
                </Button>
              </Link>
              
              <Link to="/admin/crm/analytics">
                <Button 
                  variant={isActive("/admin/crm/analytics") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
              </Link>
              
              <Link to="/admin/crm/archive">
                <Button 
                  variant={isActive("/admin/crm/archive") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <ArchiveIcon className="h-4 w-4" />
                  Archive
                </Button>
              </Link>
              
              <Link to="/admin/crm/settings">
                <Button 
                  variant={isActive("/admin/crm/settings") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
            
            {/* Logout Button */}
            <div className="ml-auto">
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
