import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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

export type ImageConverterState = {
  selectedFormat: ImageFormat;
  quality: number;
  autoOptimize: boolean;
  removeMetadata: boolean;
  files: ConverterFile[];
  isProcessing: boolean;
};

type ImageConverterActions = {
  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setAutoOptimize: (enabled: boolean) => void;
  setRemoveMetadata: (enabled: boolean) => void;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateFileStatus: (
    id: string,
    status: FileStatus,
    progress?: number
  ) => void;
  updateFileResult: (id: string, result: ConversionResult) => void;
  setIsProcessing: (processing: boolean) => void;
};

export type ImageConverterStore = ImageConverterState & ImageConverterActions;

export const useImageConverterStore = create<ImageConverterStore>()(
  immer((set) => ({
    selectedFormat: "webp",
    quality: 85,
    autoOptimize: true,
    removeMetadata: true,
    files: [],
    isProcessing: false,
    setFormat: (format) =>
      set((state) => {
        state.selectedFormat = format;
      }),
    setQuality: (quality) =>
      set((state) => {
        state.quality = quality;
      }),
    setAutoOptimize: (enabled) =>
      set((state) => {
        state.autoOptimize = enabled;
      }),
    setRemoveMetadata: (enabled) =>
      set((state) => {
        state.removeMetadata = enabled;
      }),
    addFiles: (files) =>
      set((state) => {
        const newFiles = files.map((file) => ({
          id: crypto.randomUUID(),
          file,
          preview: undefined,
          status: "pending" as FileStatus,
          progress: 0
        }));
        state.files.push(...newFiles);
      }),
    removeFile: (id) =>
      set((state) => {
        state.files = state.files.filter((f) => f.id !== id);
      }),
    clearFiles: () =>
      set((state) => {
        state.files = [];
      }),
    updateFileStatus: (id, status, progress) =>
      set((state) => {
        const file = state.files.find((f) => f.id === id);
        if (file) {
          file.status = status;
          if (progress !== undefined) {
            file.progress = progress;
          }
        }
      }),
    updateFileResult: (id, result) =>
      set((state) => {
        const file = state.files.find((f) => f.id === id);
        if (file) {
          file.result = result;
        }
      }),
    setIsProcessing: (processing) =>
      set((state) => {
        state.isProcessing = processing;
      })
  }))
);
