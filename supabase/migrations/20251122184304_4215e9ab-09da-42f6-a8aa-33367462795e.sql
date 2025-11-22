-- Drop existing triggers and tables in correct order
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;

DROP TABLE IF EXISTS project_contacts CASCADE;
DROP TABLE IF EXISTS project_companies CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS interactions CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;

-- Drop existing enums
DROP TYPE IF EXISTS pipeline_status CASCADE;
DROP TYPE IF EXISTS project_execution_status CASCADE;
DROP TYPE IF EXISTS project_type CASCADE;

-- Create new enums
CREATE TYPE contact_stage AS ENUM (
  'Qualified Prospect',
  'First Meeting',
  'Proposal',
  'Client Won',
  'Client Lost',
  'No Stage'
);

CREATE TYPE interaction_type AS ENUM (
  'Email',
  'Call',
  'Meeting',
  'Note'
);

CREATE TYPE task_status AS ENUM (
  'Pending',
  'Completed',
  'Overdue'
);

CREATE TYPE project_status AS ENUM (
  'Planning',
  'Active',
  'On Hold',
  'Completed',
  'Cancelled'
);

-- Create companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  phone TEXT,
  title TEXT,
  linkedin_url TEXT,
  stage contact_stage NOT NULL DEFAULT 'No Stage',
  tags TEXT[],
  notes TEXT,
  next_followup DATE,
  has_overdue_followup BOOLEAN DEFAULT false,
  engagement_score INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  type TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'Planning',
  start_date DATE,
  end_date DATE,
  project_value_kr NUMERIC,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create interactions table
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  type interaction_type NOT NULL,
  subject TEXT,
  notes TEXT,
  interaction_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status task_status NOT NULL DEFAULT 'Pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT task_must_have_contact_or_project CHECK (contact_id IS NOT NULL OR project_id IS NOT NULL)
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  items_per_page INTEGER NOT NULL DEFAULT 25,
  date_format TEXT NOT NULL DEFAULT 'MM/dd/yyyy',
  theme TEXT NOT NULL DEFAULT 'system',
  default_contacts_view TEXT NOT NULL DEFAULT 'table',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view all companies"
  ON companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert companies"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update companies"
  ON companies FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete companies"
  ON companies FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for contacts
CREATE POLICY "Users can view all contacts"
  ON contacts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Users can update contacts"
  ON contacts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete contacts"
  ON contacts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for projects
CREATE POLICY "Users can view all projects"
  ON projects FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Users can update projects"
  ON projects FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete projects"
  ON projects FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for interactions
CREATE POLICY "Users can view all interactions"
  ON interactions FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert interactions"
  ON interactions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Users can update interactions"
  ON interactions FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete interactions"
  ON interactions FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for tasks
CREATE POLICY "Users can view all tasks"
  ON tasks FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Users can update tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete tasks"
  ON tasks FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create function to update overdue followup status
CREATE OR REPLACE FUNCTION update_overdue_followup()
RETURNS TRIGGER AS $$
BEGIN
  NEW.has_overdue_followup := (NEW.next_followup IS NOT NULL AND NEW.next_followup < CURRENT_DATE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for overdue followup
CREATE TRIGGER update_contacts_overdue_followup
  BEFORE INSERT OR UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_overdue_followup();