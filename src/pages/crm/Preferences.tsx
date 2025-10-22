import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const Preferences = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    user_id: "",
    default_contacts_view: "table",
    items_per_page: 25,
    email_notifications: true,
    date_format: "MM/dd/yyyy",
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

      await fetchPreferences(session.user.id);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchPreferences = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      toast({
        variant: "destructive",
        title: "Error loading preferences",
        description: error.message,
      });
      return;
    }

    if (data) {
      setPreferences(data);
    } else {
      setPreferences(prev => ({ ...prev, user_id: userId }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
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
    } finally {
      setSaving(false);
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
          <h1 className="font-serif text-4xl font-bold mb-2">Preferences</h1>
          <p className="text-muted-foreground mb-8">
            Customize your CRM experience
          </p>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Display Settings</h2>
              
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
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
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
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Notifications</h2>
              
              <div className="flex items-center justify-between">
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
            </Card>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/crm")}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
