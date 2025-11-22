-- Drop GIN indexes that depend on pg_trgm
DROP INDEX IF EXISTS idx_companies_name_trgm;
DROP INDEX IF EXISTS idx_contacts_name_trgm;
DROP INDEX IF EXISTS idx_projects_name_trgm;

-- Drop extension from public schema
DROP EXTENSION IF EXISTS pg_trgm;

-- Recreate in extensions schema
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

-- Recreate GIN indexes
CREATE INDEX idx_companies_name_trgm ON public.companies USING gin(name extensions.gin_trgm_ops);
CREATE INDEX idx_contacts_name_trgm ON public.contacts USING gin(name extensions.gin_trgm_ops);
CREATE INDEX idx_projects_name_trgm ON public.projects USING gin(name extensions.gin_trgm_ops);