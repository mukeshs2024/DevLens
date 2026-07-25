import { FileCode, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ChangedFilesCard() {
  const files = [
    { path: 'src/config/database.ts', add: 12, del: 4 },
    { path: 'src/services/payment.service.ts', add: 8, del: 2 },
    { path: '.env.example', add: 1, del: 1 },
  ];

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <FileCode className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-bold text-slate-900">Changed Files (3)</h3>
        </div>

        <div className="space-y-2 mb-4">
          {files.map((file, i) => (
            <div key={i} className="flex flex-col p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate mb-2">{file.path}</span>
              <div className="flex items-center gap-3 text-xs font-mono font-medium">
                <span className="text-green-600 bg-green-100/50 px-1.5 py-0.5 rounded">+{file.add}</span>
                <span className="text-red-600 bg-red-100/50 px-1.5 py-0.5 rounded">-{file.del}</span>
              </div>
            </div>
          ))}
        </div>
        
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center py-2 hover:bg-slate-50 rounded-lg transition-colors">
          View all changes <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}
