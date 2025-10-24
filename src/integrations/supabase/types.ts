export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          id: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string | null
          created_by: string | null
          email: string
          engagement_score: number | null
          has_overdue_followup: boolean | null
          id: string
          last_contacted: string | null
          lead_source: string | null
          linkedin: string | null
          name: string
          next_followup: string | null
          notes: string | null
          phone: string | null
          stage: string
          tags: string[] | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          engagement_score?: number | null
          has_overdue_followup?: boolean | null
          id?: string
          last_contacted?: string | null
          lead_source?: string | null
          linkedin?: string | null
          name: string
          next_followup?: string | null
          notes?: string | null
          phone?: string | null
          stage?: string
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          engagement_score?: number | null
          has_overdue_followup?: boolean | null
          id?: string
          last_contacted?: string | null
          lead_source?: string | null
          linkedin?: string | null
          name?: string
          next_followup?: string | null
          notes?: string | null
          phone?: string | null
          stage?: string
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      interactions: {
        Row: {
          attachment_url: string | null
          contact_id: string
          created_at: string | null
          date: string
          id: string
          logged_by: string | null
          notes: string | null
          subject: string | null
          type: string
        }
        Insert: {
          attachment_url?: string | null
          contact_id: string
          created_at?: string | null
          date?: string
          id?: string
          logged_by?: string | null
          notes?: string | null
          subject?: string | null
          type: string
        }
        Update: {
          attachment_url?: string | null
          contact_id?: string
          created_at?: string | null
          date?: string
          id?: string
          logged_by?: string | null
          notes?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          actual_hours: number | null
          client_id: string
          created_at: string | null
          created_by: string | null
          end_date: string
          hourly_rate: number | null
          id: string
          lead_source: string | null
          name: string
          notes: string | null
          project_value_kr: number
          start_date: string
          status: string
          type: string
        }
        Insert: {
          actual_hours?: number | null
          client_id: string
          created_at?: string | null
          created_by?: string | null
          end_date: string
          hourly_rate?: number | null
          id?: string
          lead_source?: string | null
          name: string
          notes?: string | null
          project_value_kr: number
          start_date: string
          status?: string
          type: string
        }
        Update: {
          actual_hours?: number | null
          client_id?: string
          created_at?: string | null
          created_by?: string | null
          end_date?: string
          hourly_rate?: number | null
          id?: string
          lead_source?: string | null
          name?: string
          notes?: string | null
          project_value_kr?: number
          start_date?: string
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_company: string
          client_name: string
          client_title: string | null
          created_at: string
          id: string
          image_url: string | null
          is_featured: boolean
          logo_url: string | null
          quote: string
          service_area: string | null
          updated_at: string
        }
        Insert: {
          client_company: string
          client_name: string
          client_title?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          logo_url?: string | null
          quote: string
          service_area?: string | null
          updated_at?: string
        }
        Update: {
          client_company?: string
          client_name?: string
          client_title?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          logo_url?: string | null
          quote?: string
          service_area?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          date_format: string
          default_contacts_view: string
          email_notifications: boolean
          id: string
          items_per_page: number
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_format?: string
          default_contacts_view?: string
          email_notifications?: boolean
          id?: string
          items_per_page?: number
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_format?: string
          default_contacts_view?: string
          email_notifications?: boolean
          id?: string
          items_per_page?: number
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
