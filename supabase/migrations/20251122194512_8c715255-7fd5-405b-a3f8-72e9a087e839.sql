-- Enable pg_trgm extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  title TEXT,
  linkedin_url TEXT,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  is_primary BOOLEAN DEFAULT false,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  type TEXT NOT NULL,
  pipeline_status TEXT NOT NULL DEFAULT 'Meeting Booked',
  project_status TEXT,
  project_value_kr NUMERIC,
  probability_percent INTEGER DEFAULT 10,
  start_date DATE,
  end_date DATE,
  primary_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create project_contacts junction table
CREATE TABLE IF NOT EXISTS public.project_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, contact_id)
);

-- Create project_companies junction table
CREATE TABLE IF NOT EXISTS public.project_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, company_id)
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  items_per_page INTEGER NOT NULL DEFAULT 25,
  date_format TEXT NOT NULL DEFAULT 'dd MMM yyyy',
  theme TEXT NOT NULL DEFAULT 'system',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-update project probability based on pipeline status
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
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_project_probability ON public.projects;
CREATE TRIGGER set_project_probability
  BEFORE INSERT OR UPDATE OF pipeline_status ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_project_probability();

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
DROP POLICY IF EXISTS "Users can view all companies" ON public.companies;
CREATE POLICY "Users can view all companies"
  ON public.companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can insert companies" ON public.companies;
CREATE POLICY "Users can insert companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update companies" ON public.companies;
CREATE POLICY "Users can update companies"
  ON public.companies FOR UPDATE
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete companies" ON public.companies;
CREATE POLICY "Users can delete companies"
  ON public.companies FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for contacts
DROP POLICY IF EXISTS "Users can view all contacts" ON public.contacts;
CREATE POLICY "Users can view all contacts"
  ON public.contacts FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can insert contacts" ON public.contacts;
CREATE POLICY "Users can insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can update contacts" ON public.contacts;
CREATE POLICY "Users can update contacts"
  ON public.contacts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete contacts" ON public.contacts;
CREATE POLICY "Users can delete contacts"
  ON public.contacts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for projects
DROP POLICY IF EXISTS "Users can view all projects" ON public.projects;
CREATE POLICY "Users can view all projects"
  ON public.projects FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can insert projects" ON public.projects;
CREATE POLICY "Users can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

DROP POLICY IF EXISTS "Users can update projects" ON public.projects;
CREATE POLICY "Users can update projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete projects" ON public.projects;
CREATE POLICY "Users can delete projects"
  ON public.projects FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for project_contacts
DROP POLICY IF EXISTS "Users can view all project_contacts" ON public.project_contacts;
CREATE POLICY "Users can view all project_contacts"
  ON public.project_contacts FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can insert project_contacts" ON public.project_contacts;
CREATE POLICY "Users can insert project_contacts"
  ON public.project_contacts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete project_contacts" ON public.project_contacts;
CREATE POLICY "Users can delete project_contacts"
  ON public.project_contacts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for project_companies
DROP POLICY IF EXISTS "Users can view all project_companies" ON public.project_companies;
CREATE POLICY "Users can view all project_companies"
  ON public.project_companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can insert project_companies" ON public.project_companies;
CREATE POLICY "Users can insert project_companies"
  ON public.project_companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete project_companies" ON public.project_companies;
CREATE POLICY "Users can delete project_companies"
  ON public.project_companies FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for user_preferences
DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.user_preferences;
CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own preferences" ON public.user_preferences;
CREATE POLICY "Users can delete their own preferences"
  ON public.user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON public.contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_projects_primary_contact_id ON public.projects(primary_contact_id);
CREATE INDEX IF NOT EXISTS idx_projects_pipeline_status ON public.projects(pipeline_status);
CREATE INDEX IF NOT EXISTS idx_project_contacts_project_id ON public.project_contacts(project_id);
CREATE INDEX IF NOT EXISTS idx_project_contacts_contact_id ON public.project_contacts(contact_id);
CREATE INDEX IF NOT EXISTS idx_project_companies_project_id ON public.project_companies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_companies_company_id ON public.project_companies(company_id);

-- Create GIN indexes for fuzzy search
CREATE INDEX IF NOT EXISTS idx_companies_name_trgm ON public.companies USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_contacts_name_trgm ON public.contacts USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_projects_name_trgm ON public.projects USING gin(name gin_trgm_ops);