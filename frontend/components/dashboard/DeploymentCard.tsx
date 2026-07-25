import { XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DeploymentCard() {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Deployment Status</p>
          <h2 className="text-2xl font-bold text-red-500">Failed</h2>
          <p className="text-xs text-slate-400 mt-2">May 11, 2025 • 10:24 AM</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
      </CardContent>
    </Card>
  );
}
