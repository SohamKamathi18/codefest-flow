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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string
          content: string
          created_at: string
          event_id: string
          id: string
          is_important: boolean
          target_audience: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          event_id: string
          id?: string
          is_important?: boolean
          target_audience?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          event_id?: string
          id?: string
          is_important?: boolean
          target_audience?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_favorites: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_favorites_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          registration_data: Json | null
          team_id: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          registration_data?: Json | null
          team_id?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          registration_data?: Json | null
          team_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          allow_solo_participants: boolean
          banner_url: string | null
          contact_email: string | null
          created_at: string
          description: string
          event_end: string
          event_start: string
          event_type: Database["public"]["Enums"]["event_type"]
          external_links: Json | null
          id: string
          judging_criteria: Json | null
          judging_end: string | null
          judging_start: string | null
          location: string | null
          max_team_size: number
          min_team_size: number
          organizer_id: string
          prizes: Json | null
          registration_end: string
          registration_start: string
          results_announced: string | null
          rules: string[] | null
          short_description: string | null
          sponsors: Json | null
          status: Database["public"]["Enums"]["event_status"]
          submission_deadline: string
          theme: string | null
          title: string
          total_participants: number | null
          total_teams: number | null
          tracks: string[] | null
          updated_at: string
        }
        Insert: {
          allow_solo_participants?: boolean
          banner_url?: string | null
          contact_email?: string | null
          created_at?: string
          description: string
          event_end: string
          event_start: string
          event_type?: Database["public"]["Enums"]["event_type"]
          external_links?: Json | null
          id?: string
          judging_criteria?: Json | null
          judging_end?: string | null
          judging_start?: string | null
          location?: string | null
          max_team_size?: number
          min_team_size?: number
          organizer_id: string
          prizes?: Json | null
          registration_end: string
          registration_start: string
          results_announced?: string | null
          rules?: string[] | null
          short_description?: string | null
          sponsors?: Json | null
          status?: Database["public"]["Enums"]["event_status"]
          submission_deadline: string
          theme?: string | null
          title: string
          total_participants?: number | null
          total_teams?: number | null
          tracks?: string[] | null
          updated_at?: string
        }
        Update: {
          allow_solo_participants?: boolean
          banner_url?: string | null
          contact_email?: string | null
          created_at?: string
          description?: string
          event_end?: string
          event_start?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          external_links?: Json | null
          id?: string
          judging_criteria?: Json | null
          judging_end?: string | null
          judging_start?: string | null
          location?: string | null
          max_team_size?: number
          min_team_size?: number
          organizer_id?: string
          prizes?: Json | null
          registration_end?: string
          registration_start?: string
          results_announced?: string | null
          rules?: string[] | null
          short_description?: string | null
          sponsors?: Json | null
          status?: Database["public"]["Enums"]["event_status"]
          submission_deadline?: string
          theme?: string | null
          title?: string
          total_participants?: number | null
          total_teams?: number | null
          tracks?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      judge_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string
          event_id: string
          id: string
          judge_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          event_id: string
          id?: string
          judge_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          event_id?: string
          id?: string
          judge_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "judge_assignments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string
          github_username: string | null
          graduation_year: number | null
          id: string
          linkedin_url: string | null
          skills: string[] | null
          university: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name: string
          github_username?: string | null
          graduation_year?: number | null
          id?: string
          linkedin_url?: string | null
          skills?: string[] | null
          university?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string
          github_username?: string | null
          graduation_year?: number | null
          id?: string
          linkedin_url?: string | null
          skills?: string[] | null
          university?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      submission_scores: {
        Row: {
          feedback: string | null
          id: string
          judge_id: string
          private_notes: string | null
          scored_at: string
          scores: Json
          submission_id: string
          total_score: number | null
          updated_at: string
        }
        Insert: {
          feedback?: string | null
          id?: string
          judge_id: string
          private_notes?: string | null
          scored_at?: string
          scores: Json
          submission_id: string
          total_score?: number | null
          updated_at?: string
        }
        Update: {
          feedback?: string | null
          id?: string
          judge_id?: string
          private_notes?: string | null
          scored_at?: string
          scores?: Json
          submission_id?: string
          total_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_scores_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          created_at: string
          demo_url: string | null
          description: string
          event_id: string
          file_urls: string[] | null
          github_url: string | null
          id: string
          presentation_url: string | null
          round_number: number
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string | null
          team_id: string
          technologies_used: string[] | null
          title: string
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          description: string
          event_id: string
          file_urls?: string[] | null
          github_url?: string | null
          id?: string
          presentation_url?: string | null
          round_number?: number
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string | null
          team_id: string
          technologies_used?: string[] | null
          title: string
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          description?: string
          event_id?: string
          file_urls?: string[] | null
          github_url?: string | null
          id?: string
          presentation_url?: string | null
          round_number?: number
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string | null
          team_id?: string
          technologies_used?: string[] | null
          title?: string
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string
          role: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          current_members: number
          demo_url: string | null
          description: string | null
          event_id: string
          github_repo: string | null
          id: string
          invite_code: string | null
          is_full: boolean
          max_members: number
          name: string
          team_leader_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_members?: number
          demo_url?: string | null
          description?: string | null
          event_id: string
          github_repo?: string | null
          id?: string
          invite_code?: string | null
          is_full?: boolean
          max_members?: number
          name: string
          team_leader_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_members?: number
          demo_url?: string | null
          description?: string | null
          event_id?: string
          github_repo?: string | null
          id?: string
          invite_code?: string | null
          is_full?: boolean
          max_members?: number
          name?: string
          team_leader_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
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
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_assigned_judge: {
        Args: { _event_id: string; _user_id: string }
        Returns: boolean
      }
      is_event_organizer: {
        Args: { _event_id: string; _user_id: string }
        Returns: boolean
      }
      is_team_member: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      event_status:
        | "draft"
        | "upcoming"
        | "active"
        | "judging"
        | "completed"
        | "cancelled"
      event_type: "online" | "offline" | "hybrid"
      submission_status: "draft" | "submitted" | "under_review" | "scored"
      user_role: "organizer" | "participant" | "judge" | "admin"
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
      event_status: [
        "draft",
        "upcoming",
        "active",
        "judging",
        "completed",
        "cancelled",
      ],
      event_type: ["online", "offline", "hybrid"],
      submission_status: ["draft", "submitted", "under_review", "scored"],
      user_role: ["organizer", "participant", "judge", "admin"],
    },
  },
} as const
