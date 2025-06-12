
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Business } from "@/types/Business";

export const useBusinesses = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async (): Promise<Business[]> => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our Business interface
      const transformedData: Business[] = (data || []).map(business => ({
        ...business,
        resilience_factors: Array.isArray(business.resilience_factors) 
          ? business.resilience_factors as string[]
          : [],
        strategic_flags: Array.isArray(business.strategic_flags)
          ? business.strategic_flags as string[]
          : [],
      }));
      
      return transformedData;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};
