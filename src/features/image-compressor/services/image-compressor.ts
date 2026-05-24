import type { ImageFile, CompressionOptions } from "../types";

export interface CompressResult {
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<CompressResult> {
  // Dynamic import for browser-image-compression
  const imageCompression = await import('browser-image-compression');

  const compressedFile = await imageCompression.default(file, options);

  return {
    compressedFile,
    originalSize: file.size,
    compressedSize: compressedFile.size,
    compressionRatio: ((file.size - compressedFile.size) / file.size) * 100,
  };
}

export function createImageFile(file: File): ImageFile {
  const preview = URL.createObjectURL(file);
  return {
    id: `${file.name}-${file.size}-${Date.now()}`,
    file,
    preview,
    originalSize: file.size,
  };
}

export function revokeImageFilePreview(file: ImageFile): void {
  URL.revokeObjectURL(file.preview);
}

export function getCompressionOptions(
  settings: { quality: number; maxWidth?: number; maxHeight?: number; outputFormat: string; targetSize?: number },
  file: File
): CompressionOptions {
  return {
    maxSizeMB: settings.targetSize ? settings.targetSize / 1024 : 10,
    maxWidthOrHeight: settings.maxWidth || settings.maxHeight || undefined,
    useWebWorker: true,
    fileType: settings.outputFormat === 'original' ? file.type : `image/${settings.outputFormat}`,
    initialQuality: settings.quality,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
