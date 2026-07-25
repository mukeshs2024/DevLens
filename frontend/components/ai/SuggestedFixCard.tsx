import { Lightbulb } from 'lucide-react';

export function SuggestedFixCard() {
  return (
    <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-xl p-5 sm:col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
          <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-bold text-green-900 dark:text-green-300">Suggested Fix</h3>
      </div>
      <ul className="text-sm text-green-800 dark:text-green-200/80 ml-12 space-y-2 list-disc pl-2">
        <li>Verify <span className="font-mono text-xs bg-green-100/50 dark:bg-green-900/30 px-1 py-0.5 rounded">DATABASE_URL</span></li>
        <li>Validate database credentials</li>
        <li>Restart application</li>
        <li>Rollback recent configuration if required</li>
      </ul>
    </div>
  );
}
