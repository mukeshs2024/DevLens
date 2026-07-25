"use client";

import { GitBranch, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Incident Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">AI-powered analysis of your deployment failure</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-slate-900">
          <Moon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
