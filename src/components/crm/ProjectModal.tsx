import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
  project?: any;
}

const ProjectModal = ({ isOpen, onClose, onSave, project }: ProjectModalProps) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    client_id: "",
    type: "Strategy",
    start_date: "",
    end_date: "",
    status: "Planned",
    project_value_kr: "",
    notes: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'service_types')
      .single();
    
    if (data?.value) {
      setServiceTypes(data.value as string[]);
    }
  };

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        client_id: project.client_id || "",
        type: project.type || "Strategy",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        status: project.status || "Planned",
        project_value_kr: project.project_value_kr?.toString() || "",
        notes: project.notes || "",
      });
    } else {
      setFormData({
        name: "",
        client_id: "",
        type: "Strategy",
        start_date: "",
        end_date: "",
        status: "Planned",
        project_value_kr: "",
        notes: "",
      });
    }
  }, [project, isOpen]);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('id, name, company')
      .order('name');
    setContacts(data || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      toast({
        variant: "destructive",
        title: "Invalid dates",
        description: "End date must be after start date",
      });
      return;
    }

    const projectData = {
      ...formData,
      project_value_kr: parseInt(formData.project_value_kr),
    };

    onSave(projectData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="client_id">Client *</Label>
            <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map(contact => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name} {contact.company && `(${contact.company})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Project Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="project_value_kr">Project Value (kr) *</Label>
            <Input
              id="project_value_kr"
              type="number"
              min="1"
              value={formData.project_value_kr}
              onChange={(e) => setFormData({ ...formData, project_value_kr: e.target.value })}
              required
              placeholder="150000"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {project ? "Update" : "Create"} Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
