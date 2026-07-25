"use client";

import { useUpload } from '@/hooks/use-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, FileText, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UploadPage() {
  const { upload, isUploading, progress } = useUpload();
  const router = useRouter();
  const [statusText, setStatusText] = useState('Parsing logs...');
  
  const [repoUrl, setRepoUrl] = useState('https://github.com/mukeshs2024/DevLens');
  const [branch, setBranch] = useState('main');
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
      setErrorMsg('Please enter a valid GitHub repository URL.');
      return;
    }
    setErrorMsg('');
    try {
      await upload(file, repoUrl, branch);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (e: any) {
      setErrorMsg(e.message || 'Upload failed');
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Repository Details</CardTitle>
              <CardDescription>Provide the repository where this failure occurred to fetch context.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo">GitHub Repository URL</Label>
                <Input id="repo" value={repoUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepoUrl(e.target.value)} placeholder="https://github.com/owner/repo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch (Optional)</Label>
                <Input id="branch" value={branch} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBranch(e.target.value)} placeholder="main" />
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            </CardContent>
          </Card>
          
          <Card 
            className="border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-4">
                <UploadCloud className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Files Here</h3>
              <p className="text-slate-500 mb-6 max-w-sm">Support for raw .log, .txt, or JSON structured logs from AWS, GCP, or Kubernetes.</p>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".log,.txt,.json"
                  onChange={handleFileChange}
                />
                <Button onClick={() => fileInputRef.current?.click()}>Select Files from Computer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleUpload(new File(['Sample log file content with errors'], 'sample.log'))}>
              Load Sample Investigation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
