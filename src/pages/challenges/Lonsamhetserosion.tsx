import { Link } from "react-router-dom";
import PainPointNav from "@/components/PainPointNav";
import PainPointFooter from "@/components/PainPointFooter";
import RecognitionChecklist from "@/components/challenges/RecognitionChecklist";
import StatCard from "@/components/challenges/StatCard";
import RootCauseCard from "@/components/challenges/RootCauseCard";
import MethodologyRoadmap from "@/components/challenges/MethodologyRoadmap";
import BusinessCaseSpotlight from "@/components/challenges/BusinessCaseSpotlight";
import RelatedChallenges from "@/components/challenges/RelatedChallenges";
import { Button } from "@/components/ui/button";
import strategyImage from "@/assets/strategy-bg.jpg";

const recognitionItems = [
  "Omsättningen växer, men EBIT-marginalen minskar år efter år",
  "Produktportföljen har breddats – men lönsamheten per produkt är oklar",
  "Sälj drivs av volymmål, inte av bidrag till vinst",
  "Kostnaderna följer med upp – men ingen vet exakt var vinsten försvinner",
  "Diskussioner om prishöjningar blir reaktiva, inte strategiska",
  "\"Det går bra – men känns inte bra\" är en vanlig kommentar i ledningsgruppen",
];

const statCards = [
  { stat: "8–12 MSEK/år", description: "Dold komplexitetskostnad för en typisk CM med 400 MSEK omsättning" },
  { stat: "20–30%", description: "Av produktportföljen genererar ofta negativ marginal" },
  { stat: "3–6 mån", description: "Genomsnittlig fördröjning innan prisjusteringar slår igenom" },
  { stat: "2/3", description: "Ledningar saknar marginalanalys per kund och produkt" },
];

const rootCauses = [
  {
    title: "Historiskt fokus på volym, inte värde",
    description: "Många bolag har vuxit genom produktivitet och export – men inte utvecklat verktyg för att mäta lönsamhet på detaljnivå.",
  },
  {
    title: "Fragmenterad kostnadsbild",
    description: "Redovisningen är byggd för legala krav, inte för beslutsstöd – vilket gör att kostnader göms i overhead och allmänna konton.",
  },
  {
    title: "Brist på koppling mellan strategi och prissättning",
    description: "Strategier formuleras på ledningsnivå, men prissättning och kundrelationer lever sitt eget liv i organisationen.",
  },
  {
    title: "Data utan insikt",
    description: "Systemen innehåller mängder av siffror – men ingen helhetsvy över var marginalerna faktiskt skapas eller försvinner.",
  },
];

const methodologySteps = [
  {
    title: "Kartlägg marginalflöden",
    description: "Analysera var värde och kostnad faktiskt uppstår – per produkt, kund, och kanal.",
    duration: "2–4 veckor",
  },
  {
    title: "Identifiera förbättringshävstänger",
    description: "Kvantifiera påverkan av pris, mix, komplexitet, och effektivitet.",
    duration: "2 veckor",
  },
  {
    title: "Prioritera & förankra",
    description: "Visualisera beslutsunderlag för ledningsgruppen och bygg konsensus kring nästa steg.",
    duration: "1–2 veckor",
  },
];

const relatedChallenges = [
  { title: "Excel-beroendet", path: "/utmaningar/excel-beroende" },
  { title: "Data utan beslut", path: "/utmaningar/data-landfill" },
  { title: "Shelfware-problemet", path: "/utmaningar/shelfware" },
];

export default function Lonsamhetserosion() {
  return (
    <div className="min-h-screen bg-background">
      <PainPointNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${strategyImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-6 relative z-10" style={{ maxWidth: "1200px" }}>
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Hem</Link>
            {" > "}
            <span>Utmaningar</span>
            {" > "}
            <span className="text-foreground">Lönsamhetserosion</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lönsamhetserosion
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Omsättningen ökar – men marginalerna krymper.
          </p>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium" style={{ color: "#2B4C7E" }}>
            OEM & kontraktstillverkare (CM), 200–800 MSEK
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Känner ni igen er?
          </h2>
          <RecognitionChecklist items={recognitionItems} />
        </div>
      </section>

      {/* Hidden Cost Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Vad kostar detta egentligen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Dessa siffror baseras på branschdata och Ecstatic Consultings erfarenhet från nordiska tillverkningsföretag.
          </p>
        </div>
      </section>

      {/* Root Causes Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Varför händer detta?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rootCauses.map((cause, index) => (
              <RootCauseCard key={index} {...cause} />
            ))}
          </div>
        </div>
      </section>

      {/* Solution Approach */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Så här löser framgångsrika företag detta
          </h2>
          <MethodologyRoadmap steps={methodologySteps} />
          <p className="text-center text-muted-foreground mt-8">
            Målet är inte fler rapporter – utan tydliga beslut som förbättrar lönsamheten med mätbar effekt.
          </p>
        </div>
      </section>

      {/* Business Case Spotlight */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Hur ett tillverkningsföretag löste detta
          </h2>
          <BusinessCaseSpotlight
            company="OEM, 380 MSEK, familjeägt"
            challenge="Eftermarknaden växte men gick med förlust"
            approach="8 veckors datakartläggning och modellering av produkt- och serviceportföljen"
            results={[
              "12 MSEK i underprissatta serviceavtal identifierades",
              "3 MSEK i onödigt reservdelslager",
              "Servicemarginalen steg från -2% till +18%",
            ]}
            quote="Vi trodde service var en förmån för kunden – nu är det en affär."
          />
        </div>
      </section>

      {/* Related Challenges */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Andra utmaningar som ofta hänger ihop
          </h2>
          <RelatedChallenges challenges={relatedChallenges} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Redo att vända marginalerna uppåt?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/about#contact">Boka ett strategisamtal (45 min)</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/strategy/blog">Läs mer: Hur ni kan mäta lönsamhet bättre →</Link>
            </Button>
          </div>
        </div>
      </section>

      <PainPointFooter />
    </div>
  );
}
