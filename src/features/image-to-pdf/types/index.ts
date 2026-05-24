export type PdfPageSize = "a4" | "letter" | "original";
export type PdfOrientation = "portrait" | "landscape" | "auto";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export interface ImageToPdfSettings {
  filename: string;
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  margin: number;
}
