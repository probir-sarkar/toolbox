import { useState, useCallback } from "react";

export interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
}

export function useProcessingState() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const startProcessing = useCallback(() => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
  }, []);

  const stopProcessing = useCallback(() => {
    setIsProcessing(false);
  }, []);

  const setErrorWithStop = useCallback(
    (errorMessage: string) => {
      setError(errorMessage);
      setIsProcessing(false);
      setSuccess(false);
    },
    []
  );

  const setSuccessWithStop = useCallback(() => {
    setSuccess(true);
    setIsProcessing(false);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    isProcessing,
    error,
    success,
    setError,
    setSuccess,
    setIsProcessing,
    startProcessing,
    stopProcessing,
    setErrorWithStop,
    setSuccessWithStop,
    reset,
  };
}
