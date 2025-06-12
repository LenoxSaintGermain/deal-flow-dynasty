
export interface Business {
  id: string;
  business_name: string;
  asking_price: number;
  annual_revenue: number;
  annual_net_profit: number;
  description: string;
  url: string;
  source: string;
  sector: string;
  location: string;
  automation_opportunity_score: number;
  composite_score: number;
  ownership_model: string;
  resilience_factors: string[];
  strategic_flags: string[];
  cap_rate: number;
  payback_years: number;
  seller_financing: boolean;
  government_contracts: boolean;
  created_at: string;
}
