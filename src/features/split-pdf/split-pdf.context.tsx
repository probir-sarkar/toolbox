import { createContext, useContext, ReactNode, useState, useCallback } from "react";

export type SplitMode = "extract" | "split-all";

interface SplitPdfContextValue {
  file: File | null;
  pageCount: number;
  fileName: string;
  fileSize: number;
  splitMode: SplitMode;
  pageRange: string;
  isProcessing: boolean;
  error: string | null;
  setFile: (file: File | null, pageCount: number) => void;
  setSplitMode: (mode: SplitMode) => void;
  setPageRange: (range: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const SplitPdfContext = createContext<SplitPdfContextValue | null>(null);

export function SplitPdfProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [splitMode, setSplitMode] = useState<SplitMode>("extract");
  const [pageRange, setPageRange] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setFileHandler = useCallback((file: File | null, pageCount: number) => {
    setFile(file);
    setPageCount(pageCount);
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setPageRange(`1-${pageCount}`);
    } else {
      setFileName("");
      setFileSize(0);
      setPageRange("");
    }
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setPageCount(0);
    setFileName("");
    setFileSize(0);
    setPageRange("");
    setIsProcessing(false);
    setError(null);
  }, []);

  const value = {
    file,
    pageCount,
    fileName,
    fileSize,
    splitMode,
    pageRange,
    isProcessing,
    error,
    setFile: setFileHandler,
    setSplitMode,
    setPageRange,
    setIsProcessing,
    setError,
    reset
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
