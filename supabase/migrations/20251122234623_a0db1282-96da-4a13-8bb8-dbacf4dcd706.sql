-- Create trigger to automatically update probability_percent based on pipeline_status
DROP TRIGGER IF EXISTS project_probability_trigger ON projects;
CREATE TRIGGER project_probability_trigger
  BEFORE INSERT OR UPDATE OF pipeline_status ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_project_probability();