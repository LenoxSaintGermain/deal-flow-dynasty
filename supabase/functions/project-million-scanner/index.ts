import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BusinessData {
  business_name: string;
  asking_price: number;
  annual_revenue: number;
  annual_net_profit: number;
  description?: string;
  url?: string;
  source: string;
  sector: string;
  location: string;
}

interface ComprehensiveAnalysis {
  automation_opportunity_score: number;
  composite_score: number;
  ownership_model: string;
  resilience_factors: string[];
  strategic_flags: string[];
  cap_rate: number;
  payback_years: number;
  seller_financing: boolean;
  government_contracts: boolean;
  financial_analysis: any;
  market_analysis: any;
  strategic_assessment: any;
  risk_evaluation: any;
  investment_thesis: string;
  executive_summary: string;
}

// Enhanced AI Analysis with Multiple Models
async function performComprehensiveAnalysis(business: BusinessData): Promise<ComprehensiveAnalysis> {
  console.log(`Starting comprehensive analysis for: ${business.business_name}`);
  
  // Parallel analysis using different AI models for specialized tasks
  const [financialAnalysis, strategicAnalysis, marketAnalysis, riskAnalysis] = await Promise.all([
    analyzeFinancials(business),
    analyzeStrategy(business),
    analyzeMarket(business),
    analyzeRisks(business)
  ]);

  // Generate investment thesis using Claude
  const investmentThesis = await generateInvestmentThesis(business, {
    financialAnalysis,
    strategicAnalysis,
    marketAnalysis,
    riskAnalysis
  });

  // Create executive summary using GPT-4
  const executiveSummary = await generateExecutiveSummary(business, {
    financialAnalysis,
    strategicAnalysis,
    marketAnalysis,
    riskAnalysis,
    investmentThesis
  });

  // Calculate composite scores
  const cap_rate = (business.annual_net_profit / business.asking_price) * 100;
  const payback_years = business.asking_price / business.annual_net_profit;
  
  return {
    automation_opportunity_score: financialAnalysis.automation_score || 0.7,
    composite_score: calculateCompositeScore(financialAnalysis, strategicAnalysis, marketAnalysis, riskAnalysis),
    ownership_model: strategicAnalysis.recommended_ownership_model || 'semi-absentee',
    resilience_factors: riskAnalysis.resilience_factors || ['essential-service'],
    strategic_flags: strategicAnalysis.strategic_flags || ['platform_potential'],
    cap_rate: Number(cap_rate.toFixed(1)),
    payback_years: Number(payback_years.toFixed(1)),
    seller_financing: strategicAnalysis.seller_financing_likely || false,
    government_contracts: strategicAnalysis.government_contracts || false,
    financial_analysis: financialAnalysis,
    market_analysis: marketAnalysis,
    strategic_assessment: strategicAnalysis,
    risk_evaluation: riskAnalysis,
    investment_thesis: investmentThesis,
    executive_summary: executiveSummary
  };
}

// OpenAI - Financial Analysis
async function analyzeFinancials(business: BusinessData) {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) return generateFallbackFinancialAnalysis(business);

  const prompt = `As a senior financial analyst, provide a comprehensive financial analysis for this business acquisition:

Business: ${business.business_name}
Asking Price: $${business.asking_price.toLocaleString()}
Annual Revenue: $${business.annual_revenue.toLocaleString()}
Annual Net Profit: $${business.annual_net_profit.toLocaleString()}
Sector: ${business.sector}
Description: ${business.description}

Analyze and provide JSON response with:
{
  "financial_health_score": 0.0-1.0,
  "automation_score": 0.0-1.0,
  "revenue_quality": "recurring|transactional|project_based",
  "profit_margins": "percentage",
  "cash_flow_predictability": 0.0-1.0,
  "growth_trajectory": "declining|stable|growing|accelerating",
  "multiple_analysis": {
    "price_to_revenue": number,
    "price_to_profit": number,
    "industry_comparison": "below|at|above market"
  },
  "automation_opportunities": [string],
  "financial_red_flags": [string],
  "working_capital_requirements": "low|medium|high",
  "seasonality_impact": 0.0-1.0
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a senior financial analyst with 15+ years experience in business acquisitions. Provide detailed, accurate financial analysis in valid JSON format only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Financial analysis failed:', error);
    return generateFallbackFinancialAnalysis(business);
  }
}

// Claude - Strategic Analysis
async function analyzeStrategy(business: BusinessData) {
  const claudeKey = Deno.env.get('CLAUDE_API_KEY');
  if (!claudeKey) return generateFallbackStrategicAnalysis(business);

  const prompt = `As a strategic business consultant, analyze the strategic value and positioning of this acquisition opportunity:

