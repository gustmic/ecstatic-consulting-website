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
      document.head.removeChild(calendlyScript);
      document.head.removeChild(calendlyJs);
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
      <main className="max-w-3xl mx-auto py-12">
        <img src={logo} alt="Logo" className="mb-8 w-28" />
        <h1 className="text-3xl font-bold mb-6">
          Vi hjälper nordiska tillverkande företag (150-1000 MSEK) att navigera från nyfikenhet till strategiskt beslut
          inom additiv tillverkning.
        </h1>
        <p className="mb-4">Oberoende. Datadriven. Tekniskt grundad.</p>
        <p className="mb-8">
          Ni känner redan till additiv tillverkning, men saknar svar på kritiska frågor:
          <br />
          <span className="font-semibold">
            Vilka processer passar AM? Vad är verklig ROI? Hur integrerar ni detta i befintlig produktion? Vilka
            leverantörer kan ni lita på?
          </span>
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold">
            Vi erbjuder en strukturerad process från utvärdering till implementation.
          </h2>
          <p>Fast pris, tydliga leverabler, konkreta tidsramar.</p>
        </section>
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <h3 className="font-bold">4 veckor, Fast Pris</h3>
            <ul>
              <li>→ Ska vi satsa på AM – eller vänta?</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-bold">När ni går vidare</h3>
            <ul>
              <li>→ Fungerar AM i vår produktion?</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-bold">Lanseras under 2026</h3>
            <ul>
              <li>→ Från pilot till permanent produktionsförmåga.</li>
            </ul>
          </Card>
        </div>
        <section className="mb-8">
          <p>
            Vi projektleder alla steg från design till produktion och finns kvar tills det faktiskt fungerar – inga
            överlämningar till juniora team.
          </p>
          <p>
            Vi samarbetar med Sveriges ledande aktörer inom additiv tillverkning – RISE, AMEXCI, Prototal – för att ge
            er tillgång till rätt kompetens vid rätt tidpunkt.
          </p>
          <p>
            Vi är kanalen som kopplar ihop er med rätt partner för pilot och produktion, utan att binda er till en
            specifik leverantör.
          </p>
          <p>
            Vi är två partners med kompletterande styrkor som täcker hela spannet – från strategisk analys till teknisk
            implementation.
          </p>
        </section>
        <section className="mb-8">
          <div className="flex gap-4 items-center">
            <img src={micaelImage} alt="Micael Gustavsson" className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="font-bold">Managing Partner - Strategy & Analytics</h4>
              <p>
                15+ år från management consulting och industri (Telenor, Nokia, Unibet). Bygger business case som CFO:s
                faktiskt tror på, och strategier som kan tas till styrelsen.
              </p>
              <p>
                Skriver varje vecka om AM och svensk tillverkningsindustri på LinkedIn (The Industrial Strategist) –
                läst av VD:ar och produktionschefer.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-6">
            <img src={reinholdImage} alt="Reinhold Rutks" className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="font-bold">Managing Partner - Technology & Innovation</h4>
              <p>
                40 år av industriell problemlösning inom elektrostatik, ytbehandling och processutveckling. Har löst
                produktionsproblem som räddat 10+ MSEK för nordiska tillverkande företag.
              </p>
              <p>
                Vet vilka teknologier som faktiskt fungerar på fabriksgolvet – inte bara i PowerPoints. Läser
                fabriksgolv och validerar om AM passar eller inte.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold">
            Vi söker 1-2 tillverkande företag (150-1000 MSEK) som vill vara först ut med att bygga verklig AM-kompetens
            under 2026.
          </h2>
          <Button className="mt-4" onClick={openCalendly}>
            Boka samtal
          </Button>
        </section>
        <section>
          <p>Ett 30-minuters samtal där vi diskuterar era specifika utmaningar inom additiv tillverkning.</p>
          <p>
            Vi delar perspektiv på var svensk tillverkningsindustri är på väg, och utvärderar om ett samarbete passar
            oss båda.
          </p>
          <p>
            För rätt företag erbjuder vi 'AM Readiness Assessment' till introduktionspris, då vi prioriterar långsiktiga
            samarbeten framför volym.
          </p>
          <p>Ingen pitch. Ingen PowerPoint. Bara ett ärligt samtal om era verkliga utmaningar.</p>
        </section>
      </main>
    </div>
  );
};

export default Index;
