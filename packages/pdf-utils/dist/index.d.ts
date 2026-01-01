/**
 * Initialize PDF.js worker with custom worker source.
 * This should be called before using any PDF functions.
 * @param workerSrc - URL to the PDF.js worker file
 */
declare function initPdfWorker(): void;
interface PdfToImageOptions {
    format?: "image/png" | "image/jpeg";
    scale?: number;
    startPage?: number;
    endPage?: number | null;
    quality?: number;
}
type ImageResult = {
    page: number;
    blob: Blob;
    filename: string;
    baseName: string;
    width: number;
    height: number;
    url: string;
};
declare function pdfToImagesBrowser(file: File, options?: PdfToImageOptions): Promise<ImageResult[]>;
declare function triggerDownload(blob: Blob, filename: string): void;
declare function downloadAll(images: ImageResult[]): Promise<void>;
interface FileInfo {
    name: string;
    size: string;
    pages: number;
    file: File;
}
declare function getFileInfo(file: File): Promise<FileInfo>;

export { type FileInfo, type ImageResult, type PdfToImageOptions, downloadAll, getFileInfo, initPdfWorker, pdfToImagesBrowser, triggerDownload };
