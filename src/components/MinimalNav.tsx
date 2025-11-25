import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";

const MinimalNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isEnglish = location.pathname === '/en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Ecstatic Consulting"
              className="h-8 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  !isEnglish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="font-semibold">SV</span>
              </Link>
              <Link
                to="/en"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isEnglish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="font-semibold">EN</span>
              </Link>
            </div>
            
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#2D7A4F] hover:bg-[#246841] text-white"
            >
              {isEnglish ? 'Book a Call' : 'Boka samtal'}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-linkedin transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1 mb-3">
              <Link
                to="/"
                className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isEnglish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Swedish
              </Link>
              <Link
                to="/en"
                className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isEnglish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                English
              </Link>
            </div>
            
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-[#2D7A4F] hover:bg-[#246841] text-white"
            >
              {isEnglish ? 'Book a Call' : 'Boka samtal'}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MinimalNav;
