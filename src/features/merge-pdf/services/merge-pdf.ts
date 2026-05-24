import type { PdfFile } from "../types";
import { v4 as uuidv4 } from "uuid";

export function createPdfFile(file: File): PdfFile {
  return {
    id: uuidv4(),
    file,
    name: file.name,
    size: file.size,
  };
}

export function isPdfFile(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

export function filterPdfFiles(files: File[]): File[] {
  return files.filter(isPdfFile);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
