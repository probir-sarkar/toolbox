export interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export interface MergePdfSettings {
  outputFileName: string;
}
