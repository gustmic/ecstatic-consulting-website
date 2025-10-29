import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PainPointNav from "@/components/PainPointNav";
import PainPointFooter from "@/components/PainPointFooter";
import RecognitionChecklist from "@/components/challenges/RecognitionChecklist";
import StatCard from "@/components/challenges/StatCard";
import RootCauseAccordion from "@/components/challenges/RootCauseAccordion";
import MethodologyRoadmap from "@/components/challenges/MethodologyRoadmap";
import BusinessCaseSpotlight from "@/components/challenges/BusinessCaseSpotlight";
import RelatedChallengeCard from "@/components/challenges/RelatedChallengeCard";
import ProfitabilityPattern from "@/components/challenges/patterns/ProfitabilityPattern";
import { FileSpreadsheet, Database, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import strategyImage from "@/assets/strategy-bg.jpg";

const recognitionItems = [
  "Omsättningen växer med 8-15% årligen, men EBIT-marginalen har sjunkit från 12% till 4-6% på tre år",
  "Ni har ingen verklig kostnadstransparens per produkt, kund eller affärsområde — ekonomiavdelningen rapporterar på aggregerad nivå",
  "Eftermarknaden och service växer snabbt, men ingen vet om den faktiskt tjänar pengar eller subventioneras av produktförsäljning",
  "Produktmixen har exploderat — från 150 artikelnummer till 600+ på fem år — utan analys av vilka som är lönsamma",
  "Prissättning sker på 'marknadspris minus X%' eller baserat på historik, inte faktisk kostnad att leverera",
  "Ledningsgruppen diskuterar tillväxtmål och marknadsandelar, men sällan vilka kunder eller produkter som faktiskt driver vinst",
];

const statCards = [
  { 
    stat: "18-27%", 
    description: "av produktportföljen",
    tooltip: "går typiskt med förlust (men säljs ändå för att 'fylla kapacitet' eller 'behålla kund'). Baserat på analys av 40+ nordiska tillverkare." 
  },
  { 
    stat: "30-40%", 
    description: "av kunderna genererar 80% av vinsten",
    tooltip: "Resten går back eller i noll när man räknar verklig cost-to-serve. Pareto-principen gäller ofta extremt i tillverkning." 
  },
  { 
    stat: "4-8 MSEK", 
    description: "årlig vinstförbättring möjlig",
    tooltip: "För typiskt 400 MSEK-företag genom att fasa ut 20% olönsamma varianter och optimera produktmix." 
  },
  { 
    stat: "60%", 
    description: "saknar real-time profitability tracking",
    tooltip: "av tillverkare har ingen real-time visibility på projekts/orders lönsamhet. De vet först i bokslutet att Q2 gick back." 
  },
];

const rootCauses = [
  {
    title: "Komplexitet utan konsekvensanalys",
    description: "Produktportföljen växer organiskt — 'kunden ville ha blå istället för röd' — utan att någon stoppar upp och frågar: 'Vad kostar det att ha 47 färgvarianter istället för 12?' Setup-kostnader, lagerbindning och administration skalas inte med volym.",
  },
  {
    title: "Kostnadssystem från 1990-talet",
    description: "ERP-systemet allokerar overheadkostnader baserat på direkta timmar eller material — inte faktisk resursförbrukning. Enkla produkter i stora volymer överbelastas med kostnader, komplexa lågvolymprodukter underprissätts systematiskt.",
  },
  {
    title: "Eftermarknad ses som 'service', inte affär",
    description: "Service och reservdelar prissätts historiskt eller som 'goodwill' för att behålla kunder. Ingen har räknat på vad en servicetekniker kostar per timme hos kund, eller vad expressleverans av reservdel faktiskt kostar i fraktkostnader och rushed produktion.",
  },
  {
    title: "Silorapportering döljer sanningen",
    description: "Försäljning rapporterar omsättning per region. Produktion rapporterar OEE och output. Ekonomi rapporterar total EBIT. Ingen har en samlad vy av lönsamhet per produkt, kund och kanal — data finns i olika system som inte pratar med varandra.",
  },
];

const methodologySteps = [
  {
    title: "Fas 1: Kostnadstransparens",
    description: "Datainventering: Var finns kostnadsdata? Activity-Based Costing: Identifiera faktiska kostnadsdrivare. Product profitability model: Verklig contribution margin per SKU/kund.",
    duration: "4-6 veckor",
    deliverable: "Dashboard som visar vilka 20% av produkter/kunder som genererar 80% av vinsten",
  },
  {
    title: "Fas 2: Strategic pruning",
    description: "ABC-klassning av produktportföljen baserad på volym OCH marginal. Kundlönsamhetsanalys: Cost-to-serve modellering. Make/buy/kill-beslut för varje produktkategori.",
    duration: "8-12 veckor",
    deliverable: "Portfolio optimization roadmap med konkreta stop/continue/invest-beslut",
  },
  {
    title: "Fas 3: Strukturell förändring",
    description: "Prissättningsmodell baserad på verklig kostnad + strategiskt värde. Produktutvecklingsprocess med 'profitability gate'. Ongoing profitability tracking system.",
    duration: "6-18 månader",
    deliverable: "Sustainable profit management system inbyggt i verksamheten",
  },
];

const relatedChallenges = [
  {
    title: "Excel-beroendet",
    description: "Ekonomichefen har en magisk Excel-fil som ingen annan förstår. Det här är inte hållbart — och ofta symptom på att systemen inte ger den data ni behöver.",
    icon: FileSpreadsheet,
    category: "profitability" as const,
    path: "/utmaningar/excel-beroende"
  },
  {
    title: "Data utan beslut",
    description: "Ni har all kostnadsdata i ERP, CRM, produktionssystem — men ingen samlad vy. Lönsamhetsanalys kräver att data faktiskt kan kombineras.",
    icon: Database,
    category: "profitability" as const,
    path: "/utmaningar/data-landfill"
  },
  {
    title: "Shelfware-problemet",
    description: "Investerat miljoner i system som skulle ge transparency — men ingen använder dem. Tillbaka till Excel för att få jobbet gjort.",
    icon: Server,
    category: "efficiency" as const,
    path: "/utmaningar/shelfware"
  },
];

export default function Lonsamhetserosion() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Lönsamhetserosion | Ecstatic Consulting</title>
        <meta 
          name="description" 
          content="Omsättningen ökar men marginalerna krymper. Lär dig hur nordiska tillverkare (200-800 MSEK) löser lönsamhetserosion med konkreta resultat." 
        />
      </Helmet>
      <PainPointNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 min-h-[30vh]">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2D7A4F]/90 to-[#1e5234]/60">
          <div className="absolute inset-0 opacity-15">
            <ProfitabilityPattern />
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10" style={{ maxWidth: "1200px" }}>
          {/* Breadcrumb */}
          <nav className="text-sm text-white/70 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Hem</Link>
            {" > "}
            <span>Utmaningar</span>
            {" > "}
            <span className="text-white">Lönsamhetserosion</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Lönsamhetserosion
          </h1>
          <p className="text-xl text-white/90 mb-4">
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
          <RootCauseAccordion causes={rootCauses} />
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
            company="OEM, 450 MSEK, familjeägt, 3:e generationen"
            challenge="Omsättning hade växt från 320 MSEK till 450 MSEK på fem år (+40%), men EBIT-marginalen hade fallit från 11% till 4,5%. VD såg tillväxten som positiv, men styrelsen var orolig."
            results={[
              "EBIT-marginalen ökade från 4,5% till 9,2% utan att omsättningen sjönk",
              "Produktportföljen krympte från 394 till 287 SKU:er (-27%), men total volym ökade",
              "Eftermarknaden blev faktiskt lönsam: från 'falsk 18%' till verklig 22% marginal",
              "Kassaflöde förbättrades med 11 MSEK på ett år (mindre kapital bundet i slow-moving stock)"
            ]}
            quote="Vi trodde vi var duktiga på att växa. Men vi växte åt fel håll. När vi fick se siffrorna — att 42% av det vi sålde förlorade pengar — var det en chock. Men också en lättnad. Äntligen visste vi VAR vi skulle fokusera."
            discovery={`Vi kartlade kostnadsdrivare och byggde en product profitability model. Chockerande fynd:

- 42% av produktportföljen gick med förlust (168 av 394 SKU:er hade negativ contribution margin när man räknade rätt)

- Eftermarknaden såg lönsam ut på pappret (18% marginal), men gick faktiskt back när man inkluderade expressleveranskostnader, lagerränta på slow-movers, och fully loaded serviceteknikerkostnad

- De 8 största kunderna (som stod för 60% av volym) genererade endast 20% av vinsten — priserna var förhandlade ner till 'strategiska nivåer' som täckte direct cost men inte overhead

- De tre senaste produktlanseringarna var alla olönsamma — innovation drevs av teknisk möjlighet, inte kundbetalningsvilja`}
            detailedApproach={`Fas 1: Quick wins (vecka 5-10)
- Identifierade 47 produktvarianter med <5 orders/år och negativ marginal → discontinue decision
- Tre stora 'strategiska' kunder omförhandlades med data: 'vi förlorar pengar på denna prissättning'
- Eftermarknads-expressleverans: införde 30% pristillägg för akuta order

Fas 2: Strukturell förändring (vecka 11-16)
- Införde 'profitability gate' i produktutveckling: nytt SKU kräver minst 15% contribution margin i business case
- Segmenterade eftermarknaden: 'Standard service' vs 'Expresstjänst' (premium pricing)
- Byggde enkelt BI-verktyg som visar order profitability när säljare lägger offert`}
            secondaryInsight="De tre 'problemkunderna' som alltid klagade på pris och ville ha rabatter — de var faktiskt bland de mest lönsamma. Stora volymer, standardprodukter, få specialönskemål. Medan de 'strategiska' kunderna som var 'prestigefyllda' i portföljen kostade mer än de gav."
            categoryColor="#2D7A4F"
          />
        </div>
      </section>

      {/* Related Challenges */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6" style={{ maxWidth: "1200px" }}>
          <h2 className="font-serif text-3xl font-semibold mb-8 text-foreground">
            Andra utmaningar som ofta hänger ihop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedChallenges.map((challenge) => (
              <RelatedChallengeCard key={challenge.path} {...challenge} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#2D7A4F] to-[#1e5234]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Redo att se var era vinster faktiskt försvinner?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Vi kartlägger era cost-drivers och identifierar quick wins — helt utan kostnad eller åtagande. Typiskt resultat: 3-5 konkreta insights som kan förbättra lönsamheten med 2-4 MSEK årligen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/about#contact">Boka kostnadsfri profitabilitetsanalys (45 min)</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-[#2D7A4F]">
              <Link to="/strategy/blog">Läs mer: Hur ni kan mäta lönsamhet bättre →</Link>
            </Button>
          </div>
        </div>
      </section>

      <PainPointFooter />
    </div>
  );
}
