"use client";

import { useUpload } from '@/hooks/use-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, FileText, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UploadPage() {
  const { upload, isUploading, progress } = useUpload();
  const router = useRouter();
  const [statusText, setStatusText] = useState('Parsing logs...');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await upload(e.target.files[0]);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }
  };

  useEffect(() => {
    if (progress > 30 && progress < 70) {
      setStatusText('Correlating errors with deployments...');
    } else if (progress >= 70 && progress < 100) {
      setStatusText('Generating AI Insights...');
    } else if (progress === 100) {
      setStatusText('Analysis Complete!');
    } else {
      setStatusText('Parsing logs...');
    }
  }, [progress]);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto h-full flex flex-col justify-center py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Investigation</h1>
        <p className="text-slate-500">Upload your server logs or deployment manifest to let DevLens AI analyze the failure.</p>
      </div>

      {!isUploading && progress === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-4">
              <UploadCloud className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drag & Drop Files Here</h3>
            <p className="text-slate-500 mb-6 max-w-sm">Support for raw .log, .txt, or JSON structured logs from AWS, GCP, or Kubernetes.</p>
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <Button>Select Files from Computer</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border shadow-lg">
          <CardContent className="py-12 px-6 flex flex-col items-center text-center">
            <div className="relative mb-8">
              {progress === 100 ? (
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/20 rounded-full animate-in zoom-in duration-300">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                </div>
              ) : (
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full animate-pulse">
                  <Bot className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">{progress === 100 ? 'Investigation Ready' : 'AI Analysis in Progress'}</h3>
            <p className="text-slate-500 mb-8">{statusText}</p>
            <div className="w-full max-w-md space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>0%</span>
                <span>{progress}%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="h-4 w-4 mr-2 text-slate-500" />
              Sample Data Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">Don't have logs? Use our sample e-commerce backend crash logs to test DevLens.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => upload(new File([], 'sample.log'))}>
              Load Sample Investigation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
