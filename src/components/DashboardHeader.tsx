
import { Building2, Target, TrendingUp } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Project Million
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Autonomous Business Acquisition Research Platform v1.0
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Target Goal</div>
              <div className="font-semibold text-slate-900 dark:text-white">$1M+ Net Profit</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Min IRR Target</div>
              <div className="font-semibold text-slate-900 dark:text-white">25%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Qualification</div>
              <div className="font-semibold text-slate-900 dark:text-white">VA/MBE/SBA 8(a)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
