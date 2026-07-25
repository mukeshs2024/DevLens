import { AnalysisResult, Incident } from '@/types';

export const mockIncidents: Incident[] = [
  {
    id: 'inc-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    severity: 'critical',
    message: 'Database connection timeout (5000ms) in us-east-1.',
    source: 'backend/db-pool',
  },
  {
    id: 'inc-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    severity: 'high',
    message: 'High latency detected on /api/v1/users endpoint.',
    source: 'api-gateway',
  },
  {
    id: 'inc-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    severity: 'medium',
    message: 'Memory usage exceeded 85% threshold.',
    source: 'worker-node-4',
  },
  {
    id: 'inc-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    severity: 'low',
    message: 'Cache miss rate increased by 15%.',
    source: 'redis-cache',
  }
];

export const mockAnalysisResult: AnalysisResult = {
  id: 'analysis-101',
  deploymentId: 'dep-xyz-789',
  status: 'critical',
  rootCauseSummary: 'A recent deployment (v2.4.1) introduced a regression in the database connection pool management, causing connections to leak and eventually timeout during high load spikes.',
  confidenceScore: 94,
  relatedIncidents: mockIncidents,
  recommendations: [
    'Rollback to deployment v2.4.0 immediately to restore connection stability.',
    'Review the db-pool.ts changes in PR #412 for unhandled Promise rejections.',
    'Increase the max connection pool size temporarily while debugging.'
  ],
  rawLogsSnippet: `[2026-07-25 10:15:22] INFO Deploying v2.4.1 to production...
[2026-07-25 10:16:01] INFO Service backend-api started successfully.
[2026-07-25 10:18:45] WARN Connection pool utilization at 80%.
[2026-07-25 10:20:12] ERROR Database connection timeout (5000ms) in us-east-1.
    at Pool.getConnection (/app/node_modules/pg/lib/pool.js:154:21)
    at Object.query (/app/src/db-pool.ts:45:12)
[2026-07-25 10:20:15] ERROR Failed to process request for /api/v1/users: DB connection failed.`,
};

export const generateTimelineData = () => {
  const data = [];
  let time = new Date(Date.now() - 1000 * 60 * 60 * 24); // 24 hours ago
  for (let i = 0; i < 24; i++) {
    time = new Date(time.getTime() + 1000 * 60 * 60); // Add 1 hour
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      errors: Math.floor(Math.random() * (i === 22 ? 150 : 20)), // Spike at hour 22
      deployments: i === 21 ? 1 : 0,
    });
  }
  return data;
};
