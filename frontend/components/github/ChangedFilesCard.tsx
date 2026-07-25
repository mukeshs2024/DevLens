import { FileCode, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ChangedFilesCard({ data }: { data?: any }) {
  const files: any[] = data?.changed_files || [];
  
  const repo = data?.repository || '';
  const commit = data?.latest_commit || '';
  const githubLink = repo && commit ? `https://github.com/${repo}/commit/${commit}` : '#';

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <FileCode className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-bold text-slate-900">Changed Files ({files.length})</h3>
        </div>

        <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
          {files.length === 0 ? (
            <p className="text-sm text-slate-500">No changed files data available.</p>
          ) : (
            files.map((file, i) => (
              <div key={i} className="flex flex-col p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate mb-1" title={typeof file === 'string' ? file : file.filename}>
                  {typeof file === 'string' ? file : file.filename}
                </span>
                {typeof file !== 'string' && (
                  <div className="flex gap-3 text-xs mt-1 font-medium">
                    <span className="text-emerald-600">+{file.additions}</span>
                    <span className="text-rose-600">-{file.deletions}</span>
                    <span className="text-slate-500 ml-auto capitalize">{file.status}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center py-2 hover:bg-slate-50 rounded-lg transition-colors">
          View all changes <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}
