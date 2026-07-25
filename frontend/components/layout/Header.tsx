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
        {/* Repository Selector */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
          <GitBranch className="h-4 w-4 mr-2 text-slate-700" />
          <span className="text-sm font-medium text-slate-700 mr-2">sample-ecommerce</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </div>
        
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        
        <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-slate-900">
          <Moon className="h-5 w-5" />
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm shadow-sm ring-2 ring-white">
          JD
        </div>
      </div>
    </header>
  );
}
