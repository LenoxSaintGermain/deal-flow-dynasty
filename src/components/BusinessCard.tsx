
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Building, 
  ExternalLink,
  FileText,
  Zap,
  Shield,
  Target
} from "lucide-react";
import { Business } from "@/types/Business";
import { BusinessEnrichmentReport } from "./BusinessEnrichmentReport";

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  const [showReport, setShowReport] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-green-500";
    if (score >= 0.6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 0.8) return "default";
    if (score >= 0.6) return "secondary";
    return "destructive";
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
              {business.business_name}
            </CardTitle>
            <Badge variant="outline" className="ml-2 shrink-0">
              {business.source}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Building className="w-4 h-4" />
            <span>{business.sector}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4" />
            <span>{business.location}</span>
          </div>

          {/* Financial Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Asking Price
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {formatCurrency(business.asking_price)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Annual Revenue
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white">
                {formatCurrency(business.annual_revenue)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Net Profit
              </div>
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(business.annual_net_profit)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Cap Rate
              </div>
              <div className="text-lg font-semibold text-blue-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {business.cap_rate}%
              </div>
            </div>
          </div>

          {/* Scores */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Automation Score</span>
              </div>
              <Badge variant={getScoreBadgeVariant(business.automation_opportunity_score || 0)}>
                {((business.automation_opportunity_score || 0) * 100).toFixed(0)}%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-purple-500" />
                <span>Investment Score</span>
              </div>
              <Badge variant={getScoreBadgeVariant(business.composite_score || 0)}>
                {((business.composite_score || 0) * 100).toFixed(0)}%
              </Badge>
            </div>
          </div>

          {/* Strategic Flags */}
          {business.strategic_flags && business.strategic_flags.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Strategic Flags
              </div>
              <div className="flex flex-wrap gap-1">
                {business.strategic_flags.slice(0, 2).map((flag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {flag.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
                {business.strategic_flags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{business.strategic_flags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Resilience Factors */}
          {business.resilience_factors && business.resilience_factors.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                <Shield className="w-3 h-3 inline mr-1" />
                Resilience Factors
              </div>
              <div className="flex flex-wrap gap-1">
                {business.resilience_factors.slice(0, 2).map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-green-500 text-green-700">
                    {factor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
                {business.resilience_factors.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{business.resilience_factors.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {business.description && (
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Description
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                {business.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => setShowReport(true)}
            >
              <FileText className="w-4 h-4 mr-2" />
              View Report
            </Button>
            {business.url && (
              <Button variant="outline" size="sm" asChild>
                <a href={business.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </a>
            )}
          </div>

          {/* Key Metrics Bar */}
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t">
            <span>Payback: {business.payback_years}y</span>
            <span>{business.ownership_model?.replace(/_/g, ' ')}</span>
            <span>
              {business.seller_financing && '💰'} 
              {business.government_contracts && '🏛️'}
            </span>
          </div>
        </CardContent>
      </Card>

      {showReport && (
        <BusinessEnrichmentReport 
          business={business} 
          onClose={() => setShowReport(false)} 
        />
      )}
    </>
  );
};
