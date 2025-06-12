
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
      
      return data || [];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};
