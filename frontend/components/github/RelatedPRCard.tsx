import { GitPullRequest, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RelatedPRCard() {
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-indigo-600">PR #42</span>
                <span className="text-sm font-medium text-slate-900">Fix payment validation logic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                  JD
                </div>
                <span className="text-xs text-slate-500">John Doe • 2 hours ago</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
            Changes may have affected database configuration and connection handling.
          </div>

          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
            Open on GitHub <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
