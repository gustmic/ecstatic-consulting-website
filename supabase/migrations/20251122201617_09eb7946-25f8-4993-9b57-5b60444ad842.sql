-- Drop the trigger that references the deleted has_overdue_followup column
DROP TRIGGER IF EXISTS update_contacts_overdue_followup ON contacts;

-- Drop the function that was used by the trigger
DROP FUNCTION IF EXISTS update_overdue_followup();