
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

interface AnalysisResult {
  automation_opportunity_score: number;
  composite_score: number;
  ownership_model: string;
  resilience_factors: string[];
  strategic_flags: string[];
  cap_rate: number;
  payback_years: number;
  seller_financing: boolean;
  government_contracts: boolean;
}

// Mock business sources for demonstration
const BUSINESS_SOURCES = [
  { name: 'BizBuySell', url: 'https://bizbuysell.com', selector: '.listing' },
  { name: 'Empire Flippers', url: 'https://empireflippers.com', selector: '.business-card' },
  { name: 'FE International', url: 'https://feinternational.com', selector: '.listing-item' }
];

// Simulate business discovery
async function discoverBusinesses(): Promise<BusinessData[]> {
  console.log('Starting business discovery...');
  
  // In a real implementation, this would scrape actual websites
  // For now, we'll generate some mock data to demonstrate the system
  const mockBusinesses: BusinessData[] = [
    {
      business_name: `Tech Services Co ${Date.now()}`,
      asking_price: Math.floor(Math.random() * 5000000) + 1000000,
      annual_revenue: Math.floor(Math.random() * 3000000) + 500000,
      annual_net_profit: Math.floor(Math.random() * 800000) + 200000,
      description: "Established tech services company with strong client base and recurring revenue model.",
      url: "https://example.com/listing-1",
      source: "BizBuySell",
      sector: "Technology Services",
      location: "Austin, TX"
    },
    {
      business_name: `Manufacturing Solutions ${Date.now()}`,
      asking_price: Math.floor(Math.random() * 8000000) + 2000000,
      annual_revenue: Math.floor(Math.random() * 5000000) + 1000000,
      annual_net_profit: Math.floor(Math.random() * 1200000) + 300000,
      description: "Industrial manufacturing company with automated processes and government contracts.",
      url: "https://example.com/listing-2",
      source: "Empire Flippers",
      sector: "Manufacturing",
      location: "Detroit, MI"
    }
  ];

  console.log(`Discovered ${mockBusinesses.length} new businesses`);
  return mockBusinesses;
}

// AI Analysis using the configured APIs
async function analyzeBusinessWithAI(business: BusinessData): Promise<AnalysisResult> {
  console.log(`Analyzing business: ${business.business_name}`);
  
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const prompt = `Analyze this business for acquisition potential:
    
Name: ${business.business_name}
Price: $${business.asking_price}
Revenue: $${business.annual_revenue}
Profit: $${business.annual_net_profit}
Sector: ${business.sector}
Description: ${business.description}

Please provide scores and assessments for:
1. Automation opportunity (0-1 scale)
2. Overall composite score (0-1 scale)
3. Ownership model (passive, semi-absentee, owner_operated)
4. Key resilience factors
5. Strategic flags
6. Whether seller financing is likely
7. Whether government contracts are involved

Respond with a JSON object containing these assessments.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert business analyst specializing in acquisition opportunities. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const aiAnalysis = data.choices[0].message.content;
    
    // Parse AI response and create structured analysis
    const cap_rate = (business.annual_net_profit / business.asking_price) * 100;
    const payback_years = business.asking_price / business.annual_net_profit;

    // For demo purposes, generate realistic scores
    // In production, these would come from the AI analysis
    return {
      automation_opportunity_score: Math.random() * 0.4 + 0.6, // 0.6-1.0
      composite_score: Math.random() * 0.3 + 0.7, // 0.7-1.0
      ownership_model: ['passive', 'semi-absentee', 'owner_operated'][Math.floor(Math.random() * 3)],
      resilience_factors: ['recession-resistant', 'essential-service', 'recurring-revenue'],
      strategic_flags: ['platform_potential', 'underoptimized_tech_stack'],
      cap_rate: Number(cap_rate.toFixed(1)),
      payback_years: Number(payback_years.toFixed(1)),
      seller_financing: Math.random() > 0.5,
      government_contracts: Math.random() > 0.7
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    // Fallback to basic analysis
    const cap_rate = (business.annual_net_profit / business.asking_price) * 100;
    const payback_years = business.asking_price / business.annual_net_profit;
    
    return {
      automation_opportunity_score: 0.5,
      composite_score: 0.6,
      ownership_model: 'semi-absentee',
      resilience_factors: ['essential-service'],
      strategic_flags: ['requires_analysis'],
      cap_rate: Number(cap_rate.toFixed(1)),
      payback_years: Number(payback_years.toFixed(1)),
      seller_financing: false,
      government_contracts: false
    };
  }
}

// Store or update business in database
async function storeBusiness(business: BusinessData, analysis: AnalysisResult) {
  console.log(`Storing business: ${business.business_name}`);
  
  // Check if business already exists
  const { data: existing } = await supabase
    .from('businesses')
    .select('id')
    .eq('business_name', business.business_name)
    .eq('source', business.source)
    .single();

  const businessData = {
    ...business,
    ...analysis,
    is_active: true,
    last_analyzed_at: new Date().toISOString(),
  };

  if (existing) {
    // Update existing business
    const { error } = await supabase
      .from('businesses')
      .update(businessData)
      .eq('id', existing.id);
    
    if (error) {
      console.error('Error updating business:', error);
      throw error;
    }
    
    return { updated: true, id: existing.id };
  } else {
    // Insert new business
    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select('id')
      .single();
    
    if (error) {
      console.error('Error inserting business:', error);
      throw error;
    }
    
    return { updated: false, id: data.id };
  }
}

// Main scanning function
async function performScan(runId: string) {
  console.log(`Starting scan for run: ${runId}`);
  
  try {
    // Update run status to processing
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

    // Discover businesses
    const businesses = await discoverBusinesses();

    for (const business of businesses) {
      try {
        // Analyze with AI
        const analysis = await analyzeBusinessWithAI(business);
        
        // Store in database
        const result = await storeBusiness(business, analysis);
        
        if (result.updated) {
          updated++;
        } else {
          added++;
        }
        
        processed++;

        // Update progress
        await supabase
          .from('analysis_runs')
          .update({
            businesses_processed: processed,
            businesses_added: added,
            businesses_updated: updated
          })
          .eq('id', runId);

        // Rate limiting - wait between businesses
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`Error processing business ${business.business_name}:`, error);
      }
    }

    // Complete the run
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

    console.log(`Scan completed: ${processed} processed, ${added} added, ${updated} updated`);
    
  } catch (error) {
    console.error('Scan failed:', error);
    
    // Mark run as failed
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
          run_config: { sources: BUSINESS_SOURCES.map(s => s.name) }
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
        message: 'Scan started successfully',
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
    console.error('Error in scanner function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
