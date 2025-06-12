export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analysis_runs: {
        Row: {
          businesses_added: number | null
          businesses_processed: number | null
          businesses_updated: number | null
          completed_at: string | null
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
          error_message?: string | null
          execution_time_seconds?: number | null
          id?: string
          run_config?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["analysis_status"]
        }
        Relationships: []
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
        Relationships: []
      }
      enrichment_data: {
        Row: {
          ai_summary: string | null
          automation_assessment: Json | null
          business_id: string
          competitor_analysis: Json | null
          confidence_score: number | null
          created_at: string
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
        ]
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
      [_ in never]: never
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
