import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Trash2, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatters";

interface Contact {
  id: string;
  name: string;
  email: string;
  company_id: string | null;
  phone: string | null;
  title: string | null;
  linkedin_url: string | null;
  stage: string;
  tags: string[] | null;
  notes: string | null;
  next_followup: string | null;
  has_overdue_followup: boolean;
  engagement_score: number;
  companies?: { name: string };
}

interface Interaction {
  id: string;
  type: string;
  subject: string | null;
  notes: string | null;
  interaction_date: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: string;
}

interface Company {
  id: string;
  name: string;
}

interface ContactDetailPanelProps {
  contact: Contact | null;
  onClose: () => void;
  onUpdate: () => void;
  companies: Company[];
}

const STAGES = ["Qualified Prospect", "First Meeting", "Proposal", "Client Won", "Client Lost", "No Stage"];

const ContactDetailPanel = ({ contact, onClose, onUpdate, companies }: ContactDetailPanelProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Contact>>({});
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (contact) {
      setFormData(contact);
      fetchInteractions();
      fetchTasks();
    }
  }, [contact]);

  const fetchInteractions = async () => {
    if (!contact) return;
    const { data } = await supabase
      .from("interactions")
      .select("*")
      .eq("contact_id", contact.id)
      .order("interaction_date", { ascending: false });
    if (data) setInteractions(data);
  };

  const fetchTasks = async () => {
    if (!contact) return;
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("contact_id", contact.id)
      .order("due_date", { ascending: true });
    if (data) setTasks(data);
  };

  const handleSave = async () => {
    if (!contact) return;

    const { error } = await supabase
      .from("contacts")
      .update({
        name: formData.name,
        email: formData.email,
        company_id: formData.company_id,
        title: formData.title,
        phone: formData.phone,
        linkedin_url: formData.linkedin_url,
        stage: formData.stage as any,
        next_followup: formData.next_followup,
        tags: formData.tags,
        notes: formData.notes,
      })
      .eq("id", contact.id);

    if (error) {
      toast({ title: "Error updating contact", variant: "destructive" });
    } else {
      toast({ title: "Contact updated" });
      onUpdate();
    }
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    const currentTags = formData.tags || [];
    setFormData({ ...formData, tags: [...currentTags, newTag.trim()] });
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = formData.tags || [];
    setFormData({ ...formData, tags: currentTags.filter(t => t !== tagToRemove) });
  };

  if (!contact) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-2/5 bg-background border-l shadow-lg overflow-y-auto z-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{contact.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="interactions" className="flex-1">Activity</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Label>Company</Label>
              <Select
                value={formData.company_id || ""}
                onValueChange={(value) => setFormData({ ...formData, company_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={formData.linkedin_url || ""}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              />
            </div>

            <div>
              <Label>Stage</Label>
              <Select
                value={formData.stage || ""}
                onValueChange={(value) => setFormData({ ...formData, stage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Next Follow-up</Label>
              <Input
                type="date"
                value={formData.next_followup || ""}
                onChange={(e) => setFormData({ ...formData, next_followup: e.target.value })}
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.tags || []).map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Notes</Label>
              <Textarea
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </TabsContent>

          <TabsContent value="interactions" className="mt-4">
            <div className="space-y-3">
              {interactions.map((interaction) => (
                <Card key={interaction.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{interaction.type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(interaction.interaction_date)}
                    </span>
                  </div>
                  {interaction.subject && (
                    <p className="font-medium mb-1">{interaction.subject}</p>
                  )}
                  {interaction.notes && (
                    <p className="text-sm text-muted-foreground">{interaction.notes}</p>
                  )}
                </Card>
              ))}
              {interactions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No activity yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{task.title}</p>
                    <Badge variant={task.status === "Completed" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  )}
                  {task.due_date && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(task.due_date)}
                    </p>
                  )}
                </Card>
              ))}
              {tasks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No tasks</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactDetailPanel;
