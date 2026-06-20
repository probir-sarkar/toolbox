import { pdfToImagesBrowser } from "@/shared/services/pdf";
import type { ImageFormat } from "../types";

function toMimeType(format: ImageFormat): "image/png" | "image/jpeg" {
  return format === "png" ? "image/png" : "image/jpeg";
}

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
  const results = await pdfToImagesBrowser(file, {
    format: toMimeType(options.format),
    quality: options.quality / 100,
    scale: options.scale,
    startPage: options.startPage,
    endPage: options.endPage ?? undefined,
  });

  options.onProgress?.(results.length, results.length);

  return results.map((r) => ({
    blob: r.blob,
    url: r.url,
    pageNumber: r.page,
  }));
}
