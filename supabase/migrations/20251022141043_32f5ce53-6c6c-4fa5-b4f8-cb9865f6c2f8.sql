-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_company TEXT NOT NULL,
  quote TEXT NOT NULL,
  service_area TEXT,
  image_url TEXT,
  logo_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Anyone can view testimonials"
ON public.testimonials
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update testimonials"
ON public.testimonials
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete testimonials"
ON public.testimonials
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();