import { Terminal, Maximize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LogViewer({ data }: { data?: any }) {
  const errors: any[] = data?.parsed_errors || [];
  const stackTraces: string[] = data?.stack_traces || [];

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden bg-slate-900 text-slate-300">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F172A]">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-slate-400" />
          <h3 className="font-bold text-slate-100">Extracted Error (from logs)</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
          <Maximize2 className="h-4 w-4 mr-2" />
          View Full Logs
        </Button>
      </div>
      <CardContent className="p-0">
        <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <code className="text-slate-400">
            {errors.length === 0 && stackTraces.length === 0 && (
              <span className="text-slate-500">No parsed errors or stack traces found.</span>
            )}
            {errors.map((err, i) => (
              <div key={`err-${i}`} className="mb-2">
                <span className="text-red-400 font-bold">ERROR</span> (Line {err.line}): {err.message}
              </div>
            ))}
            {stackTraces.map((trace, i) => (
              <div key={`trace-${i}`} className="text-slate-500 mt-2">
                {trace}
              </div>
            ))}
          </code>
        </pre>
      </CardContent>
    </Card>
  );
}
