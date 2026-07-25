import { Target } from 'lucide-react';

export function RootCause() {
  return (
    <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/50 rounded-xl p-5 relative">
      <div className="absolute top-5 right-5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
        Confidence <span className="text-yellow-800 dark:text-yellow-300 ml-1">96%</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
          <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="font-bold text-yellow-900 dark:text-yellow-300">Root Cause</h3>
      </div>
      <div className="text-sm text-yellow-800 dark:text-yellow-200/80 ml-12 pr-20 space-y-1">
        <p>Recent changes in PR #42 modified database configuration.</p>
        <p className="font-mono text-xs bg-yellow-100/50 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded inline-block mt-1">DATABASE_URL</p> environment variable is incorrect.
      </div>
    </div>
  );
}
