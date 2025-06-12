
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, TrendingUp, AlertTriangle, Target, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Business } from "@/types/Business";

interface EnrichmentData {
  id: string;
  business_id: string;
  ai_summary: string;
  market_analysis: any;
  automation_assessment: any;
  financial_projections: any;
  risk_factors: any;
  confidence_score: number;
}

interface BusinessEnrichmentReportProps {
  business: Business;
  onClose: () => void;
}

export const BusinessEnrichmentReport = ({ business, onClose }: BusinessEnrichmentReportProps) => {
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrichmentData();
  }, [business.id]);

  const fetchEnrichmentData = async () => {
    try {
      const { data, error } = await supabase
        .from('enrichment_data')
        .select('*')
        .eq('business_id', business.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setEnrichmentData(data);
    } catch (error) {
      console.error('Error fetching enrichment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600 bg-green-100";
    if (score >= 0.6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Loading Report</div>
              <Progress value={66} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Investment Analysis Report
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Executive Summary */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Executive Summary
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(business.asking_price)}</div>
                    <div className="text-sm text-muted-foreground">Asking Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{business.cap_rate}%</div>
                    <div className="text-sm text-muted-foreground">Cap Rate</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(business.composite_score || 0)}`}>
                      {((business.composite_score || 0) * 100).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Investment Score</div>
                  </div>
                </div>
                {enrichmentData?.ai_summary && (
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {enrichmentData.ai_summary}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="strategic">Strategic</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="thesis">Investment Thesis</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Financial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Annual Revenue</div>
                      <div className="text-lg font-semibold">{formatCurrency(business.annual_revenue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Annual Profit</div>
                      <div className="text-lg font-semibold">{formatCurrency(business.annual_net_profit)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Payback Period</div>
                      <div className="text-lg font-semibold">{business.payback_years} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Profit Margin</div>
                      <div className="text-lg font-semibold">
                        {((business.annual_net_profit / business.annual_revenue) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {enrichmentData?.automation_assessment && (
                    <div>
                      <h4 className="font-semibold mb-2">Automation Assessment</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Automation Score</div>
                          <Progress 
                            value={(enrichmentData.automation_assessment.automation_score || 0) * 100} 
                            className="w-full mt-1" 
                          />
                          <div className="text-sm mt-1">
                            {((enrichmentData.automation_assessment.automation_score || 0) * 100).toFixed(0)}% automation potential
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Financial Health</div>
                          <Progress 
                            value={(enrichmentData.automation_assessment.financial_health_score || 0) * 100} 
                            className="w-full mt-1" 
                          />
                          <div className="text-sm mt-1">
                            {((enrichmentData.automation_assessment.financial_health_score || 0) * 100).toFixed(0)}% health score
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Strategic Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Ownership Model</span>
                        <Badge variant="outline">{business.ownership_model || 'Semi-Absentee'}</Badge>
                      </div>
                    </div>

                    <div>
                      <div className="font-medium mb-2">Strategic Flags</div>
                      <div className="flex flex-wrap gap-2">
                        {business.strategic_flags?.map((flag, index) => (
                          <Badge key={index} variant="secondary">
                            {flag.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-medium mb-2">Resilience Factors</div>
                      <div className="flex flex-wrap gap-2">
                        {business.resilience_factors?.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                            {factor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {enrichmentData?.financial_projections?.strategic_assessment && (
                      <div>
                        <h4 className="font-semibold mb-2">Strategic Analysis</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(enrichmentData.financial_projections.strategic_assessment, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Sector</div>
                      <div className="text-lg font-semibold">{business.sector}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-lg font-semibold">{business.location}</div>
                    </div>
                  </div>

                  {enrichmentData?.market_analysis && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Market Intelligence</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Market Size:</span>{' '}
                            {enrichmentData.market_analysis.market_size || 'Medium'}
                          </div>
                          <div>
                            <span className="font-medium">Growth Rate:</span>{' '}
                            {enrichmentData.market_analysis.market_growth_rate || 'Stable'}
                          </div>
                          <div>
                            <span className="font-medium">Competition:</span>{' '}
                            {enrichmentData.market_analysis.competitive_intensity 
                              ? `${(enrichmentData.market_analysis.competitive_intensity * 100).toFixed(0)}%`
                              : 'Moderate'}
                          </div>
                          <div>
                            <span className="font-medium">Regulation:</span>{' '}
                            {enrichmentData.market_analysis.regulatory_environment || 'Neutral'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {enrichmentData?.risk_factors && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Overall Risk Score</span>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            enrichmentData.risk_factors.overall_risk_score < 0.3 ? 'bg-green-100 text-green-800' :
                            enrichmentData.risk_factors.overall_risk_score < 0.7 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {((enrichmentData.risk_factors.overall_risk_score || 0.4) * 100).toFixed(0)}%
                          </div>
                        </div>
                        <Progress 
                          value={(enrichmentData.risk_factors.overall_risk_score || 0.4) * 100} 
                          className="w-full" 
                        />
                      </div>

                      {enrichmentData.risk_factors.key_risks && (
                        <div>
                          <div className="font-medium mb-2">Key Risks</div>
                          <div className="space-y-2">
                            {enrichmentData.risk_factors.key_risks.map((risk: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                {risk.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {enrichmentData.risk_factors.mitigation_strategies && (
                        <div>
                          <div className="font-medium mb-2">Mitigation Strategies</div>
                          <div className="space-y-2">
                            {enrichmentData.risk_factors.mitigation_strategies.map((strategy: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {strategy.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="thesis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Thesis</CardTitle>
                </CardHeader>
                <CardContent>
                  {enrichmentData?.financial_projections?.investment_thesis ? (
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {enrichmentData.financial_projections.investment_thesis}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-2" />
                      <div>Investment thesis not available</div>
                      <div className="text-sm">Run a comprehensive analysis to generate detailed thesis</div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence Score</span>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(enrichmentData?.confidence_score || 0)}`}>
                        {((enrichmentData?.confidence_score || 0) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
