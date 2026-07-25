import { Terminal, Maximize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LogViewer({ data }: { data?: any }) {
  const errors: any[] = data?.parsed_errors || [];
  const stackTraces: string[] = data?.stack_traces || [];

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-rose-400 bg-rose-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-amber-400 bg-amber-900/20';
      case 'low': return 'text-blue-400 bg-blue-900/20';
      default: return 'text-slate-400 bg-slate-800/50';
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden bg-slate-900 text-slate-300">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F172A]">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-slate-400" />
          <h3 className="font-bold text-slate-100">Extracted Errors</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
          <Maximize2 className="h-4 w-4 mr-2" />
          View Full Logs
        </Button>
      </div>
      <CardContent className="p-0">
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[500px] overflow-y-auto">
          {errors.length === 0 && stackTraces.length === 0 && (
            <span className="text-slate-500 block">No parsed errors or stack traces found.</span>
          )}
          
          {errors.map((err, i) => (
            <div key={`err-${i}`} className="mb-4 border border-slate-700 rounded p-4 bg-slate-800/50">
              <div className="flex flex-wrap gap-2 mb-2 items-center">
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getSeverityColor(err.severity)}`}>
                  {err.severity || 'Error'}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                  {err.type || 'Unknown'}
                </span>
                {err.line && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-900/40 text-indigo-300 border border-indigo-500/20">
                    Line {err.line}
                  </span>
                )}
              </div>
              <div className="text-slate-200 mt-2 font-medium">
                {err.message}
              </div>
            </div>
          ))}
          
          {stackTraces.length > 0 && (
            <div className="mt-6">
              <h4 className="text-slate-400 font-bold mb-2 uppercase text-xs tracking-wider border-b border-slate-700 pb-2">Stack Traces</h4>
              {stackTraces.map((trace, i) => (
                <div key={`trace-${i}`} className="text-slate-400 mt-2 p-4 bg-slate-950 rounded border border-slate-800 font-mono text-xs overflow-x-auto">
                  {trace}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
