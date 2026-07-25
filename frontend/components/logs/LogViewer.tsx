import { Terminal, Maximize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LogViewer() {
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
        <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          <code className="text-slate-400">
            <span className="text-slate-500">2025-05-11T10:24:30</span> <span className="text-blue-400">INFO</span>  PaymentService.process() initialized<br/>
            <span className="text-slate-500">2025-05-11T10:24:30</span> <span className="text-yellow-400">WARN</span>  Database connection pool nearing capacity (85%)<br/>
            <span className="text-slate-500">2025-05-11T10:24:31</span> <span className="text-red-400 font-bold">ERROR</span> connect ETIMEDOUT 10.0.12.4:5432<br/>
            <span className="text-slate-500"></span>       at PaymentService.process() (/app/src/services/payment.service.ts:42:15)<br/>
            <span className="text-slate-500"></span>       at OrdersController.createOrder() (/app/src/controllers/orders.ts:18:22)
          </code>
        </pre>
      </CardContent>
    </Card>
  );
}
