import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorSummary } from './ErrorSummary';
import { RootCause } from './RootCause';
import { SeverityCard } from './SeverityCard';
import { SuggestedFixCard } from './SuggestedFixCard';
import { motion } from 'framer-motion';

export function AIAnalysisCard({ data }: { data?: any }) {
  if (!data) return null;

  return (
    <Card className="shadow-lg border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden bg-white/50 backdrop-blur-xl">
      <div className="absolute top-0 right-0 p-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div className="p-6 md:p-8 flex items-center border-b border-slate-100 dark:border-slate-800">
        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mr-4">
          <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          AI Analysis Result
        </h2>
      </div>

      <CardContent className="p-6 md:p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ErrorSummary summary={data.summary} />
          <RootCause root_cause={data.root_cause} confidence={data.confidence} />
          <SuggestedFixCard suggested_fix={data.suggested_fix} />
          <SeverityCard severity={data.severity} />
        </div>
      </CardContent>
    </Card>
  );
}
