import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { ExternalLink, Target, TrendingUp, Leaf, Network } from "lucide-react";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";
import logo from "@/assets/logo.webp";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <MinimalNav />

      {/* Hero Section - Diagonal Blue Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Diagonal blue shape top-right */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-linkedin transform rotate-12 translate-x-1/3 -translate-y-1/4 opacity-10" />
        
        {/* Subtle geometric shape bottom-left */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linkedin transform -rotate-6 -translate-x-1/4 translate-y-1/4 opacity-5" />

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ni investerar i system som används till 30%. Ni samlar data som ingen använder. Ni växer - men vinsterna krymper. Känns bekant?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
              Vi hjälper nordiska tillverkare (150-1000 MSEK) att hitta vart pengarna försvinner, navigera Advanced Manufacturing, och växa smartare - inte bara större.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button
                asChild
                size="lg"
                className="bg-linkedin hover:bg-linkedin/90 text-linkedin-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  LinkedIn – Micael (Strategy & Data)
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button
                asChild
                size="lg"
                className="bg-linkedin hover:bg-linkedin/90 text-linkedin-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  LinkedIn – Reinhold (Technology)
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-linkedin text-linkedin hover:bg-linkedin/5"
            >
              <a
                href="https://calendly.com/micael-gustavsson-ecstatic/utforskande-mote"
                target="_blank"
                rel="noopener noreferrer"
              >
                Eller boka direkt i kalendern
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Empathy Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center observe">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            Omsättning växer. Teknikinvesteringar görs. Data samlas in. Men det känns svårare att konkurrera för varje kvartal. Problemet är sällan tekniken - det är att strategi, data och teknisk verklighet aldrig riktigt möts.
          </p>
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
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-linkedin observe">
              <Target className="h-10 w-10 text-linkedin mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Lönsamhetserosion
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Omsättning +40% på fem år, men EBIT från 11% till 4,5%. Ingen vet var pengarna försvinner.
              </p>
              <p className="text-sm text-muted-foreground">
                Vi kartlägger hela värdekedjan och hittar var lönsamheten läcker - ofta i integration, processer, eller att datadrivet beslutsfattande saknas.
              </p>
            </div>

            {/* Challenge 2: Advanced Manufacturing */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-linkedin observe">
              <TrendingUp className="h-10 w-10 text-linkedin mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Advanced Manufacturing & Additiv Tillverkning
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Ni har AM i labb-skala eller vill enkelt förstå potentialen. Men hur skalas det upp? Vad är business casen?
              </p>
              <p className="text-sm text-muted-foreground">
                Vi hjälper företag navigera från AM-experiment till strategisk produktionskapacitet - design, integration, supply chain transformation och ROI.
              </p>
            </div>

            {/* Challenge 3: Hållbarhet */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-linkedin observe">
              <Leaf className="h-10 w-10 text-linkedin mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Hållbarhet som möjliggörare, inte bara krav
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Era kunder kräver klimatdata per produkt. EU-krav ökar. Men mätningen och integrationen saknas.
              </p>
              <p className="text-sm text-muted-foreground">
                Vi bygger hållbarhetsstrategi som driver affär - inte bara compliance. Från datainsamling till produktdesign och cirkulär ekonomi.
              </p>
            </div>

            {/* Challenge 4: System Integration */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-linkedin observe">
              <Network className="h-10 w-10 text-linkedin mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                System som faktiskt pratar med varandra
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                47 system. Excelblad som håller ihop verksamheten. Integration är i kaos.
              </p>
              <p className="text-sm text-muted-foreground">
                Vi fixar inte IT-arkitektur - vi löser varför era system inte levererar värde. Ofta handlar det om process, brist på ägarskap och förändringsledning, inte bara teknik.
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
            30+ års kombinerad erfarenhet från Compaq, Nokia, Telenor och dussintals nordiska tillverkare (150-1000 MSEK). Vi har debuggat produktionslinjer kl 03:00 och presenterat för styrelser kl 09:00 samma dag. Strategisk insikt möter praktisk problemlösning.
          </p>

          {/* Credibility Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                Vi samarbetar med <span className="font-semibold">RISE, AMEXCI, och Prototal Group</span> kring svensk advanced manufacturing
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-sm text-foreground">
                <span className="font-semibold">PwC rapporterar</span> att 70-80% av företags strategier misslyckas. Vi har sett varför - och vet hur vi undviker det.
              </p>
            </div>
          </div>

          {/* Founder Cards */}
          <div className="grid md:grid-cols-2 gap-8 observe">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={micaelImage}
                alt="Micael Gustavsson"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Micael Gustavsson
                </h3>
                <p className="text-xs text-linkedin font-medium mb-2">
                  Managing Partner - Strategy & Data Analytics
                </p>
                <p className="text-xs text-muted-foreground">
                  15+ år från mgmt consulting och industri
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <img
                src={reinholdImage}
                alt="Reinhold Rutks"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Reinhold Rutks
                </h3>
                <p className="text-xs text-linkedin font-medium mb-2">
                  Managing Partner - Technology & Innovation
                </p>
                <p className="text-xs text-muted-foreground">
                  40 år från elektrostatik, R&D och industriell problemlösning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 observe">
            Transparent, senior-ledd, inget konsultsnack.
          </h2>

          <div className="space-y-6 observe">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-linkedin rounded-full mt-2 flex-shrink-0" />
              <p className="text-foreground">
                Vi startade sommaren 2025. Inga case studies än - men 30+ år av att lösa exakt dessa problem.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-linkedin rounded-full mt-2 flex-shrink-0" />
              <p className="text-foreground">
                Ni får oss två - ingen överlämning till juniora team. Varje projekt får senior uppmärksamhet från ax till limpa.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-linkedin rounded-full mt-2 flex-shrink-0" />
              <p className="text-foreground">
                Vi säljer inte. Vi lyssnar först, sen ser vi om vi passar för varandra. Om inte, säger vi det direkt.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-linkedin rounded-full mt-2 flex-shrink-0" />
              <p className="text-foreground">
                LinkedIn är där vi delar våra insikter. Hemsidan är nästa steg i samtalet.
              </p>
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
              30-minuters förutsättningslöst samtal. Ingen förberedelse krävs. Vi börjar alltid med att lyssna.
            </p>

            <p className="text-muted-foreground mb-8">
              <span className="font-semibold">Vanligast:</span> LinkedIn DM (svar inom 24h, oftast samma dag)<br />
              <span className="font-semibold">Alternativt:</span> Boka direkt via Calendly
            </p>

            <p className="text-sm text-muted-foreground mb-8">
              Nästa steg: Ett fysiskt möte eller via Teams. Vi delar tankar, ser om vi kan leverera värde, och ser vad som är vettigt härnäst. Kostar inget. Ingen press.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Button
                asChild
                size="lg"
                className="bg-linkedin hover:bg-linkedin/90 text-linkedin-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  LinkedIn – Micael
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button
                asChild
                size="lg"
                className="bg-linkedin hover:bg-linkedin/90 text-linkedin-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  LinkedIn – Reinhold
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-linkedin text-linkedin hover:bg-linkedin/5"
            >
              <a
                href="https://calendly.com/micael-gustavsson-ecstatic/utforskande-mote"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka direkt i kalendern
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
                Hjälper nordiska tillverkare att lösa kritiska utmaningar inom strategi, teknik och data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Kontakt</h3>
              <p className="text-sm text-muted-foreground">Stockholm, Sverige</p>
              <a
                href="mailto:kontakt@ecstatic.se"
                className="text-sm text-linkedin hover:underline"
              >
                kontakt@ecstatic.se
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Följ oss</h3>
              <a
                href="https://www.linkedin.com/company/ecstaticconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-linkedin hover:underline"
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
