
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Building2, Zap } from "lucide-react";

interface MetricsPanelProps {
  totalDeals: number;
  totalValue: number;
  totalProfit: number;
  avgAutomationScore: number;
}

export const MetricsPanel = ({
  totalDeals,
  totalValue,
  totalProfit,
  avgAutomationScore
}: MetricsPanelProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const metrics = [
    {
      title: "Total Deals",
      value: totalDeals.toString(),
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Total Value",
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Combined Profit",
      value: formatCurrency(totalProfit),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Avg Automation",
      value: `${(avgAutomationScore * 100).toFixed(0)}%`,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {metric.title}
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
