import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface UserPreferences {
  id?: string;
  user_id: string;
  default_contacts_view: string;
  items_per_page: number;
  email_notifications: boolean;
  date_format: string;
  theme: string;
}

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState<string[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [stageProbabilities, setStageProbabilities] = useState<Record<string, number>>({});
  const [newStage, setNewStage] = useState("");
  const [newType, setNewType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [preferences, setPreferences] = useState<UserPreferences>({
    user_id: "",
    default_contacts_view: "table",
    items_per_page: 25,
    email_notifications: true,
    date_format: "dd MMM yyyy",
    theme: "system",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      await fetchSettings();
      setLoading(false);
    };

    checkAuth();

    // Set up realtime subscription for settings
    const channel = supabase
      .channel('settings-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'settings'
      }, () => {
        fetchSettings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const fetchSettings = async () => {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Fetch pipeline settings
    const { data: stagesData } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'stages')
      .single();

    const { data: typesData } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'service_types')
      .single();

    const { data: probData } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'stage_probabilities')
      .single();

    if (stagesData) setStages(stagesData.value as string[]);
    if (typesData) setServiceTypes(typesData.value as string[]);
    if (probData) setStageProbabilities(probData.value as Record<string, number>);

    // Fetch existing tags from contacts
    const { data: contactsData } = await supabase
      .from('contacts')
      .select('tags');
    
    const allTags = new Set<string>();
    contactsData?.forEach(contact => {
      contact.tags?.forEach((tag: string) => allTags.add(tag));
    });
    setTags(Array.from(allTags));

    // Fetch user preferences
    const { data: prefsData } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (prefsData) {
      setPreferences(prefsData);
    } else {
      setPreferences(prev => ({ ...prev, user_id: session.user.id }));
    }
  };

  const handleAddStage = async () => {
    if (!newStage.trim()) return;

    const updatedStages = [...stages, newStage.trim()];
    const updatedProbs = { ...stageProbabilities, [newStage.trim()]: 50 };

    await saveSettings('stages', updatedStages);
    await saveSettings('stage_probabilities', updatedProbs);

    setStages(updatedStages);
    setStageProbabilities(updatedProbs);
    setNewStage("");
  };

  const handleRemoveStage = async (stage: string) => {
    const updatedStages = stages.filter(s => s !== stage);
    const updatedProbs = { ...stageProbabilities };
    delete updatedProbs[stage];

    await saveSettings('stages', updatedStages);
    await saveSettings('stage_probabilities', updatedProbs);

    // Update all contacts that have this stage to null
    const { error: updateError } = await supabase
      .from('contacts')
      .update({ stage: null })
      .eq('stage', stage);
    
    if (updateError) {
      toast({
        variant: "destructive",
        title: "Error updating contacts",
        description: updateError.message,
      });
      return;
    }

    setStages(updatedStages);
    setStageProbabilities(updatedProbs);
    toast({ 
      title: "Pipeline stage removed",
      description: "All contacts with this stage have been updated"
    });
  };

  const handleAddServiceType = async () => {
    if (!newType.trim()) return;

    const updatedTypes = [...serviceTypes, newType.trim()];
    await saveSettings('service_types', updatedTypes);
    setServiceTypes(updatedTypes);
    setNewType("");
  };

  const handleRemoveServiceType = async (type: string) => {
    const updatedTypes = serviceTypes.filter(t => t !== type);
    await saveSettings('service_types', updatedTypes);
    
    // Update all projects that have this type to null
    const { error: updateError } = await supabase
      .from('projects')
      .update({ type: null })
      .eq('type', type);
    
    if (updateError) {
      toast({
        variant: "destructive",
        title: "Error updating projects",
        description: updateError.message,
      });
      return;
    }
    
    setServiceTypes(updatedTypes);
    toast({ 
      title: "Service type removed",
      description: "All projects with this type have been updated"
    });
  };

  const handleProbabilityChange = async (stage: string, value: number) => {
    const updatedProbs = { ...stageProbabilities, [stage]: value };
    await saveSettings('stage_probabilities', updatedProbs);
    setStageProbabilities(updatedProbs);
  };

  const saveSettings = async (key: string, value: any) => {
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error.message,
      });
    } else {
      toast({ title: "Settings saved" });
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) return;
    const updatedTags = [...tags, newTag.trim()];
    setTags(updatedTags);
    setNewTag("");
    toast({ title: "Tag added to available tags" });
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter(t => t !== tag);
    setTags(updatedTags);
    toast({ title: "Tag removed" });
  };

  const handleSavePreferences = async () => {
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert(preferences, { onConflict: 'user_id' });

      if (error) throw error;

      toast({ title: "Preferences saved successfully" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving preferences",
        description: error.message,
      });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link to="/admin/crm">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Configure your CRM preferences and system settings
          </p>

          <div className="space-y-6">
            {/* User Preferences */}
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Display Preferences</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Contacts View</Label>
                  <Select
                    value={preferences.default_contacts_view}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, default_contacts_view: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table View</SelectItem>
                      <SelectItem value="kanban">Kanban View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Items Per Page</Label>
                  <Select
                    value={preferences.items_per_page.toString()}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, items_per_page: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select
                    value={preferences.date_format}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, date_format: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd MMM yyyy">DD MMM YYYY (12 jun 2025)</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (2025-06-12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for follow-ups and updates
                    </p>
                  </div>
                  <Switch
                    checked={preferences.email_notifications}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, email_notifications: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Pipeline Stages</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Manage the stages in your sales pipeline and their probability weights
              </p>

              <div className="space-y-4 mb-4">
                {stages.map(stage => (
                  <div key={stage} className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
                    <Badge className="w-full justify-center text-center px-3 py-2">{stage}</Badge>
                    <div className="flex items-center gap-3">
                      <Label className="shrink-0">Probability: <span className="inline-block w-[3ch] text-right">{stageProbabilities[stage]}%</span></Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={stageProbabilities[stage] || 0}
                        onChange={(e) => handleProbabilityChange(stage, parseInt(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveStage(stage)}
                      className="shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="New stage name"
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                />
                <Button onClick={handleAddStage}>Add Stage</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Service Types</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Manage the types of services you offer
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                {serviceTypes.map(type => (
                  <Badge key={type} variant="outline" className="gap-2">
                    {type}
                    <button
                      onClick={() => handleRemoveServiceType(type)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="New service type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                />
                <Button onClick={handleAddServiceType}>Add Type</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Tags</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Manage available tags for contacts
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline" className="gap-2">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="New tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <Button onClick={handleAddTag}>Add Tag</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
