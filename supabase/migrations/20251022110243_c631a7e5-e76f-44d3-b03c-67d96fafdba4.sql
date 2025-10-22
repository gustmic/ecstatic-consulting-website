-- Fix function search path with CASCADE
DROP FUNCTION IF EXISTS update_overdue_followup() CASCADE;

CREATE OR REPLACE FUNCTION update_overdue_followup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.has_overdue_followup := (NEW.next_followup IS NOT NULL AND NEW.next_followup < CURRENT_DATE);
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER set_overdue_followup
BEFORE INSERT OR UPDATE ON contacts
FOR EACH ROW
EXECUTE FUNCTION update_overdue_followup();