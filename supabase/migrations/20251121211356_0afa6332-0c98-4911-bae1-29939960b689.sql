-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_companies junction table
CREATE TABLE public.project_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, company_id)
);

-- Create project_contacts junction table
CREATE TABLE public.project_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, contact_id)
);

-- Modify contacts table
ALTER TABLE public.contacts 
  ADD COLUMN linkedin_url TEXT,
  ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  ADD COLUMN is_primary BOOLEAN DEFAULT false,
  DROP COLUMN IF EXISTS stage,
  DROP COLUMN IF EXISTS next_followup,
  DROP COLUMN IF EXISTS last_contacted,
  DROP COLUMN IF EXISTS has_overdue_followup;

-- Rename title to job_title temporarily if it exists, then back to title for clarity
-- (contacts.title already exists in schema, keep it)

-- Modify projects table
ALTER TABLE public.projects 
  RENAME COLUMN client_id TO primary_contact_id;

-- Create enum for project type
CREATE TYPE project_type AS ENUM ('Assessment', 'Pilot', 'Integration');

-- Create enum for pipeline status
CREATE TYPE pipeline_status AS ENUM ('Meeting Booked', 'Proposal Sent', 'Won', 'Lost');

-- Create enum for project status
CREATE TYPE project_execution_status AS ENUM ('Planned', 'Ongoing', 'Completed');

-- Add new columns to projects
ALTER TABLE public.projects
  ADD COLUMN pipeline_status pipeline_status NOT NULL DEFAULT 'Meeting Booked',
  ADD COLUMN project_status project_execution_status,
  ADD COLUMN probability_percent INTEGER NOT NULL DEFAULT 10,
  DROP COLUMN IF EXISTS status;

-- Alter type column to use new enum (first add new column, migrate data, drop old)
ALTER TABLE public.projects ADD COLUMN type_new project_type;
UPDATE public.projects SET type_new = 
  CASE 
    WHEN type = 'Assessment' THEN 'Assessment'::project_type
    WHEN type = 'Pilot' THEN 'Pilot'::project_type
    WHEN type = 'Integration' THEN 'Integration'::project_type
    ELSE 'Assessment'::project_type
  END;
ALTER TABLE public.projects DROP COLUMN type;
ALTER TABLE public.projects RENAME COLUMN type_new TO type;
ALTER TABLE public.projects ALTER COLUMN type SET NOT NULL;

-- Drop unused tables
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS interactions CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;

-- Clean up settings table
DELETE FROM public.settings WHERE key IN ('stages', 'service_types', 'stage_probabilities');

-- Enable RLS on new tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view all companies"
  ON public.companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update companies"
  ON public.companies FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete companies"
  ON public.companies FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for project_companies
CREATE POLICY "Users can view all project_companies"
  ON public.project_companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert project_companies"
  ON public.project_companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete project_companies"
  ON public.project_companies FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for project_contacts
CREATE POLICY "Users can view all project_contacts"
  ON public.project_contacts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert project_contacts"
  ON public.project_contacts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete project_contacts"
  ON public.project_contacts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Trigger for companies updated_at
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();