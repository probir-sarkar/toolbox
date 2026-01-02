import imageCompression from "browser-image-compression";
import { filesToZipEntries, createAndDownloadZip, type ZipOptions } from "@toolbox/image-utils";

export interface ConversionOptions {
  format: "webp" | "jpg" | "png" | "avif";
  quality: number;
  autoOptimize: boolean;
  removeMetadata: boolean;
}

export interface ConversionResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  savings: number;
  savingsPercent: string;
}

/**
 * Converts an image file using browser-image-compression
 */
export async function convertImage(
  file: File,
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  const originalSize = file.size;

  // Map format to MIME type
  const formatToMimeType: Record<string, string> = {
    webp: "image/webp",
    jpg: "image/jpeg",
    png: "image/png",
    avif: "image/avif"
  };

  // Check if AVIF is supported
  const supportsAvif = async (): Promise<boolean> => {
    if (typeof document === "undefined") return false;
    const avif = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    const img = new Image();
    img.src = avif;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Determine output MIME type
  let outputType = formatToMimeType[options.format];

  // Fallback for AVIF if not supported
  if (options.format === "avif") {
    const avifSupported = await supportsAvif();
    if (!avifSupported) {
      outputType = formatToMimeType.webp;
    }
  }

  // Configure compression options
  const compressionOptions = {
    maxSizeMB: 10, // Maximum file size in MB
    maxWidthOrHeight: 4096, // Maximum dimensions
    useWebWorker: true,
    fileType: outputType,
    initialQuality: options.quality / 100,
    alwaysKeepResolution: true,
    preserveExif: !options.removeMetadata
  };

  try {
    onProgress?.(10);

    // Compress the image
    const compressedFile = await imageCompression(file, compressionOptions);

    onProgress?.(90);

    const compressedSize = compressedFile.size;
    const savings = originalSize - compressedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    onProgress?.(100);

    return {
      originalFile: file,
      compressedFile,
      originalSize,
      compressedSize,
      savings,
      savingsPercent: savings > 0 ? `-${savingsPercent}%` : `+${Math.abs(parseFloat(savingsPercent)).toFixed(1)}%`
    };
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
}

/**
 * Converts multiple images in parallel
 */
export async function convertImages(
  files: File[],
  options: ConversionOptions,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<ConversionResult[]> {
  const results: ConversionResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const result = await convertImage(files[i], options, (progress) => {
      onProgress?.(i, progress);
    });
    results.push(result);
  }

  return results;
}

/**
 * Triggers a download for a converted file
 */
export function downloadFile(file: File, originalName: string): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name || `converted-${originalName}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Triggers downloads for multiple converted files
 */
export function downloadFiles(results: ConversionResult[]): void {
  results.forEach((result) => {
    downloadFile(result.compressedFile, result.originalFile.name);
  });
}

/**
 * Creates a ZIP file with all converted images and triggers download
 */
export async function createZipArchive(
  results: ConversionResult[],
  options?: ZipOptions
): Promise<void> {
  const files = results.map((r) => r.compressedFile);
  await createAndDownloadZip(filesToZipEntries(files), {
    filename: "converted-images",
    ...options
  });
}
