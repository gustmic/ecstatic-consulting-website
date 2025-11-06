import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";

const MinimalNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              className="h-8 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#2D7A4F] hover:bg-[#246841] text-white"
            >
              Boka samtal
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
            <button
              onClick={() => scrollToSection("utmaningar")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-linkedin transition-colors"
            >
              Utmaningar
            </button>
            <button
              onClick={() => scrollToSection("om-oss")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-linkedin transition-colors"
            >
              Om oss
            </button>
            <button
              onClick={() => scrollToSection("newsletter")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-linkedin transition-colors"
            >
              Newsletter
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-[#2D7A4F] hover:bg-[#246841] text-white"
            >
              Boka samtal
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MinimalNav;
