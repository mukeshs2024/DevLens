import { XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DeploymentCard({ data }: { data?: any }) {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Deployment Status</p>
          {data?.parsed_errors?.length > 0 ? (
             <h2 className="text-2xl font-bold text-red-600">FAILED 🔴</h2>
          ) : data ? (
             <h2 className="text-2xl font-bold text-emerald-600">SUCCESS 🟢</h2>
          ) : (
             <h2 className="text-2xl font-bold text-slate-900 capitalize">Unknown</h2>
          )}
          <p className="text-xs text-slate-400 mt-2">Latest deployment</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <XCircle className={`h-6 w-6 ${data?.parsed_errors?.length > 0 ? 'text-red-500' : 'text-slate-400'}`} />
        </div>
      </CardContent>
    </Card>
  );
}
