import { useEffect } from "react";
import MinimalNav from "@/components/MinimalNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Leaf, Network, Factory, CheckCircle2 } from "lucide-react";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";
import logo from "@/assets/logo.webp";
import linkedinLogo from "@/assets/linkedin-logo.png";
import { Helmet } from "react-helmet-async";

const IndexEN = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
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
    if (window.Calendly) return;
    
    if (document.querySelector('script[src*="calendly"]')) return;
    
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
    <div className="min-h-screen bg-background" lang="en">
      <Helmet>
        <html lang="en" />
        <title>Ecstatic Consulting - Sweden's Independent AM Advisors</title>
        <meta name="description" content="We help Nordic manufacturing companies (150-1000 MSEK) navigate from curiosity to strategic decision-making in additive manufacturing. Independent. Data-driven. Technically grounded." />
      </Helmet>
      <MinimalNav />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center observe opacity-0">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Sweden's Independent AM Advisors
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We help Nordic manufacturing companies (150-1000 MSEK) navigate from curiosity to strategic
              decision-making in additive manufacturing.
            </p>
            <p className="text-lg font-semibold text-foreground max-w-3xl mx-auto mt-4">Independent. Data-driven. Technically grounded.</p>
          </div>
        </div>
      </section>

      {/* How We Work With You */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe opacity-0">How We Work With You</h2>

          <div className="text-lg text-muted-foreground mb-16 max-w-3xl mx-auto observe opacity-0">
            <p className="mb-6">
              You're already familiar with additive manufacturing, but lack answers to critical questions:
              <br />
              Which processes suit AM? What's the real ROI? How do you integrate this into existing production? Which
              suppliers can you trust?
            </p>
            <p>
              We offer a structured process from evaluation to implementation.
              <br />
              Fixed price, clear deliverables, concrete timelines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: AM Readiness Assessment */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe opacity-0">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#2D7A4F]/10">
                  <Target className="h-6 w-6 text-[#2D7A4F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">AM Readiness Assessment</h3>
                  <p className="text-sm text-muted-foreground">4 weeks, Fixed Price</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                <li>3-5 components for AM manufacturing</li>
                <li>ROI per selected component</li>
                <li>Recommended suppliers</li>
                <li>6-month implementation plan for pilot project</li>
              </ul>
              <p className="text-sm font-semibold text-foreground border-t border-border pt-4 mt-4">
                → Should we invest in AM — or wait?
              </p>
            </div>

            {/* Card 2: Pilot */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe opacity-0">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#2D7A4F]/10">
                  <TrendingUp className="h-6 w-6 text-[#2D7A4F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">Pilot</h3>
                  <p className="text-sm text-muted-foreground">When you move forward</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                <li>Designed components for AM production</li>
                <li>Manufactured pilot parts via our network</li>
                <li>ROI validation based on actual costs</li>
                <li>Implementation plan for scaling</li>
              </ul>
              <p className="text-sm font-semibold text-foreground border-t border-border pt-4 mt-4">
                → Does AM work in our production?
              </p>
            </div>

            {/* Card 3: Full Integration */}
            <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-[#2D7A4F] observe opacity-0 relative">
              <div className="absolute top-0 right-0 bg-[#2D7A4F] text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                Lanseras 2026
              </div>
              <div className="flex items-start gap-3 mb-4 mt-6">
                <div className="p-3 rounded-lg bg-[#2D7A4F]/10">
                  <Factory className="h-6 w-6 text-[#2D7A4F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">Full Integration & Scaling</h3>
                  <p className="text-sm text-muted-foreground">Launching in 2026</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                <li>Scaling from 3-5 to 20-50 parts</li>
                <li>Full system integration (MES/ERP)</li>
                <li>Training and competence development</li>
                <li>Continuous process optimization</li>
              </ul>
              <p className="text-sm font-semibold text-foreground border-t border-border pt-4 mt-4">
                → From pilot to permanent production capability.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto observe opacity-0">
            <p className="text-lg text-muted-foreground">
              We project manage all steps from design to production and remain until it actually works —
              <br />
              no handoffs to junior teams.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 observe opacity-0">
            Part of Sweden's AM Ecosystem
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-12 shadow-sm border-l-4 border-[#2D7A4F] observe opacity-0">
              <div className="flex items-center gap-4 mb-6">
                <Network className="h-8 w-8 text-[#2D7A4F] flex-shrink-0" />
                <p className="text-lg text-muted-foreground">
                  We collaborate with Sweden's leading players in additive manufacturing
                  <br />— RISE, AMEXCI, Prototal —<br />
                  to give you access to the right expertise at the right time.
                </p>
              </div>
              <p className="text-lg text-muted-foreground">
                We are the channel connecting you with the right partner for pilot and production, without tying you to a specific supplier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-6 observe opacity-0">
            Proven expertise — strategic and technical
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 observe opacity-0">
            We are two partners with complementary strengths covering the full spectrum —
            <br />
            from strategic analysis to technical implementation.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Micael Card */}
            <Card className="p-8 shadow-sm hover:shadow-md transition-all observe opacity-0">
              <div className="flex items-start gap-6 mb-6">
                <img src={micaelImage} alt="Micael Gustavsson" className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-1">Micael Gustavsson</h3>
                  <p className="text-sm text-muted-foreground">Managing Partner - Strategy & Analytics</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  15+ years from management consulting and industry (Telenor, Nokia, Unibet). Builds business cases that CFOs actually believe in, and strategies that can be taken to the board.
                </p>
                <p>
                  Writes weekly about AM and Swedish manufacturing industry on LinkedIn (The Industrial Strategist) —
                  read by CEOs and production managers.
                </p>
              </div>
            </Card>

            {/* Reinhold Card */}
            <Card className="p-8 shadow-sm hover:shadow-md transition-all observe opacity-0">
              <div className="flex items-start gap-6 mb-6">
                <img src={reinholdImage} alt="Reinhold Rutks" className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-1">Reinhold Rutks</h3>
                  <p className="text-sm text-muted-foreground">Managing Partner - Technology & Innovation</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  40 years of industrial problem-solving in electrostatics, surface treatment, and process development. Has solved production problems that saved 10+ MSEK for Nordic manufacturing companies.
                </p>
                <p>
                  Knows which technologies actually work on the factory floor — not just in PowerPoints. Reads factory floors and validates whether AM fits or not.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl p-12 shadow-lg border-t-4 border-[#2D7A4F] observe opacity-0">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle2 className="h-8 w-8 text-[#2D7A4F] flex-shrink-0 mt-1" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Start a Conversation With Us —<br />
                Let's Explore Your Situation Together
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground mb-8">
              <p>
                We're seeking 1-2 manufacturing companies (150-1000 MSEK) who want to be first movers in building real AM capability during 2026.
              </p>
              <p>
                A 30-minute conversation where we discuss your specific challenges in additive manufacturing.
                We share perspectives on where Swedish manufacturing industry is heading, and evaluate if a collaboration fits both of us.
              </p>
              <p className="text-sm italic">
                No pitch. No PowerPoint. Just an honest conversation about your real challenges.
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={openCalendly}
                size="lg"
                className="bg-[#2D7A4F] hover:bg-[#246841] text-white px-8 py-6 text-lg"
              >
                Book a Call
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
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Ecstatic Consulting" className="h-10" />
              </div>
              <p className="text-sm text-muted-foreground">
                Sweden's independent AM advisors.
                <br />
                Helping Nordic manufacturing companies evaluate and implement additive manufacturing that's actually
                profitable.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Contact</h3>
              <p className="text-sm text-muted-foreground mb-2">Stockholm, Sweden</p>
              <a href="mailto:info@ecstatic.consulting" className="text-sm text-[#0A66C2] hover:underline">
                info@ecstatic.consulting
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Follow Us</h3>
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/company/ecstaticconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Ecstatic Consulting
                </a>
                <a
                  href="https://www.linkedin.com/in/micael-gustavsson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Micael Gustavsson (Strategy)
                </a>
                <a
                  href="https://www.linkedin.com/in/reinhold-rutks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0A66C2] hover:underline"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                  Reinhold Rutks (Technology)
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Ecstatic Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexEN;
