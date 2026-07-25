export type Status = 'healthy' | 'degraded' | 'critical' | 'analyzing';

export interface Incident {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source: string;
}

export interface AnalysisResult {
  id: string;
  deploymentId: string;
  status: Status;
  rootCauseSummary: string;
  confidenceScore: number;
  relatedIncidents: Incident[];
  recommendations: string[];
  rawLogsSnippet?: string;
}

export interface UploadResponse {
  uploadId: string;
  status: 'pending' | 'processing' | 'completed';
}
