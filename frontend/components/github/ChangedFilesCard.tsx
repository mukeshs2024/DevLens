import { FileCode, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ChangedFilesCard({ data }: { data?: any }) {
  const files: string[] = data?.changed_files || [];

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <FileCode className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-bold text-slate-900">Changed Files ({files.length})</h3>
        </div>

        <div className="space-y-2 mb-4">
          {files.length === 0 ? (
            <p className="text-sm text-slate-500">No changed files data available.</p>
          ) : (
            files.map((file, i) => (
              <div key={i} className="flex flex-col p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate mb-1">{file}</span>
              </div>
            ))
          )}
        </div>
        
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center py-2 hover:bg-slate-50 rounded-lg transition-colors">
          View all changes <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}
