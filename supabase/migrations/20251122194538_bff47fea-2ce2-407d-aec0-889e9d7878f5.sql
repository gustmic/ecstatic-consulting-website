-- Drop triggers first, then recreate function with proper search_path
DROP TRIGGER IF EXISTS set_project_probability ON public.projects;
DROP TRIGGER IF EXISTS project_probability_trigger ON public.projects;

-- Recreate function with search_path set
CREATE OR REPLACE FUNCTION public.update_project_probability()
RETURNS TRIGGER AS $$
BEGIN
  NEW.probability_percent := CASE NEW.pipeline_status
    WHEN 'Meeting Booked' THEN 10
    WHEN 'Proposal Sent' THEN 50
    WHEN 'Won' THEN 100
    WHEN 'Lost' THEN 0
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Recreate trigger
CREATE TRIGGER set_project_probability
  BEFORE INSERT OR UPDATE OF pipeline_status ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_project_probability();