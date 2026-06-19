import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { SplitPdfSettings, SplitPdfFile } from "./types";
import { DEFAULT_SPLIT_PDF_SETTINGS } from "./constants";
import { useProcessingState } from "@/shared/hooks";

interface SplitPdfContextValue {
  fileData: SplitPdfFile | null;
  settings: SplitPdfSettings;
  selectedPages: number[];
  isProcessing: boolean;
  error: string | null;
  setFile: (file: File | null, pageCount: number) => void;
  updateSettings: (settings: Partial<SplitPdfSettings>) => void;
  togglePageSelection: (page: number) => void;
  selectAllPages: () => void;
  deselectAllPages: () => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const SplitPdfContext = createContext<SplitPdfContextValue | null>(null);

export function SplitPdfProvider({ children }: { children: ReactNode }) {
  const [fileData, setFileData] = useState<SplitPdfFile | null>(null);
  const [settings, setSettings] = useState<SplitPdfSettings>(DEFAULT_SPLIT_PDF_SETTINGS);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const processingState = useProcessingState();

  const setFile = useCallback((file: File | null, pageCount: number) => {
    if (file) {
      setFileData({
        file,
        pageCount,
        fileName: file.name.replace(/\.pdf$/i, ""),
        fileSize: file.size,
      });

      const allPages = Array.from({ length: pageCount }, (_, i) => i + 1);
      setSelectedPages(allPages);
      setSettings({
        splitMode: "extract",
        outputFileName: file.name.replace(/\.pdf$/i, ""),
      });
    } else {
      setFileData(null);
      setSelectedPages([]);
      setSettings(DEFAULT_SPLIT_PDF_SETTINGS);
    }
    processingState.setError(null);
  }, [processingState]);

  const togglePageSelection = useCallback((page: number) => {
    setSelectedPages((prev) => {
      return prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page].sort((a, b) => a - b);
    });
  }, []);

  const selectAllPages = useCallback(() => {
    if (!fileData) return;
    const allPages = Array.from({ length: fileData.pageCount }, (_, i) => i + 1);
    setSelectedPages(allPages);
  }, [fileData]);

  const deselectAllPages = useCallback(() => {
    setSelectedPages([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SplitPdfSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const reset = useCallback(() => {
    setFileData(null);
    setSelectedPages([]);
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
    selectedPages,
    isProcessing: processingState.isProcessing,
    error: processingState.error,
    setFile,
    updateSettings,
    togglePageSelection,
    selectAllPages,
    deselectAllPages,
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
