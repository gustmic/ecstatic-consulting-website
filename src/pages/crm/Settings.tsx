import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState({
    items_per_page: 25,
    date_format: "dd MMM yyyy",
    theme: "system",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin");
        return;
      }

      setUserId(session.user.id);
      fetchPreferences(session.user.id);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const fetchPreferences = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error && data) {
      setPreferences({
        items_per_page: data.items_per_page,
        date_format: data.date_format,
        theme: data.theme,
      });
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    setSaving(true);
    const { error } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: userId,
        items_per_page: preferences.items_per_page,
        date_format: preferences.date_format,
        theme: preferences.theme,
      })
      .eq("user_id", userId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Preferences saved",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CRMNav />
        <div className="container mx-auto px-6 py-8 pt-24">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8 pt-24 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold mb-6">Settings</h1>

        <Card className="p-6">
          <h2 className="font-serif text-2xl font-semibold mb-6">
            Display Preferences
          </h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="items_per_page">Items per page</Label>
              <Select
                value={preferences.items_per_page.toString()}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    items_per_page: parseInt(value),
                  })
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

            <div>
              <Label htmlFor="date_format">Date format</Label>
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
                  <SelectItem value="dd MMM yyyy">dd MMM yyyy (12 Jun 2025)</SelectItem>
                  <SelectItem value="yyyy-MM-dd">yyyy-MM-dd (2025-06-12)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
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

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
