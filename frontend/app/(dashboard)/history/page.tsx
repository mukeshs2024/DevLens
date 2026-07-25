"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await api.getHistory();
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this investigation?')) return;
    
    try {
      await api.deleteHistory(id);
      fetchHistory();
    } catch (e) {
      console.error('Failed to delete', e);
    }
  };
  
  const handleView = (item: any) => {
    localStorage.setItem('devlens_analysis', JSON.stringify(item.data));
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-500">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Analysis History</h1>
          <p className="text-slate-500">Past investigations and AI resolutions.</p>
        </div>
      </div>
      
      {history.length === 0 ? (
        <Card className="border-dashed bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <Clock className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-1">No history found</h3>
            <p className="text-slate-500">Your past investigations will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleView(item)}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{item.repository || 'Unknown Repo'}</h3>
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-600">{item.branch || 'main'}</span>
                    <span className={`text-xs px-2 py-1 rounded-md capitalize font-medium ${
                      item.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                      item.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.severity || 'Unknown'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2 truncate max-w-2xl">{item.summary}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => handleDelete(item.id, e)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleView(item)}>
                    View <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
