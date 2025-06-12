
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

export const FilterPanel = ({ onFilterChange, currentFilters }: FilterPanelProps) => {
  const sectors = [
    "Waste Management",
    "Automated Services", 
    "Niche Logistics",
    "Commercial Services",
    "Infrastructure Support",
    "Industrial B2B",
    "Event Support",
    "Franchise Resales"
  ];

  const handleSectorChange = (sector: string, checked: boolean) => {
    const newSectors = checked 
      ? [...currentFilters.sectors, sector]
      : currentFilters.sectors.filter((s: string) => s !== sector);
    
    onFilterChange({
      ...currentFilters,
      sectors: newSectors
    });
  };

  const resetFilters = () => {
    onFilterChange({
      minProfit: 0,
      maxPrice: 10000000,
      sectors: [],
      automationScore: 0,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="p-6 sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Min Profit Filter */}
        <div>
          <Label className="text-sm font-medium">
            Min Annual Profit: {formatCurrency(currentFilters.minProfit)}
          </Label>
          <Slider
            value={[currentFilters.minProfit]}
            onValueChange={([value]) => onFilterChange({ ...currentFilters, minProfit: value })}
            max={2000000}
            min={0}
            step={50000}
            className="mt-2"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <Label className="text-sm font-medium">
            Max Asking Price: {formatCurrency(currentFilters.maxPrice)}
          </Label>
          <Slider
            value={[currentFilters.maxPrice]}
            onValueChange={([value]) => onFilterChange({ ...currentFilters, maxPrice: value })}
            max={10000000}
            min={500000}
            step={100000}
            className="mt-2"
          />
        </div>

        {/* Automation Score Filter */}
        <div>
          <Label className="text-sm font-medium">
            Min Automation Score: {(currentFilters.automationScore * 100).toFixed(0)}%
          </Label>
          <Slider
            value={[currentFilters.automationScore]}
            onValueChange={([value]) => onFilterChange({ ...currentFilters, automationScore: value })}
            max={1}
            min={0}
            step={0.1}
            className="mt-2"
          />
        </div>

        {/* Sector Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sectors</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sectors.map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <Checkbox
                  id={sector}
                  checked={currentFilters.sectors.includes(sector)}
                  onCheckedChange={(checked) => handleSectorChange(sector, !!checked)}
                />
                <Label htmlFor={sector} className="text-sm font-normal cursor-pointer">
                  {sector}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
