import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState<string[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [stageProbabilities, setStageProbabilities] = useState<Record<string, number>>({});
  const [newStage, setNewStage] = useState("");
  const [newType, setNewType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
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
  }, [navigate]);

  const fetchSettings = async () => {
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

    setStages(updatedStages);
    setStageProbabilities(updatedProbs);
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
    setServiceTypes(updatedTypes);
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
            Configure your CRM settings
          </p>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Pipeline Stages</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Manage the stages in your sales pipeline and their probability weights
              </p>

              <div className="space-y-4 mb-4">
                {stages.map(stage => (
                  <div key={stage} className="flex items-center gap-4">
                    <Badge className="min-w-[120px]">{stage}</Badge>
                    <div className="flex-1 flex items-center gap-3">
                      <Label className="min-w-[100px]">Probability: {stageProbabilities[stage]}%</Label>
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
