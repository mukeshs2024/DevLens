import { useState, useCallback } from 'react';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file: File, repository_url: string, branch: string) => {
    setIsUploading(true);
    setProgress(0);
    try {
      const text = await file.text();
      setProgress(30);

      // Call the DevLens backend
      const res = await fetch('http://127.0.0.1:8000/api/v1/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repository_url: repository_url,
          branch: branch,
          issue_description: "Analyze this log file",
          logs: text
        })
      });
      
      setProgress(80);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || errorData?.detail || 'Analysis failed');
      }
      
      const data = await res.json();
      
      // Store result globally (for demo purposes)
      if (typeof window !== 'undefined') {
        localStorage.setItem('devlens_analysis', JSON.stringify(data));
      }
      
      setProgress(100);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, isUploading, progress };
};
