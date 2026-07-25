import { GitBranch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function RepositoryCard() {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Repository</p>
          <h2 className="text-xl font-bold text-slate-900 truncate max-w-[150px]" title="sample-ecommerce">sample-ecommerce</h2>
          <div className="flex items-center mt-2">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">branch: main</span>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <GitBranch className="h-6 w-6 text-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
}
