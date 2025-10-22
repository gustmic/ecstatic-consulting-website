-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CONTACTS TABLE
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  title TEXT,
  email TEXT NOT NULL UNIQUE,
  linkedin TEXT,
  phone TEXT,
  stage TEXT NOT NULL DEFAULT 'Lead',
  tags TEXT[],
  last_contacted DATE,
  next_followup DATE,
  has_overdue_followup BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Function to update overdue followups
CREATE OR REPLACE FUNCTION update_overdue_followup()
RETURNS TRIGGER AS $$
BEGIN
  NEW.has_overdue_followup := (NEW.next_followup IS NOT NULL AND NEW.next_followup < CURRENT_DATE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update overdue status
CREATE TRIGGER set_overdue_followup
BEFORE INSERT OR UPDATE ON contacts
FOR EACH ROW
EXECUTE FUNCTION update_overdue_followup();

-- INTERACTIONS TABLE
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  subject TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  attachment_url TEXT,
  logged_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id UUID NOT NULL REFERENCES contacts(id),
  type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL CHECK (end_date >= start_date),
  status TEXT NOT NULL DEFAULT 'Planned',
  project_value_kr INTEGER NOT NULL CHECK (project_value_kr > 0),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- SETTINGS TABLE
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('stages', '["Lead", "Prospect", "Proposal", "Contract", "Client"]'),
  ('stage_probabilities', '{"Lead": 20, "Prospect": 40, "Proposal": 60, "Contract": 100, "Client": 0}'),
  ('service_types', '["Strategy", "Technical", "Data Analytics"]');

-- INDEXES
CREATE INDEX idx_contacts_stage ON contacts(stage);
CREATE INDEX idx_contacts_followup ON contacts(next_followup) WHERE next_followup IS NOT NULL;
CREATE INDEX idx_contacts_overdue ON contacts(has_overdue_followup) WHERE has_overdue_followup = true;
CREATE INDEX idx_projects_dates_status ON projects(start_date, end_date, status);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_interactions_contact ON interactions(contact_id);
CREATE INDEX trgm_idx_contacts_name ON contacts USING gin (name gin_trgm_ops);
CREATE INDEX trgm_idx_contacts_company ON contacts USING gin (company gin_trgm_ops);

-- RLS POLICIES
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Contacts policies
CREATE POLICY "Users can view all contacts" ON contacts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert contacts" ON contacts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());
CREATE POLICY "Users can update contacts" ON contacts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete contacts" ON contacts FOR DELETE USING (auth.uid() IS NOT NULL);

-- Interactions policies
CREATE POLICY "Users can view all interactions" ON interactions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert interactions" ON interactions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND logged_by = auth.uid());
CREATE POLICY "Users can update interactions" ON interactions FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete interactions" ON interactions FOR DELETE USING (auth.uid() IS NOT NULL);

-- Projects policies
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());
CREATE POLICY "Users can update projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

-- Settings policies
CREATE POLICY "Users can view settings" ON settings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update settings" ON settings FOR ALL USING (auth.uid() IS NOT NULL);