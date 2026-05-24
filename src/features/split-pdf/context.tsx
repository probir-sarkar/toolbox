import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { SplitPdfSettings, SplitPdfFile } from "./types";
import { DEFAULT_SPLIT_PDF_SETTINGS } from "./constants";
import { useProcessingState } from "@/shared/hooks";

interface SplitPdfContextValue {
  fileData: SplitPdfFile | null;
  settings: SplitPdfSettings;
  isProcessing: boolean;
  error: string | null;
  setFile: (file: File | null, pageCount: number) => void;
  updateSettings: (settings: Partial<SplitPdfSettings>) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const SplitPdfContext = createContext<SplitPdfContextValue | null>(null);

export function SplitPdfProvider({ children }: { children: ReactNode }) {
  const [fileData, setFileData] = useState<SplitPdfFile | null>(null);
  const [settings, setSettings] = useState<SplitPdfSettings>(DEFAULT_SPLIT_PDF_SETTINGS);
  const processingState = useProcessingState();

  const setFile = useCallback((file: File | null, pageCount: number) => {
    if (file) {
      setFileData({
        file,
        pageCount,
        fileName: file.name.replace(".pdf", ""),
        fileSize: file.size,
      });
      setSettings((prev) => ({
        ...prev,
        pageRange: pageCount > 0 ? `1-${pageCount}` : "",
        outputFileName: file.name.replace(".pdf", ""),
      }));
    } else {
      setFileData(null);
    }
    processingState.setError(null);
  }, [processingState]);

  const updateSettings = useCallback((newSettings: Partial<SplitPdfSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const reset = useCallback(() => {
    setFileData(null);
    setSettings(DEFAULT_SPLIT_PDF_SETTINGS);
    processingState.setError(null);
    processingState.setIsProcessing(false);
  }, [processingState]);

  const setError = useCallback((error: string | null) => {
    processingState.setError(error);
  }, [processingState]);

  const value: SplitPdfContextValue = {
    fileData,
    settings,
    isProcessing: processingState.isProcessing,
    error: processingState.error,
    setFile,
    updateSettings,
    setIsProcessing: processingState.setIsProcessing,
    setError,
    reset,
  };

  return (
    <SplitPdfContext.Provider value={value}>
      {children}
    </SplitPdfContext.Provider>
  );
}

export function useSplitPdfContext(): SplitPdfContextValue {
  const context = useContext(SplitPdfContext);
  if (!context) {
    throw new Error("useSplitPdfContext must be used within SplitPdfProvider");
  }
  return context;
}
