import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp";

const painPoints = {
  strategi: [
    { title: "Lönsamhetserosion", path: "/utmaningar/lonsamhetserosion" },
    { title: "Fast i produktfokus", path: "/utmaningar/produktfokus" },
    { title: "Generationsskifte utan riktning", path: "/utmaningar/generationsskifte" },
  ],
  teknik: [
    { title: "Shelfware-problemet", path: "/utmaningar/shelfware" },
    { title: "47 system som inte pratar", path: "/utmaningar/integration" },
    { title: "Hållbarhetskrav utan data", path: "/utmaningar/hallbarhet" },
  ],
  data: [
    { title: "OEE-teatern", path: "/utmaningar/oee-teater" },
    { title: "Data utan beslut", path: "/utmaningar/data-landfill" },
    { title: "Excel-beroendet", path: "/utmaningar/excel-beroende" },
  ],
};

export default function PainPointNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isUtmaningarActive = location.pathname.startsWith("/utmaningar");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ecstatic Consulting" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Utmaningar Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 font-medium transition-colors ${
                  isUtmaningarActive ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Utmaningar
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-card border border-border rounded-lg shadow-xl transition-all duration-200 ${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="grid grid-cols-3 gap-6 p-6">
                  {/* Strategi */}
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#2B4C7E" }}>
                      Strategi
                    </h3>
                    <ul className="space-y-2">
                      {painPoints.strategi.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Teknik */}
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#E67E50" }}>
                      Teknik
                    </h3>
                    <ul className="space-y-2">
                      {painPoints.teknik.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Data */}
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#4A9B8E" }}>
                      Data
                    </h3>
                    <ul className="space-y-2">
                      {painPoints.data.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Om oss
            </Link>
            <Link
              to="/strategy/blog"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Insikter
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Button asChild>
              <Link to="/about#contact">Boka samtal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {/* Utmaningar Accordion */}
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full font-medium text-foreground"
              >
                Utmaningar
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="mt-3 space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "#2B4C7E" }}>Strategi</h4>
                    <ul className="space-y-2">
                      {painPoints.strategi.map((item) => (
                        <li key={item.path}>
                          <Link to={item.path} className="text-sm text-muted-foreground block py-1">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "#E67E50" }}>Teknik</h4>
                    <ul className="space-y-2">
                      {painPoints.teknik.map((item) => (
                        <li key={item.path}>
                          <Link to={item.path} className="text-sm text-muted-foreground block py-1">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "#4A9B8E" }}>Data</h4>
                    <ul className="space-y-2">
                      {painPoints.data.map((item) => (
                        <li key={item.path}>
                          <Link to={item.path} className="text-sm text-muted-foreground block py-1">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="block font-medium text-foreground">
              Om oss
            </Link>
            <Link to="/strategy/blog" className="block font-medium text-foreground">
              Insikter
            </Link>
            <Button asChild className="w-full">
              <Link to="/about#contact">Boka samtal</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
