
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { BusinessCard } from "@/components/BusinessCard";
import { FilterPanel } from "@/components/FilterPanel";
import { MetricsPanel } from "@/components/MetricsPanel";
import { SearchBar } from "@/components/SearchBar";
import { mockBusinesses } from "@/data/mockBusinesses";
import { Business } from "@/types/Business";

const Index = () => {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(mockBusinesses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minProfit: 0,
    maxPrice: 10000000,
    sectors: [] as string[],
    automationScore: 0,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterBusinesses(term, filters);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    filterBusinesses(searchTerm, newFilters);
  };

  const filterBusinesses = (term: string, currentFilters: typeof filters) => {
    let filtered = businesses;

    // Search filter
    if (term) {
      filtered = filtered.filter(business =>
        business.business_name.toLowerCase().includes(term.toLowerCase()) ||
        business.description.toLowerCase().includes(term.toLowerCase()) ||
        business.sector.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Profit filter
    filtered = filtered.filter(business => business.annual_net_profit >= currentFilters.minProfit);

    // Price filter
    filtered = filtered.filter(business => business.asking_price <= currentFilters.maxPrice);

    // Sector filter
    if (currentFilters.sectors.length > 0) {
      filtered = filtered.filter(business => currentFilters.sectors.includes(business.sector));
    }

    // Automation score filter
    filtered = filtered.filter(business => business.automation_opportunity_score >= currentFilters.automationScore);

    setFilteredBusinesses(filtered);
  };

  const totalValue = filteredBusinesses.reduce((sum, business) => sum + business.asking_price, 0);
  const totalProfit = filteredBusinesses.reduce((sum, business) => sum + business.annual_net_profit, 0);
  const avgAutomationScore = filteredBusinesses.length > 0 
    ? filteredBusinesses.reduce((sum, business) => sum + business.automation_opportunity_score, 0) / filteredBusinesses.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} currentFilters={filters} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Metrics */}
            <div className="space-y-4">
              <SearchBar onSearch={handleSearch} />
              <MetricsPanel 
                totalDeals={filteredBusinesses.length}
                totalValue={totalValue}
                totalProfit={totalProfit}
                avgAutomationScore={avgAutomationScore}
              />
            </div>

            {/* Business Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg">
                  No businesses match your current filters.
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria or filters.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
