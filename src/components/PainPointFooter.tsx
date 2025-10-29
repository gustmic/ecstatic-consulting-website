import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

export default function PainPointFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Ecstatic Consulting" className="h-10 w-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Hjälper nordiska tillverkare att lösa kritiska utmaningar inom strategi, teknik och data.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Stockholm, Sverige</p>
              <p className="mt-2">
                <a href="mailto:kontakt@ecstatic.se" className="hover:text-primary transition-colors">
                  kontakt@ecstatic.se
                </a>
              </p>
            </div>
          </div>

          {/* Utmaningar - Strategi */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#2B4C7E" }}>Strategi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/utmaningar/lonsamhetserosion" className="text-muted-foreground hover:text-primary transition-colors">
                  Lönsamhetserosion
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/produktfokus" className="text-muted-foreground hover:text-primary transition-colors">
                  Fast i produktfokus
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/generationsskifte" className="text-muted-foreground hover:text-primary transition-colors">
                  Generationsskifte
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold mb-4 mt-6" style={{ color: "#E67E50" }}>Teknik</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/utmaningar/shelfware" className="text-muted-foreground hover:text-primary transition-colors">
                  Shelfware-problemet
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/integration" className="text-muted-foreground hover:text-primary transition-colors">
                  47 system som inte pratar
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/hallbarhet" className="text-muted-foreground hover:text-primary transition-colors">
                  Hållbarhetskrav utan data
                </Link>
              </li>
            </ul>
          </div>

          {/* Utmaningar - Data */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#4A9B8E" }}>Data</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/utmaningar/oee-teater" className="text-muted-foreground hover:text-primary transition-colors">
                  OEE-teatern
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/data-landfill" className="text-muted-foreground hover:text-primary transition-colors">
                  Data utan beslut
                </Link>
              </li>
              <li>
                <Link to="/utmaningar/excel-beroende" className="text-muted-foreground hover:text-primary transition-colors">
                  Excel-beroendet
                </Link>
              </li>
            </ul>
          </div>

          {/* Om oss & Kontakt */}
          <div>
            <h3 className="font-semibold mb-4">Företag</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/strategy/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Insikter & Artiklar
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Ecstatic Consulting. Alla rättigheter reserverade.</p>
        </div>
      </div>
    </footer>
  );
}
