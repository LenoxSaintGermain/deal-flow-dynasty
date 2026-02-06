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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analysis_runs: {
        Row: {
          businesses_added: number | null
          businesses_processed: number | null
          businesses_updated: number | null
          completed_at: string | null
          created_by: string | null
          error_message: string | null
          execution_time_seconds: number | null
          id: string
          run_config: Json | null
          started_at: string
          status: Database["public"]["Enums"]["analysis_status"]
        }
        Insert: {
          businesses_added?: number | null
          businesses_processed?: number | null
          businesses_updated?: number | null
          completed_at?: string | null
          created_by?: string | null
          error_message?: string | null
          execution_time_seconds?: number | null
          id?: string
          run_config?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["analysis_status"]
        }
        Update: {
          businesses_added?: number | null
          businesses_processed?: number | null
          businesses_updated?: number | null
          completed_at?: string | null
          created_by?: string | null
          error_message?: string | null
          execution_time_seconds?: number | null
          id?: string
          run_config?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["analysis_status"]
        }
        Relationships: [
          {
            foreignKeyName: "analysis_runs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_sources: {
        Row: {
          api_endpoint: string | null
          base_url: string | null
          created_at: string
          id: string
          is_active: boolean | null
          last_scraped_at: string | null
          name: string
          rate_limit_per_hour: number | null
          scraping_config: Json | null
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Insert: {
          api_endpoint?: string | null
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          name: string
          rate_limit_per_hour?: number | null
          scraping_config?: Json | null
          source_type: Database["public"]["Enums"]["source_type"]
        }
        Update: {
          api_endpoint?: string | null
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          name?: string
          rate_limit_per_hour?: number | null
          scraping_config?: Json | null
          source_type?: Database["public"]["Enums"]["source_type"]
        }
        Relationships: []
      }
      businesses: {
        Row: {
          annual_net_profit: number
          annual_revenue: number
          asking_price: number
          automation_opportunity_score: number | null
          business_name: string
          cap_rate: number | null
          composite_score: number | null
          created_at: string
          created_by: string | null
          description: string | null
          government_contracts: boolean | null
          id: string
          is_active: boolean | null
          last_analyzed_at: string | null
          location: string
          ownership_model:
            | Database["public"]["Enums"]["business_ownership_model"]
            | null
          payback_years: number | null
          resilience_factors: Json | null
          sector: string
          seller_financing: boolean | null
          source: string
          strategic_flags: Json | null
          updated_at: string
          url: string | null
        }
        Insert: {
          annual_net_profit: number
          annual_revenue: number
          asking_price: number
          automation_opportunity_score?: number | null
          business_name: string
          cap_rate?: number | null
          composite_score?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          government_contracts?: boolean | null
          id?: string
          is_active?: boolean | null
          last_analyzed_at?: string | null
          location: string
          ownership_model?:
            | Database["public"]["Enums"]["business_ownership_model"]
            | null
          payback_years?: number | null
          resilience_factors?: Json | null
          sector: string
          seller_financing?: boolean | null
          source: string
          strategic_flags?: Json | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          annual_net_profit?: number
          annual_revenue?: number
          asking_price?: number
          automation_opportunity_score?: number | null
          business_name?: string
          cap_rate?: number | null
          composite_score?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          government_contracts?: boolean | null
          id?: string
          is_active?: boolean | null
          last_analyzed_at?: string | null
          location?: string
          ownership_model?:
            | Database["public"]["Enums"]["business_ownership_model"]
            | null
          payback_years?: number | null
          resilience_factors?: Json | null
          sector?: string
          seller_financing?: boolean | null
          source?: string
          strategic_flags?: Json | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrichment_data: {
        Row: {
          ai_summary: string | null
          automation_assessment: Json | null
          business_id: string
          competitor_analysis: Json | null
          confidence_score: number | null
          created_at: string
          created_by: string | null
          financial_projections: Json | null
          growth_opportunities: Json | null
          id: string
          market_analysis: Json | null
          risk_factors: Json | null
          updated_at: string
        }
        Insert: {
          ai_summary?: string | null
          automation_assessment?: Json | null
          business_id: string
          competitor_analysis?: Json | null
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          financial_projections?: Json | null
          growth_opportunities?: Json | null
          id?: string
          market_analysis?: Json | null
          risk_factors?: Json | null
          updated_at?: string
        }
        Update: {
          ai_summary?: string | null
          automation_assessment?: Json | null
          business_id?: string
          competitor_analysis?: Json | null
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          financial_projections?: Json | null
          growth_opportunities?: Json | null
          id?: string
          market_analysis?: Json | null
          risk_factors?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrichment_data_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrichment_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          organization: string | null
          role: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          organization?: string | null
          role?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          organization?: string | null
          role?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          alert_threshold_score: number | null
          created_at: string
          id: string
          max_asking_price: number | null
          min_annual_profit: number | null
          min_automation_score: number | null
          notification_email: string | null
          notification_enabled: boolean | null
          preferred_sectors: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_threshold_score?: number | null
          created_at?: string
          id?: string
          max_asking_price?: number | null
          min_annual_profit?: number | null
          min_automation_score?: number | null
          notification_email?: string | null
          notification_enabled?: boolean | null
          preferred_sectors?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_threshold_score?: number | null
          created_at?: string
          id?: string
          max_asking_price?: number | null
          min_annual_profit?: number | null
          min_automation_score?: number | null
          notification_email?: string | null
          notification_enabled?: boolean | null
          preferred_sectors?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: { Args: { user_id?: string }; Returns: string }
    }
    Enums: {
      analysis_status: "pending" | "processing" | "completed" | "failed"
      business_ownership_model:
        | "owner_operated"
        | "manager_operated"
        | "franchise"
        | "corporate"
        | "partnership"
      source_type:
        | "bizbuysell"
        | "crexi"
        | "loopnet"
        | "bizquest"
        | "manual"
        | "api"
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
      analysis_status: ["pending", "processing", "completed", "failed"],
      business_ownership_model: [
        "owner_operated",
        "manager_operated",
        "franchise",
        "corporate",
        "partnership",
      ],
      source_type: [
        "bizbuysell",
        "crexi",
        "loopnet",
        "bizquest",
        "manual",
        "api",
      ],
    },
  },
} as const
