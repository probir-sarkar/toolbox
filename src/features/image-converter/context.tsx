import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { ConverterFile, ConversionResult, ImageConverterSettings } from "./types";
import { DEFAULT_IMAGE_CONVERTER_SETTINGS } from "./constants";

interface ImageConverterContextValue {
  settings: ImageConverterSettings;
  files: ConverterFile[];
  isProcessing: boolean;
  error: string | null;
  updateSettings: (settings: Partial<ImageConverterSettings>) => void;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateFileStatus: (id: string, status: ConverterFile["status"], progress?: number) => void;
  updateFileResult: (id: string, result: ConversionResult) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const ImageConverterContext = createContext<ImageConverterContextValue | null>(null);

export function ImageConverterProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ImageConverterSettings>(DEFAULT_IMAGE_CONVERTER_SETTINGS);
  const [files, setFiles] = useState<ConverterFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSettings = useCallback((newSettings: Partial<ImageConverterSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const addFiles = useCallback((newFiles: File[]) => {
    const filesToAdd: ConverterFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: undefined,
      status: "pending" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...filesToAdd]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const updateFileStatus = useCallback((id: string, status: ConverterFile["status"], progress?: number) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status, progress: progress ?? f.progress } : f)));
  }, []);

  const updateFileResult = useCallback((id: string, result: ConversionResult) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, result } : f)));
  }, []);

  const reset = useCallback(() => {
    setFiles([]);
    setIsProcessing(false);
    setError(null);
    setSettings(DEFAULT_IMAGE_CONVERTER_SETTINGS);
  }, []);

  const value: ImageConverterContextValue = {
    settings,
    files,
    isProcessing,
    error,
    updateSettings,
    addFiles,
    removeFile,
    clearFiles,
    updateFileStatus,
    updateFileResult,
    setIsProcessing,
    setError,
    reset,
  };

  return <ImageConverterContext.Provider value={value}>{children}</ImageConverterContext.Provider>;
}

export function useImageConverterContext(): ImageConverterContextValue {
  const context = useContext(ImageConverterContext);
  if (!context) {
    throw new Error("useImageConverterContext must be used within ImageConverterProvider");
  }
  return context;
}
