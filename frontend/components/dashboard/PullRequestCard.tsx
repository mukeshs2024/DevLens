import { GitPullRequest } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function PullRequestCard({ data }: { data?: any }) {
  const pr = data?.pull_request;
  const hasPr = !!pr;

  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="overflow-hidden pr-4">
          <p className="text-sm font-medium text-slate-500 mb-1">Latest Pull Request</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{hasPr ? `#${pr.number}` : 'No PR'}</span>
            <span className="text-sm font-medium text-slate-600 truncate max-w-[120px]" title={pr?.title}>{hasPr ? pr.title : 'No pull request found'}</span>
          </div>
          {hasPr && (
            <div className="flex items-center gap-2 mt-2">
              <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                {pr.user?.login?.charAt(0).toUpperCase() || '?'}
              </div>
              <span className="text-xs text-slate-500">
                {pr.user?.login} • {pr.state}
              </span>
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <a href={hasPr ? pr.html_url : '#'} target="_blank" rel="noopener noreferrer">
            <GitPullRequest className="h-6 w-6 text-slate-700 hover:text-indigo-600 transition-colors" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
