import type { SplitPdfFile } from "../types";

export async function loadPdfFile(file: File): Promise<SplitPdfFile> {
  const { PDFDocument } = await import("pdf-lib");
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();

  if (pdfDoc.isEncrypted) {
    throw new Error("This PDF is password protected and cannot be processed.");
  }

  if (pageCount === 0) {
    throw new Error("This PDF has no pages.");
  }

  return {
    file,
    pageCount,
    fileName: file.name.replace(/\.pdf$/i, ""),
    fileSize: file.size
  } as SplitPdfFile;
}

export async function extractPages(file: File, pageIndices: number[], outputFileName: string): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save({
    useObjectStreams: true
  });
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

export async function splitAllPages(file: File, pageCount: number, baseName: string): Promise<Record<string, Blob>> {
  const { PDFDocument } = await import("pdf-lib");
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const files: Record<string, Blob> = {};

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save({
      useObjectStreams: true
    });

    files[`${baseName}-page-${i + 1}.pdf`] = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  }

  return files;
}