Business: ${business.business_name}
Sector: ${business.sector}
Location: ${business.location}
Revenue: $${business.annual_revenue.toLocaleString()}
Description: ${business.description}

Provide comprehensive strategic analysis in JSON:
{
  "strategic_value_score": 0.0-1.0,
  "competitive_moat": "none|weak|moderate|strong",
  "market_position": "follower|challenger|leader|niche",
  "scalability_potential": 0.0-1.0,
  "recommended_ownership_model": "passive|semi-absentee|owner_operated",
  "strategic_flags": [string],
  "growth_strategies": [string],
  "integration_complexity": "low|medium|high",
  "synergy_opportunities": [string],
  "seller_financing_likely": boolean,
  "government_contracts": boolean,
  "technology_stack_assessment": "outdated|adequate|modern|cutting_edge",
  "operational_efficiency_score": 0.0-1.0,
  "management_team_quality": "poor|adequate|good|excellent"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ]
      }),
    });

    const data = await response.json();
    return JSON.parse(data.content[0].text);
  } catch (error) {
    console.error('Strategic analysis failed:', error);
    return generateFallbackStrategicAnalysis(business);
  }
}

// Gemini - Market Analysis
async function analyzeMarket(business: BusinessData) {
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiKey) return generateFallbackMarketAnalysis(business);

  const prompt = `As a market research analyst, provide comprehensive market analysis for this business:

Business: ${business.business_name}
Sector: ${business.sector}
Location: ${business.location}
Description: ${business.description}

Analyze market conditions and provide JSON response:
{
  "market_size": "small|medium|large|very_large",
  "market_growth_rate": "declining|stable|growing|rapidly_growing",
  "competitive_intensity": 0.0-1.0,
  "market_trends": [string],
  "target_demographics": [string],
  "seasonal_patterns": string,
  "regulatory_environment": "favorable|neutral|challenging",
  "economic_sensitivity": 0.0-1.0,
  "digital_transformation_opportunity": 0.0-1.0,
  "market_consolidation_trend": "fragmenting|stable|consolidating",
  "customer_concentration_risk": "low|medium|high",
  "supplier_power": "low|medium|high",
  "barriers_to_entry": "low|medium|high",
  "substitute_threat": "low|medium|high"
}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2000,
        }
      }),
    });

    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Market analysis failed:', error);
    return generateFallbackMarketAnalysis(business);
  }
}

// Perplexity - Risk Analysis with Real-time Data
async function analyzeRisks(business: BusinessData) {
  const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
  if (!perplexityKey) return generateFallbackRiskAnalysis(business);

  const prompt = `Research and analyze current risks for acquiring a business in the ${business.sector} sector located in ${business.location}. Consider recent market conditions, regulatory changes, and industry-specific risks.

Business: ${business.business_name}
Sector: ${business.sector}
Location: ${business.location}

Provide comprehensive risk analysis in JSON:
{
  "overall_risk_score": 0.0-1.0,
  "key_risks": [string],
  "resilience_factors": [string],
  "regulatory_risks": [string],
  "market_risks": [string],
  "operational_risks": [string],
  "financial_risks": [string],
  "technology_risks": [string],
  "reputation_risks": [string],
  "mitigation_strategies": [string],
  "insurance_requirements": [string],
  "due_diligence_priorities": [string]
}`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          { role: 'system', content: 'You are a risk management expert. Use current market data and recent news to provide accurate risk assessment. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Risk analysis failed:', error);
    return generateFallbackRiskAnalysis(business);
  }
}

// Generate Investment Thesis using Claude
async function generateInvestmentThesis(business: BusinessData, analyses: any) {
  const claudeKey = Deno.env.get('CLAUDE_API_KEY');
  if (!claudeKey) return `Investment opportunity in ${business.business_name} - ${business.sector} sector business with strong fundamentals.`;

  const prompt = `As an investment partner at a private equity firm, create a compelling investment thesis for this acquisition:

