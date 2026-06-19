import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { uniq } from "es-toolkit/compat";
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

function pagesToRange(pages: number[]): string {
  if (pages.length === 0) return "";

  const sorted = uniq(pages).sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${start}` : `${start}-${end}`);
      start = sorted[i];
      end = sorted[i];
    }
  }
  ranges.push(start === end ? `${start}` : `${start}-${end}`);
  return ranges.join(", ");
}

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
        pageRange: pageCount > 0 ? `1-${pageCount}` : "",
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
      const newPages = prev.includes(page)
        ? prev.filter((p) => p !== page)
        : uniq([...prev, page]);

      setSettings((prev) => ({ ...prev, pageRange: pagesToRange(newPages) }));
      return newPages;
    });
  }, []);

  const selectAllPages = useCallback(() => {
    if (!fileData) return;
    const allPages = Array.from({ length: fileData.pageCount }, (_, i) => i + 1);
    setSelectedPages(allPages);
    setSettings((prev) => ({ ...prev, pageRange: pagesToRange(allPages) }));
  }, [fileData]);

  const deselectAllPages = useCallback(() => {
    setSelectedPages([]);
    setSettings((prev) => ({ ...prev, pageRange: "" }));
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
