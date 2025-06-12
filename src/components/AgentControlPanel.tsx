
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Settings, Clock, Activity } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AgentControlPanel = () => {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current analysis run status - using 'processing' instead of 'running'
  const { data: currentRun } = useQuery({
    queryKey: ['analysis-runs', 'current'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analysis_runs')
        .select('*')
        .eq('status', 'processing')
        .order('started_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Fetch last completed run
  const { data: lastRun } = useQuery({
    queryKey: ['analysis-runs', 'last'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analysis_runs')
        .select('*')
        .in('status', ['completed', 'failed'])
        .order('started_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    },
  });

  // Start scan mutation
  const startScan = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        'https://dpghkjmfnbxexdzkvrzi.supabase.co/functions/v1/project-million-scanner',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZ2hram1mbmJ4ZXhkemt2cnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTgyNjIsImV4cCI6MjA2NTI3NDI2Mn0.7vcExaZldsubb_Qq8pY0RlyC5h0VZWtneZsZ9opT9YQ`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'start_scan' }),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to start scan');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsScanning(true);
      toast({
        title: "Scan Started",
        description: "The autonomous agent has begun scanning for new opportunities.",
      });
      queryClient.invalidateQueries({ queryKey: ['analysis-runs'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to start scan. Please try again.",
        variant: "destructive",
      });
      console.error('Start scan error:', error);
    },
  });

  const getStatusBadge = () => {
    if (currentRun) {
      return <Badge variant="default" className="bg-blue-600">Processing</Badge>;
    }
    if (lastRun?.status === 'completed') {
      return <Badge variant="secondary">Idle</Badge>;
    }
    if (lastRun?.status === 'failed') {
      return <Badge variant="destructive">Failed</Badge>;
    }
    return <Badge variant="outline">Ready</Badge>;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          Autonomous Agent Control
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => startScan.mutate()}
            disabled={!!currentRun || startScan.isPending}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {startScan.isPending ? 'Starting...' : 'Start Scan'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
        </div>

        {/* Current Status */}
        {currentRun && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">
              Current Scan Progress
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Started:</span>
                <div className="font-medium">{formatTimestamp(currentRun.started_at)}</div>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Processed:</span>
                <div className="font-medium">{currentRun.businesses_processed} businesses</div>
              </div>
            </div>
          </div>
        )}

        {/* Last Run Summary */}
        {lastRun && !currentRun && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last Scan Results
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Completed:</span>
                <div className="font-medium">
                  {lastRun.completed_at ? formatTimestamp(lastRun.completed_at) : 'N/A'}
                </div>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Found:</span>
                <div className="font-medium text-green-600">
                  {lastRun.businesses_added} new opportunities
                </div>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Updated:</span>
                <div className="font-medium">{lastRun.businesses_updated} businesses</div>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                <div className="font-medium">
                  {lastRun.execution_time_seconds ? `${lastRun.execution_time_seconds}s` : 'N/A'}
                </div>
              </div>
            </div>
            {lastRun.error_message && (
              <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-600 dark:text-red-400">
                Error: {lastRun.error_message}
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Agent will automatically discover and analyze new business opportunities using AI-powered scoring.
        </div>
      </CardContent>
    </Card>
  );
};
