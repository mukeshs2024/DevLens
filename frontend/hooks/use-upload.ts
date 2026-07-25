import { useState, useCallback } from 'react';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    try {
      // Simulate upload progress
      setProgress(50);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: file
      });
      setProgress(100);
      return res;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, isUploading, progress };
};
