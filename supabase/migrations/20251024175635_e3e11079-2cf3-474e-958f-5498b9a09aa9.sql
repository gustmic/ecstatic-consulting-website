-- Add analytics fields to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS actual_hours numeric,
ADD COLUMN IF NOT EXISTS hourly_rate numeric DEFAULT 1500,
ADD COLUMN IF NOT EXISTS lead_source text;

-- Add analytics fields to contacts table
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS engagement_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS lead_source text;

-- Add comment for documentation
COMMENT ON COLUMN projects.actual_hours IS 'Actual hours spent on the project';
COMMENT ON COLUMN projects.hourly_rate IS 'Hourly rate in SEK for this project';
COMMENT ON COLUMN projects.lead_source IS 'Where this project lead came from';
COMMENT ON COLUMN contacts.engagement_score IS 'Calculated engagement score (0-10)';
COMMENT ON COLUMN contacts.lead_source IS 'Where this contact came from';