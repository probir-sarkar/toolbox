export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalWidth: number;
  originalHeight: number;
}

export interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  unit: "px" | "%" | "cm" | "in";
  quality: number;
  outputFormat: "original" | "jpeg" | "png" | "webp";
}

export type ResizeUnit = "px" | "%" | "cm" | "in";
export type OutputFormat = "original" | "jpeg" | "png" | "webp";
