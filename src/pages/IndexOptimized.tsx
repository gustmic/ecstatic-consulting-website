import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { ExternalLink, Target, TrendingUp, Leaf, Network, CheckCircle2 } from "lucide-react";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";
import logo from "@/assets/logo.webp";


const IndexOptimized = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    link.as = 'style';
    document.head.appendChild(link);

    // Load Calendly JS with preload
    const preload = document.createElement('link');
    preload.href = 'https://assets.calendly.com/assets/external/widget.js';
    preload.rel = 'preload';
    preload.as = 'script';
    document.head.appendChild(preload);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = false; // Load synchronously for faster availability
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(preload)) {
        document.head.removeChild(preload);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MinimalNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Top-right shape - lighter blue-grey */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-slate-200 transform rotate-12 translate-x-1/3 -translate-y-1/4 opacity-10" />
        
        {/* Bottom-left shape - very subtle */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-300 transform -rotate-6 -translate-x-1/4 translate-y-1/4 opacity-5" />

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Strategisk analys möter teknisk problemlösning —<br />
              <span className="text-[#0A66C2]">för nordiska tillverkare som växer men ser marginaler falla.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Vi identifierar var lönsamheten läcker och om nya teknologier som AM faktiskt är värda att satsa på. Från styrelserum till fabriksgolv.
            </p>
          </div>
        </div>
      </section>

      {/* Core Challenges Section */}
      <section id="utmaningar" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16 observe">
            Fyra områden där vi hjälper till
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge 1: Lönsamhetserosion */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#E67E50] observe">
              <Target className="h-10 w-10 text-[#E67E50] mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Lönsamhetserosion
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Omsättning +40% på fem år, men EBIT från 11% till 4,5%. Ingen vet var pengarna försvinner.
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Vi kartlägger hela värdekedjan och hittar var lönsamheten läcker - ofta i integration, processer, eller att datadrivet beslutsfattande saknas.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Micael kartlägger värdekedjan, Reinhold validerar om tekniska problem är orsak eller symptom.
              </p>
            </div>

            {/* Challenge 2: Advanced Manufacturing */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe">
              <TrendingUp className="h-10 w-10 text-[#2D7A4F] mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Advanced Manufacturing & Additiv Tillverkning
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Ni har AM i labb-skala eller vill enkelt förstå potentialen. Men hur skalas det upp? Vad är business casen?
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Vi hjälper företag navigera från AM-experiment till strategisk produktionskapacitet - design, integration, supply chain transformation och ROI.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Micael bygger business case, Reinhold bedömer teknisk feasibility och integration.
              </p>
            </div>

            {/* Challenge 3: Hållbarhet */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#4CAF50] observe">
              <Leaf className="h-10 w-10 text-[#4CAF50] mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Hållbarhet som möjliggörare, inte bara krav
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Era kunder kräver klimatdata per produkt. EU-krav ökar. Men mätningen och integrationen saknas.
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Vi bygger hållbarhetsstrategi som driver affär - inte bara compliance. Från datainsamling till produktdesign och cirkulär ekonomi.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Vi hjälper er förstå affärsvärdet - inte bara compliance. Samarbetar med externa partners för mätning och rapportering.
              </p>
            </div>

            {/* Challenge 4: System Integration */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2B4C7E] observe">
              <Network className="h-10 w-10 text-[#2B4C7E] mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                System som faktiskt pratar med varandra
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                47 olika system.<br />
                Excel håller ihop verksamheten.<br />
                Integrationen är i kaos.
              </p>
              <p className="text-sm text-muted-foreground">
                Vi löser inte IT-arkitektur - vi löser varför era system inte levererar värde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section id="om-oss" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 observe">
            Beprövad expertis - från fabriksgolv till styrelserum
          </h2>
          
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto observe">
            Vi är två partners med komplementära styrkor som täcker hela spannet - från strategisk analys till teknisk implementation.
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
                  Strategisk analys och business cases. 15+ år från management consulting och industri (Telenor, Nokia, Unibet). Skriver branschanalyser på LinkedIn som läses av VD:ar och produktionschefer. Identifierar var pengarna läcker i värdekedjan.
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
                  40 år elektrostatik, R&D och industriell problemlösning. Har löst produktionsproblem som räddat 10+ MSEK för nordiska tillverkare. Validerar teknisk feasibility och driver implementation på fabriksgolvet.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-12 observe italic">
            Tillsammans täcker vi hela spannet - Micael identifierar vart pengarna läcker, Reinhold löser de tekniska problemen som faktiskt driver lönsamhet.
          </p>

          {/* Credibility Points */}
          <div className="grid md:grid-cols-2 gap-6 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                Vi samarbetar med RISE, AMEXCI och Prototal Group kring svensk advanced manufacturing.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                <span className="font-semibold">PwC rapporterar</span> att 70-80% av företags strategier misslyckas. Vi har sett varför - och vet hur vi undviker det.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 px-6">
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
      <section id="newsletter" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center observe">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Följer du redan vårt tänkande?
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Micael publicerar branschanalyser varje vecka på LinkedIn - lästa av VD:ar och produktionschefer i nordiska tillverkare.
          </p>

          <div className="space-y-6">
            <Button
              asChild
              size="lg"
              className="bg-linkedin hover:bg-linkedin/90 text-linkedin-foreground"
            >
              <a
                href="https://www.linkedin.com/newsletters/the-industrial-strategist-7373044871030362112"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Prenumerera på The Industrial Strategist
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <p className="text-sm text-muted-foreground">
              Läs senaste artikel:{" "}
              <a
                href="https://www.linkedin.com/pulse/additive-manufacturing-sweden-strategic-crossroads-micael-gustavsson-spybf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-linkedin hover:underline"
              >
                Additive Manufacturing in Sweden: Strategic Crossroads
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 observe">
            Låt oss utforska om vi kan hjälpa
          </h2>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-md observe">
            <p className="text-lg text-foreground mb-6">
              30 minuter där vi diskuterar era utmaningar inom lönsamhet, AM eller nya teknologier. Vi delar perspektiv på branschen och ser om ett samarbete är vettigt.
            </p>

            <p className="text-sm text-muted-foreground mb-8">
              Inget säljsnack - vi börjar alltid med att lyssna.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                size="lg"
                className="bg-[#2D7A4F] hover:bg-[#246841] text-white"
                onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({
                      url: 'https://calendly.com/micael-gustavsson-ecstatic/utforskande-mote'
                    });
                  }
                }}
              >
                Boka direkt i kalendern
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6 mb-3">
              Föredrar du LinkedIn? Connecta och skicka direktmeddelande:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-3">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/5"
              >
                <a 
                  href="https://www.linkedin.com/in/micael-gustavsson/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Micael
                </a>
              </Button>
              
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/5"
              >
                <a 
                  href="https://www.linkedin.com/in/reinhold-rutks/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Reinhold
                </a>
              </Button>
            </div>
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
                Hjälper nordiska tillverkare att lösa kritiska utmaningar inom strategi, teknik och data.
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

export default IndexOptimized;
