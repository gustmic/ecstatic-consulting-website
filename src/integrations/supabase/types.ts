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
      companies: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          email: string
          engagement_score: number | null
          id: string
          is_primary: boolean | null
          lead_source: string | null
          linkedin: string | null
          linkedin_url: string | null
          name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          title: string | null
        }
        Insert: {
          company?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          engagement_score?: number | null
          id?: string
          is_primary?: boolean | null
          lead_source?: string | null
          linkedin?: string | null
          linkedin_url?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          company?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          engagement_score?: number | null
          id?: string
          is_primary?: boolean | null
          lead_source?: string | null
          linkedin?: string | null
          linkedin_url?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
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
      project_companies: {
        Row: {
          company_id: string
          created_at: string
          id: string
          project_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          project_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_companies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_contacts: {
        Row: {
          contact_id: string
          created_at: string
          id: string
          project_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          id?: string
          project_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_contacts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_hours: number | null
          created_at: string | null
          created_by: string | null
          end_date: string
          hourly_rate: number | null
          id: string
          lead_source: string | null
          name: string
          notes: string | null
          pipeline_status: Database["public"]["Enums"]["pipeline_status"]
          primary_contact_id: string
          probability_percent: number
          project_status:
            | Database["public"]["Enums"]["project_execution_status"]
            | null
          project_value_kr: number
          start_date: string
          type: Database["public"]["Enums"]["project_type"]
        }
        Insert: {
          actual_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date: string
          hourly_rate?: number | null
          id?: string
          lead_source?: string | null
          name: string
          notes?: string | null
          pipeline_status?: Database["public"]["Enums"]["pipeline_status"]
          primary_contact_id: string
          probability_percent?: number
          project_status?:
            | Database["public"]["Enums"]["project_execution_status"]
            | null
          project_value_kr: number
          start_date: string
          type: Database["public"]["Enums"]["project_type"]
        }
        Update: {
          actual_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string
          hourly_rate?: number | null
          id?: string
          lead_source?: string | null
          name?: string
          notes?: string | null
          pipeline_status?: Database["public"]["Enums"]["pipeline_status"]
          primary_contact_id?: string
          probability_percent?: number
          project_status?:
            | Database["public"]["Enums"]["project_execution_status"]
            | null
          project_value_kr?: number
          start_date?: string
          type?: Database["public"]["Enums"]["project_type"]
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["primary_contact_id"]
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
      pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost"
      project_execution_status: "Planned" | "Ongoing" | "Completed"
      project_type: "Assessment" | "Pilot" | "Integration"
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
      pipeline_status: ["Meeting Booked", "Proposal Sent", "Won", "Lost"],
      project_execution_status: ["Planned", "Ongoing", "Completed"],
      project_type: ["Assessment", "Pilot", "Integration"],
    },
  },
} as const
