import { createContext, useContext, ReactNode, useState, useCallback } from "react";

export const FORMATS = [
  { value: "webp", label: "WebP", desc: "Best compression & quality" },
  { value: "jpg", label: "JPEG", desc: "Universal format" },
  { value: "png", label: "PNG", desc: "Lossless format" },
  { value: "avif", label: "AVIF", desc: "Next-gen format" }
] as const;

export type ImageFormat = (typeof FORMATS)[number]["value"];

export type FileStatus = "pending" | "processing" | "completed" | "error";

export interface ConversionResult {
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  savings: number;
  savingsPercent: string;
}

export interface ConverterFile {
  id: string;
  file: File;
  preview?: string;
  status: FileStatus;
  progress?: number;
  result?: ConversionResult;
}

interface ImageConverterContextValue {
  selectedFormat: ImageFormat;
  quality: number;
  autoOptimize: boolean;
  removeMetadata: boolean;
  files: ConverterFile[];
  isProcessing: boolean;
  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setAutoOptimize: (enabled: boolean) => void;
  setRemoveMetadata: (enabled: boolean) => void;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateFileStatus: (id: string, status: FileStatus, progress?: number) => void;
  updateFileResult: (id: string, result: ConversionResult) => void;
  setIsProcessing: (processing: boolean) => void;
}

const ImageConverterContext = createContext<ImageConverterContextValue | null>(null);

export function ImageConverterProvider({ children }: { children: ReactNode }) {
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("webp");
  const [quality, internalSetQuality] = useState(85);
  const [autoOptimize, setAutoOptimizeState] = useState(true);
  const [removeMetadata, setRemoveMetadataState] = useState(true);
  const [files, setFiles] = useState<ConverterFile[]>([]);
  const [isProcessing, setIsProcessingState] = useState(false);

  const setFormat = useCallback((format: ImageFormat) => {
    setSelectedFormat(format);
  }, []);

  const setQuality = useCallback((value: number) => {
    internalSetQuality(value);
  }, []);

  const setAutoOptimize = useCallback((enabled: boolean) => {
    setAutoOptimizeState(enabled);
  }, []);

  const setRemoveMetadata = useCallback((enabled: boolean) => {
    setRemoveMetadataState(enabled);
  }, []);

  const addFiles = useCallback((newFiles: File[]) => {
    const filesToAdd: ConverterFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: undefined,
      status: "pending" as FileStatus,
      progress: 0
    }));
    setFiles((prev) => [...prev, ...filesToAdd]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const updateFileStatus = useCallback((id: string, status: FileStatus, progress?: number) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status, progress: progress ?? f.progress } : f
      )
    );
  }, []);

  const updateFileResult = useCallback((id: string, result: ConversionResult) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, result } : f)));
  }, []);

  const setIsProcessing = useCallback((processing: boolean) => {
    setIsProcessingState(processing);
  }, []);

  const value = {
    selectedFormat,
    quality,
    autoOptimize,
    removeMetadata,
    files,
    isProcessing,
    setFormat,
    setQuality,
    setAutoOptimize,
    setRemoveMetadata,
    addFiles,
    removeFile,
    clearFiles,
    updateFileStatus,
    updateFileResult,
    setIsProcessing
  };

  return (
    <ImageConverterContext.Provider value={value}>
      {children}
    </ImageConverterContext.Provider>
  );
}

export function useImageConverterContext(): ImageConverterContextValue {
  const context = useContext(ImageConverterContext);
  if (!context) {
    throw new Error("useImageConverterContext must be used within ImageConverterProvider");
  }
  return context;
}
