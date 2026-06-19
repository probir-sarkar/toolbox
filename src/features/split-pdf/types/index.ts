export type SplitMode = "extract" | "split-all";

export interface SplitPdfSettings {
  splitMode: SplitMode;
}

export interface SplitPdfFile {
  file: File;
  pageCount: number;
  fileName: string;
  fileSize: number;
}
