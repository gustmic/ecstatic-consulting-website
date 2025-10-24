-- Make stage column nullable to allow for removed stages
ALTER TABLE contacts ALTER COLUMN stage DROP NOT NULL;

-- Update contacts with stages that no longer exist to NULL
UPDATE contacts 
SET stage = NULL 
WHERE stage NOT IN (
  SELECT jsonb_array_elements_text(value) 
  FROM settings 
  WHERE key = 'stages'
);