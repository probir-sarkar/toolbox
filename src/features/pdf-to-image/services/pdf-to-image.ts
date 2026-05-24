import { convertPdfToImages } from "@/shared/services/pdf";
import type { ImageFormat } from "../types";

export interface ConvertOptions {
  format: ImageFormat;
  quality: number;
  scale: number;
  startPage: number;
  endPage: number | null;
  onProgress?: (current: number, total: number) => void;
}

export async function convertPdf(
  file: File,
  options: ConvertOptions
): Promise<{ blob: Blob; url: string; pageNumber: number }[]> {
  return convertPdfToImages(file, {
    format: options.format,
    quality: options.quality / 100,
    scale: options.scale,
    startPage: options.startPage,
    endPage: options.endPage ?? undefined,
    onProgress: options.onProgress
  });
}
