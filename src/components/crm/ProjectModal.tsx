import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => Promise<void>;
  project?: Project | null;
}

interface Project {
  id: string;
  name: string;
  type: "Assessment" | "Pilot" | "Integration";
  pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
  project_status: "Planned" | "Ongoing" | "Completed" | null;
  primary_contact_id: string;
  project_value_kr: number;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
}

interface ProjectFormData {
  name: string;
  type: "Assessment" | "Pilot" | "Integration";
  pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
  project_status: "Planned" | "Ongoing" | "Completed" | null;
  primary_contact_id: string;
  company_ids: string[];
  related_contact_ids: string[];
  project_value_kr: number;
  start_date: string;
  end_date: string;
  notes: string;
}

interface Contact {
  id: string;
  name: string;
  company_id: string;
  companies?: { name: string };
}

interface Company {
  id: string;
  name: string;
}

const DEFAULT_VALUES = {
  Assessment: 750000,
  Pilot: 1500000,
  Integration: 2000000,
};

export const ProjectModal = ({ isOpen, onClose, onSave, project }: ProjectModalProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    type: "Assessment",
    pipeline_status: "Meeting Booked",
    project_status: null,
    primary_contact_id: "",
    company_ids: [],
    related_contact_ids: [],
    project_value_kr: DEFAULT_VALUES.Assessment,
    start_date: "",
    end_date: "",
    notes: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [saving, setSaving] = useState(false);
  const [valueDisplay, setValueDisplay] = useState<string>("");

  // Format number with Swedish thousand separators
  const formatNumberDisplay = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Parse formatted number back to integer
  const parseNumberInput = (value: string): number => {
    const cleaned = value.replace(/\s/g, '');
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    fetchContactsAndCompanies();
  }, []);

  useEffect(() => {
    if (project) {
      loadProjectData(project);
    } else {
      setFormData({
        name: "",
        type: "Assessment",
        pipeline_status: "Meeting Booked",
        project_status: null,
        primary_contact_id: "",
        company_ids: [],
        related_contact_ids: [],
        project_value_kr: DEFAULT_VALUES.Assessment,
        start_date: "",
        end_date: "",
        notes: "",
      });
      setValueDisplay(formatNumberDisplay(DEFAULT_VALUES.Assessment));
    }
  }, [project, isOpen]);

  useEffect(() => {
    console.log('Form data start_date:', formData.start_date);
    console.log('Form data end_date:', formData.end_date);
    console.log('Type of start_date:', typeof formData.start_date);
    console.log('Type of end_date:', typeof formData.end_date);
  }, [formData.start_date, formData.end_date]);

  const loadProjectData = async (project: Project) => {
    const { data: projectCompanies } = await supabase
      .from("project_companies")
      .select("company_id")
      .eq("project_id", project.id);
    
    const { data: projectContacts } = await supabase
      .from("project_contacts")
      .select("contact_id")
      .eq("project_id", project.id);

    setFormData({
      name: project.name,
      type: project.type,
      pipeline_status: project.pipeline_status,
      project_status: project.project_status,
      primary_contact_id: project.primary_contact_id,
      company_ids: projectCompanies?.map(pc => pc.company_id) || [],
      related_contact_ids: projectContacts?.map(pc => pc.contact_id) || [],
      project_value_kr: project.project_value_kr,
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      notes: project.notes || "",
    });

    setValueDisplay(formatNumberDisplay(project.project_value_kr));
  };

  const fetchContactsAndCompanies = async () => {
    const { data: contactsData } = await supabase
      .from("contacts")
      .select("id, name, company_id, companies(name)")
      .order("name");
    
    const { data: companiesData } = await supabase
      .from("companies")
      .select("id, name")
      .order("name");

    if (contactsData) setContacts(contactsData);
    if (companiesData) setCompanies(companiesData);
  };

  const handleTypeChange = (type: "Assessment" | "Pilot" | "Integration") => {
    const newValue = DEFAULT_VALUES[type];
    setFormData({
      ...formData,
      type,
      project_value_kr: newValue,
    });
    setValueDisplay(formatNumberDisplay(newValue));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseNumberInput(inputValue);
    
    setFormData({ ...formData, project_value_kr: numericValue });
    setValueDisplay(formatNumberDisplay(numericValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.primary_contact_id || formData.company_ids.length === 0) {
      return;
    }

    if (formData.pipeline_status === "Won") {
      if (!formData.project_status || !formData.start_date || !formData.end_date) {
        return;
      }
    }
    
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    onClose();
  };

  const requiresProjectStatus = formData.pipeline_status === "Won";
  
  // Filter contacts based on selected companies
  const filteredContacts = formData.company_ids.length > 0 
    ? contacts.filter(contact => formData.company_ids.includes(contact.company_id))
    : contacts;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Row 1: Project Name (full width) */}
            <div className="col-span-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Project name"
                required
              />
            </div>

            {/* Row 2: Type | Value */}
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => handleTypeChange(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Pilot">Pilot</SelectItem>
                  <SelectItem value="Integration">Integration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value">Value (kr) *</Label>
              <Input
                id="value"
                type="text"
                value={valueDisplay}
                onChange={handleValueChange}
                placeholder="0"
                required
              />
            </div>

            {/* Row 3: Pipeline Status | Companies (multi-select) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="pipeline_status">Pipeline Status *</Label>
                <Select
                  value={formData.pipeline_status}
                  onValueChange={(value: any) => setFormData({ ...formData, pipeline_status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meeting Booked">Meeting Booked</SelectItem>
                    <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {requiresProjectStatus && (
                <div>
                  <Label htmlFor="project_status">Project Status *</Label>
                  <Select
                    value={formData.project_status || ""}
                    onValueChange={(value: any) => setFormData({ ...formData, project_status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="companies">Companies * (hold Ctrl/Cmd for multiple)</Label>
              <select
                id="companies"
                multiple
                className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.company_ids}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, company_ids: selected });
                }}
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {formData.company_ids.length}
              </p>
            </div>

            {/* Row 4: Primary Contact (filtered) | Related Contacts (filtered) */}
            <div>
              <Label htmlFor="primary_contact">Primary Contact *</Label>
              <Select
                value={formData.primary_contact_id}
                onValueChange={(value) => setFormData({ ...formData, primary_contact_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary contact" />
                </SelectTrigger>
                <SelectContent>
                  {filteredContacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} ({(contact.companies as any)?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.company_ids.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Filtered by selected companies
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="related_contacts">Related Contacts (optional, hold Ctrl/Cmd for multiple)</Label>
              <select
                id="related_contacts"
                multiple
                className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.related_contact_ids}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, related_contact_ids: selected });
                }}
              >
                {filteredContacts
                  .filter(c => c.id !== formData.primary_contact_id)
                  .map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({(contact.companies as any)?.name})
                    </option>
                  ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {formData.related_contact_ids.length}
                {formData.company_ids.length > 0 && " (filtered by companies)"}
              </p>
            </div>

            {/* Row 5: Start Date | End Date (only when Won) */}
            {requiresProjectStatus && (
              <>
                <div>
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">End Date *</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    min={formData.start_date}
                    required
                  />
                </div>
              </>
            )}

            {/* Row 6: Notes (full width) */}
            <div className="col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : project ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
