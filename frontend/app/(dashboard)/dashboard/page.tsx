"use client";

import { useState, useEffect } from 'react';
import { DeploymentCard } from '@/components/dashboard/DeploymentCard';
import { RepositoryCard } from '@/components/dashboard/RepositoryCard';
import { PullRequestCard } from '@/components/dashboard/PullRequestCard';
import { CommitCard } from '@/components/dashboard/CommitCard';
import { AIAnalysisCard } from '@/components/ai/AIAnalysisCard';
import { RelatedPRCard } from '@/components/github/RelatedPRCard';
import { ChangedFilesCard } from '@/components/github/ChangedFilesCard';
import { LogViewer } from '@/components/logs/LogViewer';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('devlens_analysis');
    if (data) {
      setAnalysisData(JSON.parse(data));
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-8 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}><DeploymentCard data={analysisData} /></motion.div>
        <motion.div variants={itemVariants}><RepositoryCard data={analysisData} /></motion.div>
        <motion.div variants={itemVariants}><PullRequestCard data={analysisData} /></motion.div>
        <motion.div variants={itemVariants}><CommitCard data={analysisData} /></motion.div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - 65% */}
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-8">
          <AIAnalysisCard data={analysisData} />
          
          {/* Logs */}
          <div className="mt-auto">
            <LogViewer data={analysisData} />
          </div>
        </motion.div>

        {/* Right Column - 35% */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
          <RelatedPRCard data={analysisData} />
          <ChangedFilesCard data={analysisData} />
        </motion.div>

      </div>
    </motion.div>
  );
}