Business: ${business.business_name}
Financial Analysis: ${JSON.stringify(analyses.financialAnalysis)}
Strategic Analysis: ${JSON.stringify(analyses.strategicAnalysis)}
Market Analysis: ${JSON.stringify(analyses.marketAnalysis)}
Risk Analysis: ${JSON.stringify(analyses.riskAnalysis)}

Write a clear, compelling investment thesis (2-3 paragraphs) that covers:
1. Why this is an attractive investment opportunity
2. Key value drivers and competitive advantages
3. Growth potential and exit strategy
4. Risk mitigation factors

Write in professional investment memo style.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: prompt }
        ]
      }),
    });

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Investment thesis generation failed:', error);
    return `Investment opportunity in ${business.business_name} - ${business.sector} sector business with strong fundamentals and growth potential.`;
  }
}

// Generate Executive Summary using GPT-4
async function generateExecutiveSummary(business: BusinessData, analyses: any) {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) return `Executive Summary: ${business.business_name} represents a compelling acquisition opportunity in the ${business.sector} sector.`;

  const prompt = `Create a professional executive summary for this business acquisition opportunity:

Business: ${business.business_name}
Investment Thesis: ${analyses.investmentThesis}
Key Analyses: ${JSON.stringify({
  financial: analyses.financialAnalysis,
  strategic: analyses.strategicAnalysis,
  market: analyses.marketAnalysis,
  risk: analyses.riskAnalysis
})}

Write a concise executive summary (150-200 words) suitable for investor presentation that includes:
1. Business overview and market position
2. Financial highlights and valuation metrics
3. Key investment merits and value drivers
4. Major risks and mitigation strategies
5. Investment recommendation

Use professional, investor-ready language.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a senior investment analyst writing executive summaries for institutional investors. Write clear, professional summaries.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Executive summary generation failed:', error);
    return `Executive Summary: ${business.business_name} represents a compelling acquisition opportunity in the ${business.sector} sector with strong financial performance and growth potential.`;
  }
}

// Calculate Composite Score
function calculateCompositeScore(financial: any, strategic: any, market: any, risk: any): number {
  const financialScore = financial.financial_health_score || 0.7;
  const strategicScore = strategic.strategic_value_score || 0.7;
  const marketScore = (market.market_growth_rate === 'rapidly_growing' ? 0.9 : 
                      market.market_growth_rate === 'growing' ? 0.7 : 
                      market.market_growth_rate === 'stable' ? 0.5 : 0.3);
  const riskScore = 1 - (risk.overall_risk_score || 0.3);
  
  return Number(((financialScore * 0.3 + strategicScore * 0.3 + marketScore * 0.2 + riskScore * 0.2)).toFixed(2));
}

// Fallback analysis functions
function generateFallbackFinancialAnalysis(business: BusinessData) {
  return {
    financial_health_score: 0.7,
    automation_score: 0.6,
    revenue_quality: "recurring",
    profit_margins: ((business.annual_net_profit / business.annual_revenue) * 100).toFixed(1) + "%",
    cash_flow_predictability: 0.7,
    growth_trajectory: "stable",
    multiple_analysis: {
      price_to_revenue: Number((business.asking_price / business.annual_revenue).toFixed(1)),
      price_to_profit: Number((business.asking_price / business.annual_net_profit).toFixed(1)),
      industry_comparison: "at market"
    },
    automation_opportunities: ["process_automation", "digital_transformation"],
    financial_red_flags: [],
    working_capital_requirements: "medium",
    seasonality_impact: 0.3
  };
}

function generateFallbackStrategicAnalysis(business: BusinessData) {
  return {
    strategic_value_score: 0.7,
    competitive_moat: "moderate",
    market_position: "challenger",
    scalability_potential: 0.6,
    recommended_ownership_model: "semi-absentee",
    strategic_flags: ["platform_potential", "operational_optimization"],
    growth_strategies: ["market_expansion", "service_enhancement"],
    integration_complexity: "medium",
    synergy_opportunities: ["cost_optimization", "revenue_enhancement"],
    seller_financing_likely: false,
    government_contracts: false,
    technology_stack_assessment: "adequate",
    operational_efficiency_score: 0.6,
    management_team_quality: "good"
  };
}

function generateFallbackMarketAnalysis(business: BusinessData) {
  return {
    market_size: "medium",
    market_growth_rate: "stable",
    competitive_intensity: 0.6,
    market_trends: ["digital_transformation", "consolidation"],
    target_demographics: ["small_business", "mid_market"],
    seasonal_patterns: "minimal_seasonality",
    regulatory_environment: "neutral",
    economic_sensitivity: 0.5,
    digital_transformation_opportunity: 0.7,
    market_consolidation_trend: "consolidating",
    customer_concentration_risk: "medium",
    supplier_power: "medium",
    barriers_to_entry: "medium",
    substitute_threat: "medium"
  };
}

function generateFallbackRiskAnalysis(business: BusinessData) {
  return {
    overall_risk_score: 0.4,
    key_risks: ["market_competition", "economic_downturn"],
    resilience_factors: ["essential_service", "recurring_revenue"],
    regulatory_risks: ["compliance_requirements"],
    market_risks: ["competitive_pressure"],
    operational_risks: ["key_person_dependency"],
    financial_risks: ["cash_flow_volatility"],
    technology_risks: ["system_modernization"],
    reputation_risks: ["customer_satisfaction"],
    mitigation_strategies: ["diversification", "operational_improvements"],
    insurance_requirements: ["general_liability", "professional_liability"],
    due_diligence_priorities: ["financial_verification", "legal_compliance"]
  };
}

// Mock business sources for demonstration
const BUSINESS_SOURCES = [
  { name: 'BizBuySell', url: 'https://bizbuysell.com', selector: '.listing' },
  { name: 'Empire Flippers', url: 'https://empireflippers.com', selector: '.business-card' },
  { name: 'FE International', url: 'https://feinternational.com', selector: '.listing-item' }
];

// Simulate business discovery
async function discoverBusinesses(): Promise<BusinessData[]> {
  console.log('Starting enhanced business discovery...');
  
  const mockBusinesses: BusinessData[] = [
    {
      business_name: `Digital Marketing Agency ${Date.now()}`,
      asking_price: Math.floor(Math.random() * 3000000) + 1500000,
      annual_revenue: Math.floor(Math.random() * 2000000) + 800000,
      annual_net_profit: Math.floor(Math.random() * 600000) + 300000,
      description: "Full-service digital marketing agency specializing in SaaS companies with 50+ recurring clients, proprietary automation tools, and strong management team.",
      url: "https://example.com/listing-digital-agency",
      source: "BizBuySell",
      sector: "Digital Marketing",
      location: "Austin, TX"
    },
    {
      business_name: `Medical Equipment Distributor ${Date.now()}`,
      asking_price: Math.floor(Math.random() * 8000000) + 4000000,
      annual_revenue: Math.floor(Math.random() * 6000000) + 3000000,
      annual_net_profit: Math.floor(Math.random() * 1500000) + 800000,
      description: "Established medical equipment distribution company with exclusive territory rights, government contracts, and recession-resistant customer base.",
      url: "https://example.com/listing-medical-distributor",
      source: "Empire Flippers",
      sector: "Healthcare Distribution",
      location: "Phoenix, AZ"
    }
  ];

  console.log(`Discovered ${mockBusinesses.length} new businesses for enhanced analysis`);
  return mockBusinesses;
}

// Store or update business in database
async function storeBusiness(business: BusinessData, analysis: ComprehensiveAnalysis) {
  console.log(`Storing enhanced business analysis: ${business.business_name}`);
  
  // Check if business already exists
  const { data: existing } = await supabase
    .from('businesses')
    .select('id')
    .eq('business_name', business.business_name)
    .eq('source', business.source)
    .single();

  const businessData = {
    ...business,
    automation_opportunity_score: analysis.automation_opportunity_score,
    composite_score: analysis.composite_score,
    ownership_model: analysis.ownership_model,
    resilience_factors: analysis.resilience_factors,
    strategic_flags: analysis.strategic_flags,
    cap_rate: analysis.cap_rate,
    payback_years: analysis.payback_years,
    seller_financing: analysis.seller_financing,
    government_contracts: analysis.government_contracts,
    is_active: true,
    last_analyzed_at: new Date().toISOString(),
  };

  let businessId: string;

  if (existing) {
    const { error } = await supabase
      .from('businesses')
      .update(businessData)
      .eq('id', existing.id);
    
    if (error) {
      console.error('Error updating business:', error);
      throw error;
    }
    businessId = existing.id;
  } else {
    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select('id')
      .single();
    
    if (error) {
      console.error('Error inserting business:', error);
      throw error;
    }
    businessId = data.id;
  }

  // Store enrichment data
  const enrichmentData = {
    business_id: businessId,
    ai_summary: analysis.executive_summary,
    market_analysis: analysis.market_analysis,
    automation_assessment: analysis.financial_analysis,
    financial_projections: {
      investment_thesis: analysis.investment_thesis,
      strategic_assessment: analysis.strategic_assessment
    },
    risk_factors: analysis.risk_evaluation,
    confidence_score: analysis.composite_score
  };

  const { error: enrichmentError } = await supabase
    .from('enrichment_data')
    .upsert([enrichmentData], { onConflict: 'business_id' });

  if (enrichmentError) {
    console.error('Error storing enrichment data:', enrichmentError);
  }

  return { updated: !!existing, id: businessId };
}

// Main scanning function
async function performScan(runId: string) {
  console.log(`Starting enhanced scan for run: ${runId}`);
  
  try {
    await supabase
      .from('analysis_runs')
      .update({ 
        status: 'processing',
        businesses_processed: 0,
        businesses_added: 0,
        businesses_updated: 0
      })
      .eq('id', runId);

    const startTime = Date.now();
    let processed = 0;
    let added = 0;
    let updated = 0;

    const businesses = await discoverBusinesses();

    for (const business of businesses) {
      try {
        console.log(`Starting comprehensive analysis for: ${business.business_name}`);
        
        // Perform enhanced multi-model analysis
        const analysis = await performComprehensiveAnalysis(business);
        
        // Store enhanced business data
        const result = await storeBusiness(business, analysis);
        
        if (result.updated) {
          updated++;
        } else {
          added++;
        }
        
        processed++;

        await supabase
          .from('analysis_runs')
          .update({
            businesses_processed: processed,
            businesses_added: added,
            businesses_updated: updated
          })
          .eq('id', runId);

        // Rate limiting for API calls
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`Error processing business ${business.business_name}:`, error);
      }
    }

    const endTime = Date.now();
    const executionTime = Math.round((endTime - startTime) / 1000);

    await supabase
      .from('analysis_runs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        execution_time_seconds: executionTime,
        businesses_processed: processed,
        businesses_added: added,
        businesses_updated: updated
      })
      .eq('id', runId);

    console.log(`Enhanced scan completed: ${processed} processed, ${added} added, ${updated} updated`);
    
  } catch (error) {
    console.error('Enhanced scan failed:', error);
    
    await supabase
      .from('analysis_runs')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: error.message
      })
      .eq('id', runId);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action } = await req.json();
    console.log('Received action:', action);

    if (action === 'start_scan') {
      // Create new analysis run
      const { data: run, error } = await supabase
        .from('analysis_runs')
        .insert([{
          status: 'pending',
          started_at: new Date().toISOString(),
          run_config: { 
            sources: ['BizBuySell', 'Empire Flippers', 'FE International'],
            ai_models: ['OpenAI GPT-4', 'Claude 3 Sonnet', 'Gemini Pro', 'Perplexity'],
            analysis_depth: 'comprehensive'
          }
        }])
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      // Start the scan in the background
      EdgeRuntime.waitUntil(performScan(run.id));

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Enhanced comprehensive scan started successfully',
        run_id: run.id 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Unknown action' 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced scanner function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
