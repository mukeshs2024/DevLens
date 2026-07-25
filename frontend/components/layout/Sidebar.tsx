"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, UploadCloud, FolderGit2, Settings, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload Logs', href: '/upload', icon: UploadCloud },
    { label: 'Analysis History', href: '#', icon: History },
    { label: 'Repositories', href: '#', icon: FolderGit2 },
    { label: 'Settings', href: '#', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#081028] text-white flex flex-col h-screen fixed md:sticky top-0 left-0 z-50">
      <div className="p-6">
        <Link href="/" className="flex items-center mb-2">
          <Activity className="h-7 w-7 text-indigo-400" />
          <span className="ml-2 text-2xl font-bold tracking-tight">DevLens</span>
        </Link>
        <p className="text-xs text-slate-400 leading-tight mb-8">
          AI-powered Deployment &<br />Incident Investigation
        </p>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 rounded-xl'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <div className="absolute top-0 right-0 p-8 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              <h4 className="font-bold text-white text-sm">DevLens AI</h4>
            </div>
            <p className="text-xs text-slate-300">Your AI assistant for faster incident resolution.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
