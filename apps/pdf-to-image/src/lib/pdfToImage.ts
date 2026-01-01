import JSZip from "jszip";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Setup worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function getBaseName(file: File): string {
  const name = file.name.replace(/\.[^/.]+$/, ""); // remove extension
  return name || "document";
}

export interface PdfToImageOptions {
  format?: "image/png" | "image/jpeg";
  scale?: number; // DPI-like scaling (higher = sharper images)
  startPage?: number; // default = 1
  endPage?: number | null; // default = total pages
  quality?: number; // only for JPEG (0.1 - 1.0)
}

export type ImageResult = {
  page: number;
  blob: Blob;
  filename: string;
  baseName: string;
  width: number;
  height: number;
  url: string;
};

export async function pdfToImagesBrowser(
  file: File,
  options: PdfToImageOptions = {}
): Promise<ImageResult[]> {
  const {
    format = "image/png",
    scale = 2,
    startPage = 1,
    endPage,
    quality = 0.92, // default JPEG quality
  } = options;
  const baseName = getBaseName(file);

  const fileData = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;

  const results: ImageResult[] = [];

  const lastPage = endPage && endPage <= pdf.numPages ? endPage : pdf.numPages;

  for (let pageNum = startPage; pageNum <= lastPage; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    // PNG ignores quality param, JPEG uses it
    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob(
        (b) => resolve(b!),
        format,
        format === "image/jpeg" ? quality : undefined
      )
    );

    // Create an object URL for preview/download
    const url = URL.createObjectURL(blob);

    // Push full ImageResult
    results.push({
      page: pageNum,
      blob,
      filename: `${baseName}-page-${pageNum}.${
        format === "image/png" ? "png" : "jpg"
      }`,
      baseName,
      width: canvas.width,
      height: canvas.height,
      url,
    });
  }

  return results;
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export async function downloadAll(images: ImageResult[]) {
  if (!images.length) return;

  const baseName = images[0].baseName || "document";

  if (images.length === 1) {
    triggerDownload(images[0].blob, images[0].filename);
  } else {
    const zip = new JSZip();
    const folder = zip.folder(baseName) as JSZip;
    images.forEach((img) => folder.file(img.filename, img.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, `${baseName}-images.zip`);
  }
}

export interface FileInfo {
  name: string;
  size: string;
  pages: number;
  file: File;
}
export async function getFileInfo(file: File): Promise<FileInfo> {
  const name = file.name;
  const size = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

  let pages = 0;

  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    pages = pdf.numPages;
  }

  return {
    name,
    size,
    pages,
    file,
  };
}
