import Link from 'next/link';
import { ArrowRight, Activity, ShieldAlert, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">DevLens</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#">Features</Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#">Pricing</Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#">About</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Investigate deployments at <span className="text-indigo-600 dark:text-indigo-400">lightspeed.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400 mt-4">
                  DevLens is an AI-powered Deployment & Incident Investigation Platform. Instantly find the root cause of failures before they impact your users.
                </p>
              </div>
              <div className="space-x-4 mt-8">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">
                    Start Investigation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Upload Logs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-slate-50/50 dark:bg-slate-950/50">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold">Instant AI Analysis</h2>
                <p className="text-slate-500 dark:text-slate-400">Our models digest thousands of log lines to pinpoint the exact root cause in seconds.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-slate-50/50 dark:bg-slate-950/50">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full">
                  <ShieldAlert className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h2 className="text-xl font-bold">Incident Correlation</h2>
                <p className="text-slate-500 dark:text-slate-400">Automatically map errors back to specific deployment hashes and commits.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-slate-50/50 dark:bg-slate-950/50">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <Activity className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold">Actionable Fixes</h2>
                <p className="text-slate-500 dark:text-slate-400">Get step-by-step remediation plans tailored to your specific tech stack and errors.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © 2026 DevLens Inc. All rights reserved. (Hackathon Project)
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}
