import { create } from "zustand";
import { type FileInfo, type ImageResult } from "@toolbox/pdf-utils";

interface PdfToImageState {
  // Files
  file: FileInfo | null;
  setFile: (file: FileInfo | null) => void;

  // Settings
  format: "png" | "jpeg";
  setFormat: (format: "png" | "jpeg") => void;
  quality: number;
  setQuality: (quality: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  startPage: number;
  setStartPage: (page: number) => void;
  endPage: number | null;
  setEndPage: (page: number | null) => void;

  // Processing
  images: ImageResult[];
  setImages: (images: ImageResult[]) => void;
  isConverting: boolean;
  setIsConverting: (isConverting: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Actions
  reset: () => void;
}

export const usePdfToImageStore = create<PdfToImageState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),

  format: "png",
  setFormat: (format) => set({ format }),
  quality: 92,
  setQuality: (quality) => set({ quality }),
  scale: 2.0,
  setScale: (scale) => set({ scale }),
  startPage: 1,
  setStartPage: (startPage) => set({ startPage }),
  endPage: null,
  setEndPage: (endPage) => set({ endPage }),

  images: [],
  setImages: (images) => set({ images }),
  isConverting: false,
  setIsConverting: (isConverting) => set({ isConverting }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
  error: null,
  setError: (error) => set({ error }),

  reset: () =>
    set({
      file: null,
      images: [],
      error: null,
      startPage: 1,
      endPage: null,
      progress: 0,
    }),
}));
