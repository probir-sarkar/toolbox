import { type FileInfo, type ImageResult } from "@/shared/services/pdf";

export type { FileInfo, ImageResult };

export type ImageFormat = "png" | "jpeg";

export interface PdfToImageSettings {
  format: ImageFormat;
  quality: number;
  scale: number;
  startPage: number;
  endPage: number | null;
}
