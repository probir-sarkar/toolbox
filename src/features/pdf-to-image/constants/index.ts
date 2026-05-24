import type { PdfToImageSettings } from "../types";

export const IMAGE_FORMATS = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" }
] as const;

export const DEFAULT_PDF_TO_IMAGE_SETTINGS: PdfToImageSettings = {
  format: "png",
  quality: 92,
  scale: 2.0,
  startPage: 1,
  endPage: null
} as const;

export const ACCEPTED_FILE_TYPES = ["application/pdf"] as const;
