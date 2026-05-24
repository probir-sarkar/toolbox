import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { type FileInfo, type ImageResult } from "@/utils/pdf";

interface PdfToImageContextValue {
  file: FileInfo | null;
  format: "png" | "jpeg";
  quality: number;
  scale: number;
  startPage: number;
  endPage: number | null;
  images: ImageResult[];
  isConverting: boolean;
  progress: number;
  error: string | null;
  setFile: (file: FileInfo | null) => void;
  setFormat: (format: "png" | "jpeg") => void;
  setQuality: (quality: number) => void;
  setScale: (scale: number) => void;
  setStartPage: (page: number) => void;
  setEndPage: (page: number | null) => void;
  setImages: (images: ImageResult[]) => void;
  setIsConverting: (isConverting: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const PdfToImageContext = createContext<PdfToImageContextValue | null>(null);

export function PdfToImageProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [quality, setQuality] = useState(92);
  const [scale, setScale] = useState(2.0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState<number | null>(null);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setImages([]);
    setError(null);
    setStartPage(1);
    setEndPage(null);
    setProgress(0);
  }, []);

  const value = {
    file,
    format,
    quality,
    scale,
    startPage,
    endPage,
    images,
    isConverting,
    progress,
    error,
    setFile,
    setFormat,
    setQuality,
    setScale,
    setStartPage,
    setEndPage,
    setImages,
    setIsConverting,
    setProgress,
    setError,
    reset
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
