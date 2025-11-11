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
      <section className="relative pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center observe">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Sveriges oberoende AM-rådgivare
            </h1>
            <div className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                Ni känner till additiv tillverkning (AM), avancerad robotik och Industry 4.0. 
                Era konkurrenter undersöker just nu dessa möjligheter.
              </p>
              <p className="font-semibold text-foreground">Men ni vet inte:</p>
              <ul className="text-left max-w-2xl mx-auto space-y-2">
                <li>• Vilka av era tillverkningsprocesser som faktiskt passar AM?</li>
                <li>• Vad riktig ROI är (inte vad leverantören påstår)?</li>
                <li>• Hur ni integrerar detta i er existerande produktion?</li>
                <li>• Vilka leverantörer ni kan lita på i detta nya området?</li>
              </ul>
              <p className="pt-4">
                Vi bygger business case som faktiskt håller, rekommenderar leverantörer utan kickback, och projektleder från assessment till pilot.
              </p>
              <p className="font-semibold text-foreground">
                Vi säljer inget – vi hjälper er hitta vad som är rätt för just er.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vad vi gör */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Vad vi gör
          </h2>
          
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto observe">
            Vi erbjuder en strukturerad process från nyfikenhet till strategiskt beslut. Fast pris, tydliga leverabler, konkreta tidsramar.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Step 1: Utforskande samtal */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#0A66C2] observe">
              <div className="min-h-[80px]">
                <Target className="h-10 w-10 text-[#0A66C2] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">
                  Utforskande samtal
                </h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  30 minuter, gratis
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Vi diskuterar era utmaningar inom AM, robotik eller Industry 4.0. Ingen pitch – vi delar perspektiv på branschen och ser om det är vettigt att gå vidare.
                </p>
              </div>
            </div>

            {/* Step 2: AM Readiness Assessment */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe">
              <div className="min-h-[80px]">
                <TrendingUp className="h-10 w-10 text-[#2D7A4F] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">
                  AM Readiness Assessment
                </h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  4 veckor, 250 000 SEK
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-3 font-semibold">Leverabler:</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-3">
                  <li>• 3-5 delar i er produktportfölj där AM faktiskt fungerar</li>
                  <li>• Förväntad ROI per del (med riktiga kostnadsmodeller)</li>
                  <li>• Rekommenderade leverantörer (AMEXCI, Prototal, maskintillverkare)</li>
                  <li>• 6-månaders implementeringsplan</li>
                </ul>
                <p className="text-muted-foreground font-semibold">
                  Ni får svar på: Ska vi satsa på AM – eller vänta?
                </p>
              </div>
            </div>

            {/* Step 3: Pilot & Implementation */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2B4C7E] observe">
              <div className="min-h-[80px]">
                <Factory className="h-10 w-10 text-[#2B4C7E] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-foreground">
                  Pilot & Implementation
                </h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  Om ni går vidare
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Vi projektleder från design till produktion. Kopplar ihop er med rätt leverantörer, överser integration, training och optimering.
                </p>
                <p className="text-muted-foreground mt-3">
                  Vi finns kvar tills det faktiskt fungerar – inga överlämningar till juniorteam.
                </p>
              </div>
            </div>
          </div>

          {/* Note box */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-3xl mx-auto observe">
            <p className="text-sm text-muted-foreground text-center">
              I framtiden även full integration och skalning – men vi börjar alltid med att bevisa värdet i små steg.
            </p>
          </div>
        </div>
      </section>

      {/* Om oss Section */}
      <section id="om-oss" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 observe">
            Beprövad expertis – strategiskt och tekniskt
          </h2>
          
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto observe">
            Vi är två partners med kompletterande styrkor som täcker hela spannet –{" "}
            <span className="hidden md:inline"><br /></span>
            från strategisk analys till teknisk implementation.
          </p>

          {/* Founder Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={micaelImage}
                alt="Micael Gustavsson"
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Micael Gustavsson
                </h3>
                <p className="text-xs text-linkedin font-medium mb-2">
                  Managing Partner - Strategy & Analytics
                </p>
                <p className="text-xs text-muted-foreground">
                  Skriver branschanalyser om AM som läses av VD:ar i nordiska tillverkare (ex: "Additive Manufacturing in Sweden: The Strategic Crossroads", 2000+ läsare på LinkedIn).
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  15+ år från management consulting och industri (Telenor, Nokia, Unibet). Bygger ROI-modeller som CFO:s faktiskt tror på, och presentationer som kan tas till styrelsen.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={reinholdImage}
                alt="Reinhold Rutks"
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Reinhold Rutks
                </h3>
                <p className="text-xs text-linkedin font-medium mb-2">
                  Managing Partner - Technology & Innovation
                </p>
                <p className="text-xs text-muted-foreground">
                  40 år av industriell problemlösning inom elektrostatik, ytbehandling och processutveckling. Har löst produktionsproblem som räddat 10+ MSEK för nordiska tillverkare.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Vet vilka teknologier som faktiskt fungerar på fabriksgolvet – inte bara i PowerPoints. Läser fabriksgolv och validerar om AM passar eller inte.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground observe">
            Vi kombinerar strategisk analys med teknisk problemlösning – och eftersom vi inte säljer maskiner eller tjänster kan vi rekommendera det som faktiskt är bäst för er produktion.
          </p>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Del av Sveriges AM-ekosystem
          </h2>
          
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto observe">
            Vi samarbetar med ledande aktörer inom svensk additiv tillverkning – RISE, AMEXCI, Prototal, Swerim, maskintillverkare – för att ge er tillgång till rätt kompetens vid rätt tidpunkt.
          </p>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 observe">
            {["RISE", "AMEXCI", "Prototal Group", "GKN Aerospace", "Swerim"].map((partner) => (
              <div
                key={partner}
                className="bg-card rounded-lg shadow-sm hover:shadow-md transition-all px-8 py-6 min-w-[140px] max-w-[160px] flex items-center justify-center hover:scale-105"
              >
                <span className="font-bold text-sm text-foreground text-center">
                  {partner}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground observe">
            Vi är kanalen som kopplar ihop er med rätt partner för pilot och produktion, utan att binda er till en specifik leverantör.
          </p>
        </div>
      </section>


      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center observe">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Följ vårt tänkande om AM och svensk tillverkningsindustri
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Micael publicerar djupa branschanalyser varje vecka på LinkedIn – lästa av VD:ar, produktionschefer och CFO:s i nordiska tillverkare.
          </p>

          <p className="text-muted-foreground mb-4">
            Senaste artikel: "Additive Manufacturing in Sweden: The Strategic Crossroads" (2000+ läsare).
          </p>

          <p className="text-sm text-muted-foreground">
            Vi skriver inte fluff – vi skriver datadrivna analyser som faktiskt hjälper er förstå var marknaden är på väg.
          </p>

          <p className="text-sm font-semibold text-foreground mt-6">
            Läs The Industrial Strategist på LinkedIn
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-linkedin/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 observe">
            Är AM relevant för er – eller ska ni vänta?
          </h2>
          
          <div className="space-y-4 text-lg text-foreground mb-8 observe">
            <p>
              Vi söker 1-2 tillverkare (150-1000 MSEK) som vill vara först med att bygga verklig AM-kompetens under 2026.
            </p>
            <p>
              För rätt företag erbjuder vi det första assessmentet till rabatterat pris – för att bygga track record tillsammans.
            </p>
            <p>
              30 minuter där vi diskuterar era utmaningar inom additiv tillverkning. Vi delar perspektiv på var svensk tillverkningsindustri är på väg, och ser om ett samarbete är vettigt.
            </p>
            <p className="text-sm text-muted-foreground">
              Ingen pitch. Ingen PowerPoint. Bara ärligt samtal om era verkliga utmaningar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center observe">
            <Button
              size="lg"
              onClick={openCalendly}
              className="bg-linkedin hover:bg-linkedin/90 text-white"
            >
              Boka 30-minuters samtal
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/micael-gustavsson/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kontakta via LinkedIn
              </a>
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
                Sveriges oberoende AM-rådgivare. Hjälper nordiska tillverkare att utvärdera och implementera additiv tillverkning som faktiskt ger betalt.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Kontakt</h3>
              <p className="text-sm text-muted-foreground">Sverige & Norden</p>
              <a
                href="mailto:info@ecstatic.consulting"
                className="text-sm text-[#0A66C2] hover:underline"
              >
                info@ecstatic.consulting
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Följ oss</h3>
              <a
                href="https://www.linkedin.com/company/ecstaticconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
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
