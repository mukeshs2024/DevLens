import { GitPullRequest } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function PullRequestCard({ data }: { data?: any }) {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Latest Pull Request</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-400">N/A</span>
            <span className="text-sm font-medium text-slate-400 truncate max-w-[120px]">Not fetched in MVP</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold shrink-0">
              ?
            </div>
            <span className="text-xs text-slate-400">-</span>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <GitPullRequest className="h-6 w-6 text-slate-400" />
        </div>
      </CardContent>
    </Card>
  );
}
