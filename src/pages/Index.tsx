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
              Svensk tillverkningsindustri står inför ett vägskäl.<br />
              <span className="text-[#0A66C2]">Ny teknologi förändrar allt – men vad är värt att satsa på för er?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              Vi hjälper nordiska tillverkare (150-1000 MSEK) att utvärdera, testa och implementera Advanced Manufacturing – från additiv tillverkning till robotik och smart factory.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Strategisk analys möter teknisk problemlösning.
            </p>
          </div>
        </div>
      </section>

      {/* Four Core Challenges */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Exempel på områden där vi hjälper till
          </h2>
          
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto observe">
            Vi är er partner genom hela resan –{" "}
            <span className="hidden md:inline"><br /></span>
            från att identifiera var lönsamheten läcker till att implementera teknologi som faktiskt ger betalt.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge 1: Lönsamhetserosion */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#E67E50] observe">
              <div className="min-h-[80px]">
                <Target className="h-10 w-10 text-[#E67E50] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                  Lönsamhetserosion
                </h3>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Ni växer i omsättning, men marginalerna faller. Ofta beror det på att produktionen inte hänger med, tekniken är gammal, eller konkurrenter redan moderniserat.
                </p>
                <p className="text-muted-foreground mt-3">
                  Vi kartlägger hela värdekedjan och identifierar var pengarna läcker – och vilken modernisering som faktiskt löser problemet, inte bara är teknik för teknikens skull.
                </p>
              </div>
            </div>

            {/* Challenge 2: Additiv Tillverkning */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe">
              <div className="min-h-[80px]">
                <TrendingUp className="h-10 w-10 text-[#2D7A4F] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                  Additiv Tillverkning (AM)
                </h3>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Är AM relevant för er? Vilka komponenter passar? Hur integrerar ni det i befintlig produktion? Vad är business casen?
                </p>
                <p className="text-muted-foreground mt-3">
                  Vi hjälper er navigera från nyfikenhet till strategisk beslut – design för AM, materialval, leverantörsutvärdering, pilotprojekt och ROI-analys.
                </p>
              </div>
            </div>

            {/* Challenge 3: Smart Factory */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2B4C7E] observe">
              <div className="min-h-[80px]">
                <Factory className="h-10 w-10 text-[#2B4C7E] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                  Smart Factory & Digitalisering
                </h3>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Robotik, IoT, data analytics, predictive maintenance – alla pratar om Industry 4.0, men var ska ni börja?
                </p>
                <p className="text-muted-foreground mt-3">
                  Vi identifierar vilka investeringar i automation och data som faktiskt driver lönsamhet för er. Från systemintegration till att bygga analytics som används – inte bara samlas in.
                </p>
              </div>
            </div>

            {/* Challenge 4: Hållbarhet */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#4CAF50] observe">
              <div className="min-h-[80px]">
                <Leaf className="h-10 w-10 text-[#4CAF50] mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                  Hållbarhet & Cirkulär Produktion
                </h3>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Era kunder kräver klimatdata. EU-krav ökar. Men är hållbarhet bara compliance eller kan det skapa affärsvärde?
                </p>
                <p className="text-muted-foreground mt-3">
                  Vi hjälper er förstå var hållbarhet driver lönsamhet – från klimatavtryck och materialval till cirkulär ekonomi och produktdesign som faktiskt skiljer er från konkurrenterna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section - Team Approach */}
      <section id="om-oss" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 observe">
            Beprövad expertis – strategiskt och tekniskt
          </h2>
          
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto observe">
            Vi är två partners med komplementära styrkor som täcker hela spannet –{" "}
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
                  Strategisk analys och business cases. 15+ år från management consulting och industri (Telenor, Nokia, Unibet). Skriver branschanalyser på LinkedIn som läses av VD:ar och produktionschefer. Identifierar var pengarna läcker och bygger business case för nya teknologier.
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
                  40 år elektrostatik, R&D och industriell problemlösning. Har löst produktionsproblem som räddat 10+ MSEK för nordiska tillverkare. Skriver på LinkedIn om tekniska framsteg och lösningar. Validerar teknisk feasibility, utvärderar leverantörer och driver implementation på fabriksgolvet.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-12 observe italic">
            Tillsammans täcker vi hela resan –{" "}
            <span className="hidden md:inline"><br /></span>
            från att identifiera var lönsamheten läcker till att implementera teknologi som faktiskt ger betalt.
          </p>

          {/* Credibility Points */}
          <div className="grid md:grid-cols-2 gap-6 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                <strong>7 av 10 strategier misslyckas.</strong> Vi har sett varför – och vet hur vi undviker det.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                Vi förstår både affärslogiken och de tekniska utmaningarna som nordiska tillverkare möter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Del av Sveriges Advanced Manufacturing-ekosystem
          </h2>
          
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto observe">
            Vi samarbetar med ledande aktörer inom svensk advanced manufacturing –{" "}
            <span className="hidden md:inline"><br /></span>
            vilket ger er tillgång till expertis, testmiljöer och nätverk.
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
            Detta nätverk gör att vi kan koppla er till rätt partner vid rätt tidpunkt –{" "}
            <span className="hidden md:inline"><br /></span>
            utan att binda er till en enda leverantör.
          </p>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 observe">
            Så jobbar vi
          </h2>

          <div className="space-y-8 observe">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Utforskande samtal (30 min)
                </h3>
                <p className="text-muted-foreground">
                  Vi diskuterar era utmaningar inom lönsamhet, AM eller nya teknologier. Inget säljsnack.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  On-site djupdykning (1-2 dagar)
                </h3>
                <p className="text-muted-foreground">
                  Båda på plats. Micael träffar ledningsgrupp och CFO, Reinhold pratar med produktionschefer och tekniska direktörer. Vi kartlägger strategiskt och operativt.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Analys + rekommendationer
                </h3>
                <p className="text-muted-foreground">
                  Strategisk roadmap (Micael) + teknisk feasibility och implementation plan (Reinhold).
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Implementation support
                </h3>
                <p className="text-muted-foreground">
                  Vi följer med tills det faktiskt fungerar. Inga överlämningar till juniorteam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center observe">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Följ vårt tänkande
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Micael publicerar branschanalyser varje vecka på LinkedIn – lästa av VD:ar och produktionschefer i nordiska tillverkare.
          </p>

          <p className="text-sm text-muted-foreground">
            Läs mer om additiv tillverkning, smart factories och industriell transformation i nyhetsbrevet <strong>The Industrial Strategist</strong> på LinkedIn.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-linkedin/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 observe">
            Låt oss utforska om vi kan hjälpa
          </h2>
          <p className="text-lg text-foreground mb-6 observe">
            30 minuter där vi diskuterar era utmaningar inom lönsamhet, AM eller nya teknologier. Vi delar perspektiv på branschen och ser om ett samarbete är vettigt.
          </p>
          <p className="text-sm text-muted-foreground mb-8 observe">
            Inget säljsnack - vi börjar alltid med att lyssna.
          </p>
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
                Din partner inom Advanced Manufacturing. Hjälper nordiska tillverkare att utvärdera och implementera teknologi som faktiskt ger betalt.
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
