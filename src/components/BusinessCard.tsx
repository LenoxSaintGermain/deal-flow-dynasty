
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Business } from "@/types/Business";
import { ExternalLink, MapPin, DollarSign, TrendingUp, Zap, Shield } from "lucide-react";

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
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

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {business.business_name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>{business.location}</span>
              <Badge variant="secondary" className="ml-2">
                {business.sector}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(business.asking_price)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Asking Price
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Net Profit</div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(business.annual_net_profit)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Cap Rate</div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {business.cap_rate}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Automation:</span>
            </div>
            <div className="flex items-center gap-1">
              <div 
                className={`w-2 h-2 rounded-full ${getScoreColor(business.automation_opportunity_score)}`}
              />
              <span className="font-semibold text-slate-900 dark:text-white">
                {(business.automation_opportunity_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Score:</span>
            </div>
            <div className="flex items-center gap-1">
              <div 
                className={`w-2 h-2 rounded-full ${getScoreColor(business.composite_score)}`}
              />
              <span className="font-semibold text-slate-900 dark:text-white">
                {(business.composite_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Strategic Flags */}
        <div className="flex flex-wrap gap-1">
          {business.strategic_flags.map((flag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {flag}
            </Badge>
          ))}
          {business.government_contracts && (
            <Badge variant="default" className="text-xs bg-blue-600">
              Gov Contracts
            </Badge>
          )}
          {business.seller_financing && (
            <Badge variant="default" className="text-xs bg-green-600">
              Seller Financing
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {business.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="default" size="sm" className="flex-1">
            Analyze Deal
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={business.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};
