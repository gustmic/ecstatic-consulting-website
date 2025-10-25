import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserPreferences {
  date_format: string;
  default_contacts_view: string;
  items_per_page: number;
  email_notifications: boolean;
  theme: string;
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (data) {
        setPreferences(data);
      } else {
        // Default preferences
        setPreferences({
          date_format: "dd MMM yyyy",
          default_contacts_view: "table",
          items_per_page: 25,
          email_notifications: true,
          theme: "system",
        });
      }
      setLoading(false);
    };

    fetchPreferences();

    // Set up realtime subscription for preferences
    const channel = supabase
      .channel('user-preferences-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_preferences'
      }, () => {
        fetchPreferences();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { preferences, loading };
};
