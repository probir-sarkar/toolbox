import type { ConverterFile, ConversionResult, ImageFormat } from "../types";

export function createConverterFile(file: File): ConverterFile {
  return {
    id: crypto.randomUUID(),
    file,
    preview: undefined,
    status: "pending" as const,
    progress: 0,
  };
}

export function calculateSavings(originalSize: number, compressedSize: number): number {
  return originalSize - compressedSize;
}

export function calculateSavingsPercent(originalSize: number, compressedSize: number): string {
  if (originalSize === 0) return "0%";
  const percent = ((originalSize - compressedSize) / originalSize) * 100;
  return `${Math.max(0, percent).toFixed(1)}%`;
}

export function createConversionResult(
  compressedFile: File,
  originalSize: number,
  compressedSize: number
): ConversionResult {
  return {
    compressedFile,
    originalSize,
    compressedSize,
    savings: calculateSavings(originalSize, compressedSize),
    savingsPercent: calculateSavingsPercent(originalSize, compressedSize),
  };
}

export function getMimeType(format: ImageFormat): string {
  switch (format) {
    case "webp":
      return "image/webp";
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "avif":
      return "image/avif";
  }
}
