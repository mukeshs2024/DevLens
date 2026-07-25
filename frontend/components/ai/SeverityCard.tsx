import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SeverityCard({ severity }: { severity?: string }) {
  const displaySeverity = severity ? severity.toUpperCase() : 'UNKNOWN';
  return (
    <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-5">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-blue-900 dark:text-blue-300">Severity</h3>
          </div>
          <Badge className={`${severity === 'Critical' ? 'bg-red-600 hover:bg-red-700' : severity === 'High' ? 'bg-orange-500 hover:bg-orange-600' : severity === 'Medium' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-none`}>{displaySeverity}</Badge>
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-200/80 mt-auto">
          AI assessed severity level for this investigation.
        </p>
      </div>
    </div>
  );
}
