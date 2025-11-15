import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Leaf, Network, Factory, CheckCircle2 } from "lucide-react";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";
import logo from "@/assets/logo.webp";

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".observe").forEach((element) => {
      observer.observe(element);
    });

    const calendlyScript = document.createElement("link");
    calendlyScript.href = "https://assets.calendly.com/assets/external/widget.css";
    calendlyScript.rel = "stylesheet";
    document.head.appendChild(calendlyScript);

    const calendlyJs = document.createElement("script");
    calendlyJs.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyJs.async = true;
    document.head.appendChild(calendlyJs);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/micael-gustavsson-ecstatic/utforskande-mote",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
                Vi hjälper nordiska tillverkande företag (150-1000 MSEK) att navigera från nyfikenhet till strategiskt
                beslut inom additiv tillverkning.
              </p>
              <p className="font-semibold text-foreground">Oberoende. Datadriven. Tekniskt grundad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Så arbetar vi med er */}
      <section className="py-24 px-6 bg-muted/30">
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
                <p className="text-sm font-semibold text-muted-foreground mb-3">4 veckor, Fast Pris</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• 3-5 komponenter för AM-tillverkning</li>
                  <li>• ROI per utvald komponent</li>
                  <li>• Rekommenderade leverantörer</li>
                  <li>• 6-månaders implementeringsplan för pilotprojekt</li>
                </ul>
              </div>
              <p className="text-muted-foreground/80 text-sm mt-4">→ Ska vi satsa på AM – eller vänta?</p>
            </div>

            {/* Card 2: Pilot */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2B4C7E] observe flex flex-col">
              <div className="mb-auto">
                <Factory className="h-10 w-10 text-[#2B4C7E] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">Pilot</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">När ni går vidare</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Designade komponenter för AM-produktion</li>
                  <li>• Tillverkade pilotdelar via vårt nätverk</li>
                  <li>• ROI-validering baserad på faktiska kostnader</li>
                  <li>• Implementeringsplan för skalning</li>
                </ul>
              </div>
              <p className="text-muted-foreground/80 text-sm mt-4">→ Fungerar AM i vår produktion?</p>
            </div>

            {/* Card 3: Full Integration & Skalning (GREYED OUT) */}
            <div className="relative bg-card rounded-2xl p-8 shadow-sm transition-all border-t-4 border-muted opacity-60 observe flex flex-col">
              {/* "Lanseras 2026" ribbon */}
              <div className="absolute -top-2 -right-2 bg-[#2D7A4F] text-white px-4 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg shadow-md rotate-3">
                Lanseras 2026
              </div>

              <div className="mb-auto">
                <Network className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">Full Integration & Skalning</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Lanseras under 2026</p>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Skalning från 3-5 till 20-50 delar</li>
                  <li>• Full systemintegration (MES/ERP)</li>
                  <li>• Training och kompetensutveckling</li>
                  <li>• Kontinuerlig processoptimering</li>
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
      <section className="py-16 px-6 bg-gradient-to-br from-muted/20 to-muted/40">
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
      <section id="om-oss" className="py-24 px-6 bg-background">
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
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={micaelImage}
                alt="Micael Gustavsson"
                className="w-36 h-36 rounded-lg object-cover flex-shrink-0"
              />
              <div>
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

            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={reinholdImage}
                alt="Reinhold Rutks"
                className="w-36 h-36 rounded-lg object-cover flex-shrink-0"
              />
              <div>
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
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-linkedin/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 observe">
            Inled samtal med oss -<br />
            låt oss utforska er situation tillsammans
          </h2>

          <div className="space-y-4 text-lg text-foreground mb-8 observe">
            <p>
              Vi söker 1-2 tillverkande företag (150-1000 MSEK) som vill vara först ut med att bygga
              <br />
              verklig AM-kompetens under 2026.
            </p>
            <p>
              Ett 30-minuters samtal där vi diskuterar era specifika utmaningar inom additiv tillverkning.
              <br />
              Vi delar perspektiv på var svensk tillverkningsindustri är på väg, och utvärderar om ett samarbete passar
              oss båda.
            </p>
            <p>
              För rätt företag erbjuder vi 'AM Readiness Assessment' till introduktionspris,
              <br />
              då vi prioriterar långsiktiga samarbeten framför volym.
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
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Ecstatic Consulting
                </a>
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Micael Gustavsson (Strategi)
                </a>
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Reinhold Rutks (Teknologi)
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
