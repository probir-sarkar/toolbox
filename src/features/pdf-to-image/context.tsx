import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { FileInfo, ImageResult, PdfToImageSettings } from "./types";
import { DEFAULT_PDF_TO_IMAGE_SETTINGS } from "./constants";

interface PdfToImageContextValue {
  file: FileInfo | null;
  settings: PdfToImageSettings;
  images: ImageResult[];
  isProcessing: boolean;
  progress: number;
  error: string | null;
  setFile: (file: FileInfo | null) => void;
  updateSettings: (settings: Partial<PdfToImageSettings>) => void;
  setImages: (images: ImageResult[]) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const PdfToImageContext = createContext<PdfToImageContextValue | null>(null);

export function PdfToImageProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [settings, setSettings] = useState<PdfToImageSettings>(DEFAULT_PDF_TO_IMAGE_SETTINGS);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const updateSettings = useCallback((newSettings: Partial<PdfToImageSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setImages([]);
    setError(null);
    setProgress(0);
  }, []);

  const value: PdfToImageContextValue = {
    file,
    settings,
    images,
    isProcessing,
    progress,
    error,
    setFile,
    updateSettings,
    setImages,
    setIsProcessing,
    setProgress,
    setError,
    reset,
  };

  return (
    <PdfToImageContext.Provider value={value}>
      {children}
    </PdfToImageContext.Provider>
  );
}

export function usePdfToImageContext(): PdfToImageContextValue {
  const context = useContext(PdfToImageContext);
  if (!context) {
    throw new Error("usePdfToImageContext must be used within PdfToImageProvider");
  }
  return context;
}
