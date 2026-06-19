export type SplitMode = "extract" | "split-all";

export interface SplitPdfSettings {
  splitMode: SplitMode;
  outputFileName: string;
}

export interface SplitPdfFile {
  file: File;
  pageCount: number;
  fileName: string;
  fileSize: number;
}
