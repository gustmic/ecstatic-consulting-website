import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  client_company: string;
  quote: string;
  service_area: string | null;
  image_url: string | null;
  logo_url: string | null;
}

interface TestimonialsCarouselProps {
  serviceArea: string;
}

const TestimonialsCarousel = ({ serviceArea }: TestimonialsCarouselProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("service_area", serviceArea)
        .eq("is_featured", true)
        .limit(3);

      if (data) {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, [serviceArea]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6 text-center">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Real results from businesses we've helped transform
          </p>

          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-accent/5">
                    <Quote className="h-12 w-12 text-primary mb-6 opacity-50" />
                    <blockquote className="text-lg md:text-xl text-foreground mb-8 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.client_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.client_name}</p>
                        <p className="text-muted-foreground">
                          {testimonial.client_title} at {testimonial.client_company}
                        </p>
                      </div>
                      {testimonial.logo_url && (
                        <img
                          src={testimonial.logo_url}
                          alt={testimonial.client_company}
                          className="ml-auto h-12 object-contain opacity-60"
                        />
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {testimonials.length > 1 && (
              <>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
