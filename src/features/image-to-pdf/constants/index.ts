import type { ImageToPdfSettings, PdfPageSize, PdfOrientation } from "../types";

export const PAGE_SIZES: { value: PdfPageSize; label: string }[] = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter" },
  { value: "original", label: "Original Size" }
] as const;

export const ORIENTATIONS: { value: PdfOrientation; label: string }[] = [
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
  { value: "auto", label: "Auto" }
] as const;

export const DEFAULT_IMAGE_TO_PDF_SETTINGS: ImageToPdfSettings = {
  filename: "document",
  pageSize: "a4",
  orientation: "auto",
  margin: 0
} as const;

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
