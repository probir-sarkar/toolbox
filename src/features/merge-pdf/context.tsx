import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { PdfFile, MergePdfSettings } from "./types";
import { DEFAULT_MERGE_PDF_SETTINGS } from "./constants";
import { createPdfFile } from "./services/merge-pdf";
import { useFileHandler } from "@/shared/hooks";
import { useProcessingState } from "@/shared/hooks";

interface MergePdfContextValue {
  files: PdfFile[];
  settings: MergePdfSettings;
  isMerging: boolean;
  error: string | null;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateSettings: (settings: Partial<MergePdfSettings>) => void;
  setFiles: (files: PdfFile[]) => void;
  setIsMerging: (isMerging: boolean) => void;
  setError: (error: string | null) => void;
}

const MergePdfContext = createContext<MergePdfContextValue | null>(null);

export function MergePdfProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<MergePdfSettings>(DEFAULT_MERGE_PDF_SETTINGS);

  const fileHandler = useFileHandler<PdfFile>({
    createFile: (file: File) => createPdfFile(file),
    validateFile: (file: File) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"),
  });

  const processingState = useProcessingState();

  const updateSettings = useCallback((newSettings: Partial<MergePdfSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const setError = useCallback((error: string | null) => {
    fileHandler.setError(error);
    processingState.setError(error);
  }, [fileHandler, processingState]);

  const value: MergePdfContextValue = {
    files: fileHandler.files,
    settings,
    isMerging: processingState.isProcessing,
    error: fileHandler.error || processingState.error,
    addFiles: fileHandler.addFiles,
    removeFile: fileHandler.removeFile,
    clearFiles: fileHandler.clearFiles,
    updateSettings,
    setFiles: fileHandler.setFiles,
    setIsMerging: processingState.setIsProcessing,
    setError,
  };

  return (
    <MergePdfContext.Provider value={value}>
      {children}
    </MergePdfContext.Provider>
  );
}

export function useMergePdfContext(): MergePdfContextValue {
  const context = useContext(MergePdfContext);
  if (!context) {
    throw new Error("useMergePdfContext must be used within MergePdfProvider");
  }
  return context;
}
