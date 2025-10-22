import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import micaelImage from "@/assets/micael-gustavsson.webp";
import reinholdImage from "@/assets/reinhold-rutks.webp";

const About = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Static Banner */}
      <section className="relative h-[25vh] md:h-[30vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-primary/85 to-secondary/70"
        />
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6">
              About Ecstatic Consulting
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/90">
              Turning Static Challenges into Dynamic Solutions
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Ecstatic Consulting was founded on the belief that every business challenge is an opportunity 
              for transformation. We combine deep expertise in strategy, data analytics, and technology to 
              help organizations navigate complexity and achieve sustainable growth.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our approach is built on three pillars: strategic thinking that sees beyond the immediate, 
              data-driven insights that illuminate the path forward, and technological innovation that 
              transforms vision into reality. We partner with our clients to create lasting impact and 
              measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl font-bold mb-16 text-center">Our Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Micael Gustavsson */}
            <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-6 p-6">
                <div className="flex-shrink-0">
                  <img 
                    src={micaelImage} 
                    alt="Micael Gustavsson" 
                    className="w-40 h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold mb-1">Micael Gustavsson</h3>
                  <p className="text-primary font-medium text-sm mb-3">Head of Strategy & Analytics</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Micael has 15+ years of experience in strategy and business consulting guiding Fortune Global 500 companies like Compaq, Nokia, and Telenor through critical growth initiatives and business model innovations.
                  </p>
                </div>
              </div>
            </div>

            {/* Reinhold Rutks */}
            <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-6 p-6">
                <div className="flex-shrink-0">
                  <img 
                    src={reinholdImage} 
                    alt="Reinhold Rutks" 
                    className="w-40 h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold mb-1">Reinhold Rutks</h3>
                  <p className="text-primary font-medium text-sm mb-3">Head of Technology & Engineering</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Reinhold has 30+ years of experience of solving complex engineering challenges through both strategic and hands-on technical insight in manufacturing processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to transform your business? Let's start a conversation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project or challenge..."
                rows={6}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 px-6 mt-20">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Ecstatic Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
