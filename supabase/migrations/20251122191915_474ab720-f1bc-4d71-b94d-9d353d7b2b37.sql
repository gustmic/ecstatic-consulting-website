
-- 1. DROP UNUSED TABLES
DROP TABLE IF EXISTS interactions CASCADE;

-- 2. MODIFY CONTACTS TABLE - Remove old columns
ALTER TABLE contacts 
  DROP COLUMN IF EXISTS stage,
  DROP COLUMN IF EXISTS next_followup,
  DROP COLUMN IF EXISTS has_overdue_followup,
  DROP COLUMN IF EXISTS tags,
  DROP COLUMN IF EXISTS engagement_score;

-- Add new columns to contacts
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT FALSE;

-- 3. MODIFY PROJECTS TABLE
-- Rename contact_id to primary_contact_id if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'contact_id'
  ) THEN
    ALTER TABLE projects RENAME COLUMN contact_id TO primary_contact_id;
  END IF;
END $$;

-- Add primary_contact_id if it doesn't exist
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS primary_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL;

-- Drop old status column
ALTER TABLE projects
  DROP COLUMN IF EXISTS status;

-- Add new status columns
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS pipeline_status TEXT NOT NULL DEFAULT 'Meeting Booked' 
    CHECK (pipeline_status IN ('Meeting Booked', 'Proposal Sent', 'Won', 'Lost')),
  ADD COLUMN IF NOT EXISTS project_status TEXT 
    CHECK (project_status IN ('Planned', 'Ongoing', 'Completed')),
  ADD COLUMN IF NOT EXISTS probability_percent INTEGER DEFAULT 10;

-- Update type column constraints
ALTER TABLE projects
  DROP CONSTRAINT IF EXISTS projects_type_check;

ALTER TABLE projects
  ADD CONSTRAINT projects_type_check 
  CHECK (type IN ('Assessment', 'Pilot', 'Integration'));

-- 4. CREATE PROJECT_COMPANIES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS project_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, company_id)
);

-- 5. CREATE PROJECT_CONTACTS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS project_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, contact_id)
);

-- 6. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_contacts_company ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_pipeline_status ON projects(pipeline_status);
CREATE INDEX IF NOT EXISTS idx_projects_primary_contact ON projects(primary_contact_id);
CREATE INDEX IF NOT EXISTS idx_project_companies_project ON project_companies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_companies_company ON project_companies(company_id);
CREATE INDEX IF NOT EXISTS idx_project_contacts_project ON project_contacts(project_id);
CREATE INDEX IF NOT EXISTS idx_project_contacts_contact ON project_contacts(contact_id);

-- 7. CREATE FUNCTION TO AUTO-UPDATE probability_percent
CREATE OR REPLACE FUNCTION update_project_probability()
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

DROP TRIGGER IF EXISTS project_probability_trigger ON projects;

CREATE TRIGGER project_probability_trigger
  BEFORE INSERT OR UPDATE OF pipeline_status ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_project_probability();

-- 8. ENABLE RLS ON NEW TABLES
ALTER TABLE project_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_contacts ENABLE ROW LEVEL SECURITY;

-- 9. CREATE RLS POLICIES FOR JUNCTION TABLES
CREATE POLICY "Users can view all project_companies" 
  ON project_companies FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert project_companies" 
  ON project_companies FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete project_companies" 
  ON project_companies FOR DELETE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view all project_contacts" 
  ON project_contacts FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert project_contacts" 
  ON project_contacts FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete project_contacts" 
  ON project_contacts FOR DELETE 
  USING (auth.uid() IS NOT NULL);
