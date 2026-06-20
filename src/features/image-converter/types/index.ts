export const FORMATS = [
  { value: "webp", label: "WebP", desc: "Best compression & quality" },
  { value: "jpg", label: "JPEG", desc: "Universal format" },
  { value: "png", label: "PNG", desc: "Lossless format" },
  { value: "avif", label: "AVIF", desc: "Next-gen format" },
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

export interface ImageConverterSettings {
  selectedFormat: ImageFormat;
  quality: number;
  autoOptimize: boolean;
  removeMetadata: boolean;
}
