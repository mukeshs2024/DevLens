import { AlertTriangle } from 'lucide-react';

export function ErrorSummary({ summary }: { summary?: string }) {
  return (
    <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="font-bold text-red-900 dark:text-red-300">Error Summary</h3>
      </div>
      <div className="text-sm text-red-800 dark:text-red-200/80 ml-12 space-y-1">
        <p>{summary || "No summary available."}</p>
      </div>
    </div>
  );
}
