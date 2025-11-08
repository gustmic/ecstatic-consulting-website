import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingDown, Zap, Database, Factory } from "lucide-react";
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
        url: "https://calendly.com/micael-ecstatic/30min",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 observe">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Strategisk analys möter teknisk problemlösning —<br />
              för nordiska tillverkare som växer men ser marginaler falla.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Vi identifierar var lönsamheten läcker och om nya teknologier som AM faktiskt är värda att satsa på. Från styrelserum till fabriksgolv.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 observe">
            <Button
              size="lg"
              onClick={openCalendly}
              className="bg-linkedin hover:bg-linkedin/90 text-white px-8 py-6 text-lg"
            >
              Boka 30-minuters samtal
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-6 text-lg"
            >
              <a
                href="https://www.linkedin.com/in/micael-gustavsson/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Följ oss på LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Four Core Challenges */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16 observe">
            Fyra kritiska utmaningar för tillverkande industri
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge 1: Profitability Erosion */}
            <Card className="p-8 border-l-4 border-l-[#2D7A4F] hover:shadow-lg transition-shadow observe">
              <div className="flex items-start gap-4 mb-4">
                <TrendingDown className="w-8 h-8 text-[#2D7A4F] flex-shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Lönsamhetserosion
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ni växer i omsättning, men marginaler krymper. Produktmix, prissättning, 
                eller produktionskostnader äter upp det ni bygger. Vi identifierar var 
                värdet läcker och hur ni får tillbaka kontrollen över lönsamheten.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Micael kartlägger värdekedjan, Reinhold validerar om tekniska problem är orsak eller symptom.
              </p>
            </Card>

            {/* Challenge 2: Advanced Manufacturing */}
            <Card className="p-8 border-l-4 border-l-[#2B4C7E] hover:shadow-lg transition-shadow observe">
              <div className="flex items-start gap-4 mb-4">
                <Factory className="w-8 h-8 text-[#2B4C7E] flex-shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Advanced Manufacturing (AM)
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Är AM en strategisk möjlighet eller en kostnadsfälla? Vi hjälper er 
                förstå om det verkligen är rätt för er – när det skapar värde, hur 
                ni integrerar det i befintlig produktion, och vilka investeringar 
                som faktiskt lönar sig.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Micael bygger business case, Reinhold bedömer teknisk feasibility och integration.
              </p>
            </Card>

            {/* Challenge 3: Sustainability */}
            <Card className="p-8 border-l-4 border-l-[#4A7C59] hover:shadow-lg transition-shadow observe">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="w-8 h-8 text-[#4A7C59] flex-shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Hållbarhet som strategi
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Hållbarhet är inte bara ett krav – det kan vara en konkurrensfördel. 
                Vi hjälper er förstå var det skapar affärsvärde, inte bara uppfyller 
                compliance. Från klimatavtryck till cirkulär ekonomi och material­innovation.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Vi hjälper er förstå affärsvärdet - inte bara compliance. Samarbetar med externa partners för mätning och rapportering.
              </p>
            </Card>

            {/* Challenge 4: System Integration */}
            <Card className="p-8 border-l-4 border-l-[#E67E50] hover:shadow-lg transition-shadow observe">
              <div className="flex items-start gap-4 mb-4">
                <Database className="w-8 h-8 text-[#E67E50] flex-shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  System­integration & data
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ni har system – ERP, MES, PLM – men de pratar inte med varandra. 
                Data samlas in men används inte. Vi löser inte IT-arkitektur - vi löser varför era system inte levererar värde.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Credibility Section - Team Approach */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe">
            Beprövad expertis – från fabriksgolv till styrelserum
          </h2>
          
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto observe">
            Vi är två partners med komplementära styrkor som täcker hela spannet - från strategisk analys till teknisk implementation.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Micael */}
            <div className="text-center observe">
              <div className="mb-6">
                <img
                  src={micaelImage}
                  alt="Micael Gustavsson"
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-linkedin"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Micael Gustavsson
              </h3>
              <p className="text-linkedin font-semibold mb-4">
                Managing Partner - Strategy & Analytics
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Strategisk analys och business cases. 15+ år från management consulting och industri (Telenor, Nokia, Unibet). Skriver branschanalyser på LinkedIn som läses av VD:ar och produktionschefer. Identifierar var pengarna läcker i värdekedjan.
              </p>
              <Button
                variant="outline"
                asChild
                className="mt-4"
              >
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn-profil
                </a>
              </Button>
            </div>

            {/* Reinhold */}
            <div className="text-center observe">
              <div className="mb-6">
                <img
                  src={reinholdImage}
                  alt="Reinhold Rutks"
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-linkedin"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Reinhold Rutks
              </h3>
              <p className="text-linkedin font-semibold mb-4">
                Managing Partner - Technology & Innovation
              </p>
              <p className="text-muted-foreground leading-relaxed">
                40 år elektrostatik, R&D och industriell problemlösning. Har löst produktionsproblem som räddat 10+ MSEK för nordiska tillverkare. Validerar teknisk feasibility och driver implementation på fabriksgolvet.
              </p>
              <Button
                variant="outline"
                asChild
                className="mt-4"
              >
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn-profil
                </a>
              </Button>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-12 observe italic">
            Tillsammans täcker vi hela spannet - Micael identifierar vart pengarna läcker, Reinhold löser de tekniska problemen som faktiskt driver lönsamhet.
          </p>

          {/* Credibility markers */}
          <div className="bg-muted/50 rounded-lg p-8 observe">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-linkedin flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    15+ års erfarenhet från ledande management consulting
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Micael har jobbat med strategi, transformation och värdeskapande 
                    i internationella bolag.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-linkedin flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    40 års teknisk expertis inom elektrostatik och R&D
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reinhold har löst produktionsproblem som räddat miljontals kronor 
                    för nordiska tillverkare.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-linkedin flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Deep dive i tillverkande industri
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vi förstår både affärslogiken och de tekniska utmaningarna 
                    som nordiska tillverkare möter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-linkedin flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Samarbetspartners med svensk advanced manufacturing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vi samarbetar med RISE, AMEXCI och Prototal Group kring svensk advanced manufacturing.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                  Båda på plats. Micael träffar ledningsgrupp, Reinhold pratar med produktionschefer och tekniska direktörer. Vi täcker hela spannet.
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
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 observe">
            Håll dig uppdaterad
          </h2>
          <p className="text-muted-foreground mb-8 observe">
            Micael publicerar branschanalyser varje vecka på LinkedIn - lästa av VD:ar och produktionschefer i nordiska tillverkare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center observe">
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
                Följ Micael på LinkedIn
              </a>
            </Button>
          </div>
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
      <footer className="bg-muted/50 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <img src={logo} alt="Ecstatic Consulting" className="h-12 mb-4" />
              <p className="text-sm text-muted-foreground">
                Strategisk analys möter teknisk problemlösning för nordiska tillverkare.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>micael@ecstatic.se</p>
                <p>reinhold@ecstatic.se</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Följ oss</h3>
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-linkedin hover:underline"
                >
                  Micael på LinkedIn
                </a>
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-linkedin hover:underline"
                >
                  Reinhold på LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Ecstatic Consulting AB. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
