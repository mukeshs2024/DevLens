"use client";

import { FileCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function CommitCard({ data }: { data?: any }) {
  const commitSha = data?.latest_commit ? data.latest_commit.substring(0, 7) : 'Unknown';
  const commitMsg = data?.commit_message || 'No commit message';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow h-full">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-500 mb-1">Commit</p>
            <h2 className="text-xl font-mono font-bold text-slate-900">{commitSha}</h2>
            <p className="text-xs text-slate-400 mt-2 truncate max-w-[180px]" title={commitMsg}>{commitMsg}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <FileCode className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
