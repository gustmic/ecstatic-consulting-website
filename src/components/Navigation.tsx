import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Ecstatic Consulting" className="h-10 transition-transform group-hover:scale-105" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/strategy" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Strategy
            </Link>
            <Link to="/data-analytics" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Data Analytics
            </Link>
            <Link to="/technology" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Technology
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
