import { Link, useLocation } from "react-router-dom";
import { Search, Users, Building2, Kanban, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GlobalSearch } from "./GlobalSearch";
import logo from "@/assets/logo.webp";

export const CRMNav = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img src={logo} alt="Ecstatic Consulting" className="h-8" />
              </Link>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>

                <Link to="/admin/crm/contacts">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/admin/crm/contacts") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Contacts
                  </Button>
                </Link>

                <Link to="/admin/crm/companies">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/admin/crm/companies") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Companies
                  </Button>
                </Link>

                <Link to="/admin/crm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/admin/crm") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}
                  >
                    <Kanban className="h-4 w-4 mr-2" />
                    Projects
                  </Button>
                </Link>

                <Link to="/admin/crm/analytics">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/admin/crm/analytics") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </Link>

                <Link to="/admin/crm/settings">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isActive("/admin/crm/settings") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <GlobalSearch open={searchOpen} setOpen={setSearchOpen} />
    </>
  );
};
