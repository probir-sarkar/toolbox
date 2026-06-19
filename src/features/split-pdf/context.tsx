import { createContext, useContext, ReactNode, useCallback } from "react";
import { useImmer } from "use-immer";
import { isEmpty, uniq } from "es-toolkit/compat";
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
  const [fileData, setFileData] = useImmer<SplitPdfFile | null>(null);
  const [settings, setSettings] = useImmer<SplitPdfSettings>(DEFAULT_SPLIT_PDF_SETTINGS);
  const [selectedPages, setSelectedPages] = useImmer<number[]>([]);
  const processingState = useProcessingState();

  const updatePageRangeFromSelection = useCallback((pages: number[]) => {
    setSettings((draft) => {
      if (isEmpty(pages)) {
        draft.pageRange = "";
        return;
      }

      const sortedPages = uniq(pages).sort((a, b) => a - b);
      const ranges: string[] = [];
      let start = sortedPages[0];
      let end = sortedPages[0];

      for (let i = 1; i < sortedPages.length; i++) {
        if (sortedPages[i] === end + 1) {
          end = sortedPages[i];
        } else {
          ranges.push(start === end ? `${start}` : `${start}-${end}`);
          start = sortedPages[i];
          end = sortedPages[i];
        }
      }
      ranges.push(start === end ? `${start}` : `${start}-${end}`);
      draft.pageRange = ranges.join(", ");
    });
  }, [setSettings]);

  const togglePageSelection = useCallback((page: number) => {
    const isSelected = selectedPages.includes(page);
    const newPages = isSelected
      ? selectedPages.filter((p) => p !== page)
      : uniq([...selectedPages, page]);
    setSelectedPages(newPages);
    updatePageRangeFromSelection(newPages);
  }, [selectedPages, updatePageRangeFromSelection]);

  const selectAllPages = useCallback(() => {
    if (!fileData) return;

    const allPages = Array.from({ length: fileData.pageCount }, (_, i) => i + 1);
    setSelectedPages(allPages);
    updatePageRangeFromSelection(allPages);
  }, [fileData, updatePageRangeFromSelection]);

  const deselectAllPages = useCallback(() => {
    setSelectedPages([]);
    updatePageRangeFromSelection([]);
  }, [updatePageRangeFromSelection]);

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

      setSettings((draft) => {
        draft.pageRange = pageCount > 0 ? `1-${pageCount}` : "";
        draft.outputFileName = file.name.replace(/\.pdf$/i, "");
      });
    } else {
      setFileData(null);
      setSelectedPages([]);
    }

    processingState.setError(null);
  }, [setFileData, setSelectedPages, setSettings, processingState]);

  const updateSettings = useCallback((newSettings: Partial<SplitPdfSettings>) => {
    setSettings((draft) => {
      Object.assign(draft, newSettings);
    });
  }, [setSettings]);

  const reset = useCallback(() => {
    setFileData(null);
    setSettings(DEFAULT_SPLIT_PDF_SETTINGS);
    setSelectedPages([]);
    processingState.setError(null);
    processingState.setIsProcessing(false);
  }, [setFileData, setSettings, setSelectedPages, processingState]);

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
