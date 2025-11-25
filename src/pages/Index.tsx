import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Network, Factory } from "lucide-react";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";
import logo from "@/assets/logo.webp";
import linkedinLogo from "@/assets/linkedin-logo.png";
import { Helmet } from "react-helmet-async";

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".observe").forEach((element) => {
      observer.observe(element);
    });

    // Improved Calendly loading check
    if (window.Calendly) return; // Already loaded globally

    if (document.querySelector('script[src*="calendly"]')) return; // Loading in progress

    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openCalendly = () => {
    if (!window.Calendly) {
      console.error("Calendly not loaded yet");
      return;
    }

    window.Calendly.initPopupWidget({
      url: "https://calendly.com/micael-gustavsson-ecstatic/utforskande-mote",
    });
  };

  return (
    <div className="min-h-screen bg-background" lang="sv">
      <Helmet>
        <html lang="sv" />
        <title>Ecstatic Consulting - Sveriges oberoende AM-rådgivare</title>
        <meta
          name="description"
          content="Vi hjälper nordiska tillverkande företag (300-1000 MSEK) att navigera från nyfikenhet till strategiskt beslut inom additiv tillverkning. Oberoende. Datadriven. Tekniskt grundad."
        />
      </Helmet>
      <MinimalNav />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center observe">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Sveriges oberoende AM-rådgivare
            </h1>
            <div className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                Vi hjälper nordiska tillverkande företag (300-1000 MSEK) att navigera från nyfikenhet till strategiskt
                beslut inom additiv tillverkning.
              </p>
              <p className="font-semibold text-foreground">Oberoende. Datadriven. Tekniskt grundad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Så arbetar vi med er */}
      <section className="py-24 px-6 bg-secondary border-t border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">Så arbetar vi med er</h2>

          <div className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto observe">
            <p className="mb-6">
              Ni känner redan till additiv tillverkning, men saknar svar på kritiska frågor:
              <br />
              Vilka processer passar AM? Vad är verklig ROI? Hur integrerar ni detta i befintlig produktion? Vilka
              leverantörer kan ni lita på?
            </p>
            <p className="mb-6">
              Vi erbjuder en strukturerad process från utvärdering till implementation.
              <br />
              Fast pris, tydliga leverabler, konkreta tidsramar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: AM Readiness Assessment */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe flex flex-col">
              <div className="mb-auto">
                <TrendingUp className="h-10 w-10 text-[#2D7A4F] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">AM Readiness Assessment</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">5 veckor, Fast Pris</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                  <li>3-5 komponenter för AM-tillverkning</li>
                  <li>ROI per utvald komponent</li>
                  <li>Rekommenderade leverantörer</li>
                  <li>6-månaders implementeringsplan för pilotprojekt</li>
                </ul>
              </div>
              <p className="text-muted-foreground/80 text-sm mt-4">→ Ska vi satsa på AM – eller vänta?</p>
            </div>

            {/* Card 2: Pilot */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2B4C7E] observe flex flex-col">
              <div className="mb-auto">
                <Factory className="h-10 w-10 text-[#2B4C7E] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground min-h-[4rem]">Pilot</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">När ni går vidare</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                  <li>Designade komponenter för AM-produktion</li>
                  <li>Tillverkade pilotdelar via vårt nätverk</li>
                  <li>ROI-validering baserad på faktiska kostnader</li>
                  <li>Implementeringsplan för skalning</li>
                </ul>
              </div>
              <p className="text-muted-foreground/80 text-sm mt-4">→ Fungerar AM i vår produktion?</p>
            </div>

            {/* Card 3: Full Integration & Skalning (GREYED OUT) */}
            <div className="relative bg-card rounded-2xl p-8 shadow-sm transition-all border-t-4 border-muted opacity-60 observe flex flex-col">
              <div className="absolute top-0 right-0 bg-[#2D7A4F] text-white px-3 py-1 text-xs font-bold rounded-bl-lg shadow-md">
                Lanseras 2026
              </div>

              <div className="mb-auto">
                <Network className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">Full Integration & Skalning</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Lanseras under 2026</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                  <li>Skalning från 3-5 till 20-50 delar</li>
                  <li>Full systemintegration (MES/ERP)</li>
                  <li>Training och kompetensutveckling</li>
                  <li>Kontinuerlig processoptimering</li>
                </ul>
              </div>
              <p className="text-muted-foreground/80 text-sm mt-4">→ Från pilot till permanent produktionsförmåga.</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto observe">
            Vi projektleder alla steg från design till produktion och finns kvar tills det faktiskt fungerar –<br />
            inga överlämningar till juniora team.
          </p>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 px-6 bg-background border-t border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Del av Sveriges Ekosystem inom AM
          </h2>

          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto observe">
            Vi samarbetar med Sveriges ledande aktörer inom additiv tillverkning
            <br />– <span className="font-bold">RISE</span>, <span className="font-bold">AMEXCI</span>,{" "}
            <span className="font-bold">Prototal</span> –<br />
            för att ge er tillgång till rätt kompetens vid rätt tidpunkt.
          </p>

          <p className="text-center text-muted-foreground observe">
            Vi är kanalen som kopplar ihop er med rätt partner för pilot och produktion, utan att binda er till en
            specifik leverantör.
          </p>
        </div>
      </section>

      {/* Om oss Section */}
      <section id="om-oss" className="py-24 px-6 bg-secondary border-t border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 observe">
            Beprövad expertis – strategiskt och tekniskt
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto observe">
            Vi är två partners med kompletterande styrkor som täcker hela spannet –{" "}
            <span className="hidden md:inline">
              <br />
            </span>
            från strategisk analys till teknisk implementation.
          </p>

          {/* Founder Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={micaelImage}
                  alt="Micael Gustavsson"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-foreground mb-1">Micael Gustavsson</h3>
                  <p className="text-xs text-linkedin font-medium mb-2">Managing Partner - Strategy & Analytics</p>
                  <p className="text-xs text-muted-foreground">
                    15+ år från management consulting och industri (Telenor, Nokia, Unibet). Bygger business case som
                    CFO:s faktiskt tror på, och strategier som kan tas till styrelsen.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Skriver varje vecka om AM och svensk tillverkningsindustri på LinkedIn (The Industrial Strategist) –
                    läst av VD:ar och produktionschefer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={reinholdImage}
                  alt="Reinhold Rutks"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-foreground mb-1">Reinhold Rutks</h3>
                  <p className="text-xs text-linkedin font-medium mb-2">Managing Partner - Technology & Innovation</p>
                  <p className="text-xs text-muted-foreground">
                    40 år av industriell problemlösning inom elektrostatik, ytbehandling och processutveckling. Har löst
                    produktionsproblem som räddat 10+ MSEK för nordiska tillverkande företag.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Vet vilka teknologier som faktiskt fungerar på fabriksgolvet – inte bara i PowerPoints. Läser
                    fabriksgolv och validerar om AM passar eller inte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6 bg-background border-t border-border shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 observe">
            Inled samtal med oss -<br />
            låt oss utforska er situation tillsammans
          </h2>

          <div className="space-y-4 text-lg text-foreground mb-8 observe">
            <p>
              Vi söker 1-2 tillverkande företag (300-1000 MSEK) som vill vara först ut med att bygga
              <br />
              verklig AM-kompetens under 2026.
            </p>
            <p>
              Ett 30-minuters samtal där vi diskuterar era specifika utmaningar inom additiv tillverkning.
              <br />
              Vi delar perspektiv på var svensk tillverkningsindustri är på väg, och utvärderar om ett samarbete passar
              oss båda.
            </p>
            <p className="text-sm text-muted-foreground">
              Ingen pitch. Ingen PowerPoint. Bara ett ärligt samtal om era verkliga utmaningar.
            </p>
          </div>

          <div className="flex justify-center observe">
            <Button size="lg" onClick={openCalendly} className="bg-[#2D7A4F] hover:bg-[#246841] text-white">
              Boka samtal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logo} alt="Ecstatic Consulting" className="h-10 mb-4" />
              <p className="text-sm text-muted-foreground">
                Sveriges oberoende AM-rådgivare.
                <br />
                Hjälper nordiska tillverkande företag att utvärdera och implementera additiv tillverkning som faktiskt
                är lönsam.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Kontakt</h3>
              <p className="text-sm text-muted-foreground">Stockholm, Sverige</p>
              <a href="mailto:info@ecstatic.consulting" className="text-sm text-[#0A66C2] hover:underline">
                info@ecstatic.consulting
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Följ oss</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com/company/ecstaticconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Ecstatic Consulting
                </a>
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Micael Gustavsson (Strategi)
                </a>
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Reinhold Rutks (Teknik)
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Ecstatic Consulting. Alla rättigheter reserverade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
