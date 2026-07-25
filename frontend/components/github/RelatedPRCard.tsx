import { GitPullRequest, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RelatedPRCard({ data }: { data?: any }) {
  const pr = data?.pull_request;
  const hasPr = !!pr;

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <GitPullRequest className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-slate-900">Related Pull Request</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{hasPr ? `#${pr.number}` : 'No recent pull request detected.'}</span>
                <span className="text-sm font-medium text-slate-600 truncate max-w-[120px]" title={pr?.title}>{hasPr ? pr.title : 'No pull request found'}</span>
              </div>
              {hasPr && (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                    {pr.user?.login?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <span className="text-xs text-slate-500">
                    {pr.user?.login} • Updated {new Date(pr.updated_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm text-slate-600 border border-slate-100 dark:border-slate-800">
            {hasPr ? pr.body || 'No description provided.' : 'PR context is currently unavailable.'}
          </div>

          {hasPr ? (
            <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center items-center py-2 px-4 bg-white border border-slate-200 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Open on GitHub <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          ) : (
            <Button disabled className="w-full bg-slate-100 text-slate-400 shadow-sm hover:bg-slate-100">
              Open on GitHub <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
