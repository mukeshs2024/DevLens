import { apiClient } from '@/lib/api-client';
import { AnalysisResult, UploadResponse } from './index';

export const uploadLogs = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/upload', formData);
};

export const getAnalysis = async (id: string): Promise<AnalysisResult> => {
  return apiClient.get(`/analysis/${id}`);
};
