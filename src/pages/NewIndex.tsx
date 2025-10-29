import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PainPointNav from "@/components/PainPointNav";
import PainPointFooter from "@/components/PainPointFooter";
import HeroImageCard from "@/components/challenges/HeroImageCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { TrendingDown, Package, Users, Server, Link2, Leaf, BarChart3, Database, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";

const challenges = {
  profitability: [
    {
      icon: TrendingDown,
      title: "Lönsamhetserosion",
      description: "Omsättning +40% på fem år, men EBIT från 11% till 4,5%. Ingen vet var pengarna försvinner.",
      profile: "OEM · Eftermarknad · 250-800 MSEK",
      link: "/utmaningar/lonsamhetserosion",
      category: "profitability" as const,
    },
    {
      icon: FileSpreadsheet,
      title: "Excel-beroendet",
      description: "En enda fil bär hela produktionen — och bara en person vet hur den fungerar.",
      profile: "Mellanstora företag · 150-400 MSEK",
      link: "/utmaningar/excel-beroende",
      category: "profitability" as const,
    },
    {
      icon: Database,
      title: "Data utan beslut",
      description: "Sensorer överallt, men besluten tas ändå på magkänsla. Data samlas men används inte.",
      profile: "Alla segment · Tillväxtfas",
      link: "/utmaningar/data-landfill",
      category: "profitability" as const,
    },
  ],
  growth: [
    {
      icon: Package,
      title: "Fast i produktfokus",
      description: "Kunder efterfrågar lösningar och outcomes, men vi säljer fortfarande produkter och komponenter.",
      profile: "B2B-tillverkare · OEM · Service",
      link: "/utmaningar/produktfokus",
      category: "growth" as const,
    },
    {
      icon: Users,
      title: "Generationsskifte utan riktning",
      description: "Ny ledning vill digitalisera allt, men grunden saknas. Kulturen är inte redo.",
      profile: "Familjeföretag · 200-600 MSEK",
      link: "/utmaningar/generationsskifte",
      category: "growth" as const,
    },
    {
      icon: Leaf,
      title: "Hållbarhetskrav utan data",
      description: "Kunder kräver klimatdata per produkt — men mätningen saknas helt.",
      profile: "B2B-leverantörer · Exportföretag",
      link: "/utmaningar/hallbarhet",
      category: "growth" as const,
    },
  ],
  efficiency: [
    {
      icon: Server,
      title: "Shelfware-problemet",
      description: "Miljoninvesteringar i MES/ERP/PLM används till 30% av potentialen. Implementeringen misslyckades.",
      profile: "OEM · CM · 300-800 MSEK",
      link: "/utmaningar/shelfware",
      category: "efficiency" as const,
    },
    {
      icon: Link2,
      title: "47 system som inte pratar",
      description: "Excel-filer håller ihop verksamheten. Integration är kaos. Manuella workarounds överallt.",
      profile: "Förvärvade bolag · CM",
      link: "/utmaningar/integration",
      category: "efficiency" as const,
    },
    {
      icon: BarChart3,
      title: "OEE-teatern",
      description: "Rapporter säger 78% effektivitet — men produktion känner inte igen verkligheten.",
      profile: "OEM · Automationsföretag",
      link: "/utmaningar/oee-teater",
      category: "efficiency" as const,
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
      <Helmet>
        <title>Ecstatic Consulting | Utmaningar för tillverkande industri</title>
        <meta 
          name="description" 
          content="Vi hjälper nordiska tillverkare (150-1000 MSEK) att lösa kritiska utmaningar inom lönsamhet, tillväxt och effektivitet — med konkreta resultat." 
        />
      </Helmet>
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
            Tillverkande industri står inför tre kritiska val
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Hur ökar vi lönsamheten — inte bara omsättningen?<br/>
            Hur växer vi smartare — mot nya marknader och affärsmodeller?<br/>
            Hur levererar vi effektivare — med samma resurser?
          </p>
          <p className="text-xl md:text-2xl text-primary-foreground font-semibold mb-8">
            Vilken är er största utmaning?
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
            Omsättning växer, teknikinvesteringar görs, data samlas in — men ändå känns det som att konkurrera blir svårare för varje kvartal.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed observe">
            Ni är inte ensamma. Här är nio kritiska utmaningar där vi hjälper nordiska tillverkare att gå från symptom till lösning — med mätbara resultat.
          </p>
        </div>
      </section>

      {/* Challenge Grid */}
      <section id="challenges" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6" style={{ maxWidth: "1400px" }}>
          {/* Profitability */}
          <div className="mb-16 observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">LÖNSAMHET</p>
            <h2 className="font-serif text-3xl font-semibold mb-2" style={{ color: "#2D7A4F" }}>
              Öka Lönsamhet
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hitta var pengarna försvinner — och gör något åt det
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.profitability.map((challenge) => (
                <HeroImageCard key={challenge.link} {...challenge} />
              ))}
            </div>
          </div>

          {/* Growth */}
          <div className="mb-16 observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">TILLVÄXT</p>
            <h2 className="font-serif text-3xl font-semibold mb-2" style={{ color: "#2B4C7E" }}>
              Väx Smartare
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hitta nya intäktsströmmar utan att bygga ny fabrik
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.growth.map((challenge) => (
                <HeroImageCard key={challenge.link} {...challenge} />
              ))}
            </div>
          </div>

          {/* Efficiency */}
          <div className="observe">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">EFFEKTIVITET</p>
            <h2 className="font-serif text-3xl font-semibold mb-2" style={{ color: "#E67E50" }}>
              Leverera Effektivare
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Gör mer med samma resurser — eller mindre
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.efficiency.map((challenge) => (
                <HeroImageCard key={challenge.link} {...challenge} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center observe">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-foreground">
            Beprövad expertis från fabriksgolv till styrelserum
          </h2>
          <p className="text-lg text-muted-foreground mb-3">
            30+ års kombinerad erfarenhet från företag som Compaq, Nokia, Telenor och dussintals nordiska tillverkare (150-1000 MSEK).
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Vi har löst allt från elektrostatikproblem på produktionslinjer till strategisk ompositionering av hela affärsmodeller — ofta kombinerat, för verkligheten är sällan uppdelad i silos.
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
