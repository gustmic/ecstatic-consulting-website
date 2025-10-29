import { useEffect } from "react";
import PainPointNav from "@/components/PainPointNav";
import PainPointFooter from "@/components/PainPointFooter";
import FlipCard from "@/components/challenges/FlipCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { TrendingDown, Package, Users, Server, Link2, Leaf, BarChart3, Database, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";

const challenges = {
  strategi: [
    {
      icon: TrendingDown,
      title: "Lönsamhetserosion",
      description: "Omsättningen ökar – men marginalerna krymper.",
      profile: "OEM, CM",
      link: "/utmaningar/lonsamhetserosion",
    },
    {
      icon: Package,
      title: "Fast i produktfokus",
      description: "Kunder efterfrågar lösningar, men vi säljer fortfarande produkter.",
      profile: "B2B-tillverkare, OEM",
      link: "/utmaningar/produktfokus",
    },
    {
      icon: Users,
      title: "Generationsskifte utan riktning",
      description: "Ny ledning vill digitalisera, men grunden saknas.",
      profile: "Familjeföretag 200–600 MSEK",
      link: "/utmaningar/generationsskifte",
    },
  ],
  teknik: [
    {
      icon: Server,
      title: "Shelfware-problemet",
      description: "Miljoninvesteringar i system används till 30 % av potentialen.",
      profile: "OEM, CM, 300–800 MSEK",
      link: "/utmaningar/shelfware",
    },
    {
      icon: Link2,
      title: "47 system som inte pratar",
      description: "Excel-filer håller ihop verksamheten – integration är kaos.",
      profile: "Förvärvade bolag, CM",
      link: "/utmaningar/integration",
    },
    {
      icon: Leaf,
      title: "Hållbarhetskrav utan data",
      description: "Kunder kräver klimatdata per produkt – men mätningen saknas.",
      profile: "Leverantörer, OEM",
      link: "/utmaningar/hallbarhet",
    },
  ],
  data: [
    {
      icon: BarChart3,
      title: "OEE-teatern",
      description: "Rapporter säger 78 % effektivitet – men ingen tror på siffrorna.",
      profile: "OEM, automationsföretag",
      link: "/utmaningar/oee-teater",
    },
    {
      icon: Database,
      title: "Data utan beslut",
      description: "Sensorer överallt, men besluten tas ändå på magkänsla.",
      profile: "Alla segment",
      link: "/utmaningar/data-landfill",
    },
    {
      icon: FileSpreadsheet,
      title: "Excel-beroendet",
      description: "En enda fil bär hela produktionen – och bara en person vet hur.",
      profile: "150–400 MSEK bolag",
      link: "/utmaningar/excel-beroende",
    },
  ],
};

export default function NewIndex() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PainPointNav />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary/65 to-secondary/60" />
        </div>

        <div className="container mx-auto px-6 z-10 text-center py-20">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto">
            Tillverkande industri står inför nya utmaningar. Vilken är er största?
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Vi hjälper nordiska tillverkare (150–1000 MSEK) att lösa kritiska utmaningar inom strategi, teknik och data – med konkreta resultat.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}
          >
            Utforska era utmaningar
          </Button>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg text-muted-foreground leading-relaxed observe mb-4">
            Många tillverkande företag upplever just nu att gamla framgångsrecept inte längre räcker.
            På Ecstatic Consulting börjar vi inte med vad vi kan – utan med vad ni kämpar med.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed observe">
            Här nedan hittar ni nio vanliga utmaningar där vi hjälper nordiska bolag att skapa verklig effekt.
          </p>
        </div>
      </section>

      {/* Flip Card Grid */}
      <section id="challenges" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6" style={{ maxWidth: "1400px" }}>
          {/* Strategi */}
          <div className="mb-12 observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Strategiska utmaningar</p>
            <h2 className="font-serif text-3xl font-semibold mb-6" style={{ color: "#2B4C7E" }}>
              Strategi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.strategi.map((challenge) => (
                <FlipCard key={challenge.link} {...challenge} category="strategi" />
              ))}
            </div>
          </div>

          {/* Teknik */}
          <div className="mb-12 observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Tekniska utmaningar</p>
            <h2 className="font-serif text-3xl font-semibold mb-6" style={{ color: "#E67E50" }}>
              Teknik
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.teknik.map((challenge) => (
                <FlipCard key={challenge.link} {...challenge} category="teknik" />
              ))}
            </div>
          </div>

          {/* Data */}
          <div className="observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Dataanalysutmaningar</p>
            <h2 className="font-serif text-3xl font-semibold mb-6" style={{ color: "#4A9B8E" }}>
              Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.data.map((challenge) => (
                <FlipCard key={challenge.link} {...challenge} category="data" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center observe">
          <h2 className="font-serif text-3xl font-semibold mb-6 text-foreground">
            Erfaren expertis, beprövade metoder
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            30+ års kombinerad erfarenhet från Fortune 500-bolag och nordiska tillverkare.
          </p>
          <p className="text-muted-foreground">
            Vi har hjälpt företag inom allt från avancerad elektronik till möbel- och processindustri.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Osäker på vilken utmaning som passar er bäst?
          </h2>
          <p className="text-primary-foreground/90 mb-6">
            Vi hjälper er gärna att identifiera var ni står idag.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link to="/about#contact">Boka ett samtal</Link>
          </Button>
        </div>
      </section>

      <PainPointFooter />
    </div>
  );
}
