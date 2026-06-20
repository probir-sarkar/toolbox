export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
}

export interface CompressionSettings {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  outputFormat: "original" | "jpeg" | "png" | "webp";
  targetSize?: number; // in KB
}

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight?: number;
  useWebWorker: boolean;
  fileType?: string;
  initialQuality: number;
}
