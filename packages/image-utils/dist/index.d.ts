type ImageFormat = "jpeg" | "png" | "webp";
interface ConvertOptions {
    quality?: number;
}
declare class ImageConverter {
    private bitmap;
    private constructor();
    static fromBlob(blob: Blob): Promise<ImageConverter>;
    convert(format: ImageFormat, options?: ConvertOptions): Promise<Uint8Array>;
    destroy(): void;
}

/**
 * Represents a file to be added to a ZIP archive
 */
interface ZipFileEntry {
    /**
     * The name/path of the file in the archive
     */
    name: string;
    /**
     * The file content as a Blob
     */
    content: Blob;
}
/**
 * Options for creating a ZIP archive
 */
interface ZipOptions {
    /**
     * The name of the ZIP file (without .zip extension)
     * @default "archive"
     */
    filename?: string;
    /**
     * Compression level (0-9)
     * @default 6
     */
    compressionLevel?: number;
    /**
     * Optional progress callback
     */
    onProgress?: (percent: number) => void;
}
/**
 * Creates a ZIP file from an array of file entries
 *
 * @param files - Array of file entries to include in the archive
 * @param options - Optional configuration for the ZIP creation
 * @returns Promise resolving to a Blob containing the ZIP data
 *
 * @example
 * ```ts
 * const files: ZipFileEntry[] = [
 *   { name: "image1.jpg", content: blob1 },
 *   { name: "image2.jpg", content: blob2 }
 * ];
 *
 * const zipBlob = await createZip(files, {
 *   filename: "converted-images",
 *   compressionLevel: 6
 * });
 * ```
 */
declare function createZip(files: ZipFileEntry[], options?: ZipOptions): Promise<Blob>;
/**
 * Triggers a download of a ZIP file in the browser
 *
 * @param zipBlob - The ZIP file blob to download
 * @param filename - The name for the downloaded file (with or without .zip extension)
 *
 * @example
 * ```ts
 * const zipBlob = await createZip(files);
 * downloadZip(zipBlob, "my-files");
 * // Downloads as "my-files.zip"
 * ```
 */
declare function downloadZip(zipBlob: Blob, filename: string): void;
/**
 * Creates and downloads a ZIP file in a single operation
 *
 * @param files - Array of file entries to include in the archive
 * @param options - Optional configuration for the ZIP creation
 * @returns Promise that resolves when the download has been triggered
 *
 * @example
 * ```ts
 * await createAndDownloadZip(files, {
 *   filename: "converted-images"
 * });
 * ```
 */
declare function createAndDownloadZip(files: ZipFileEntry[], options?: ZipOptions): Promise<void>;
/**
 * Converts File objects to ZipFileEntry format
 * Useful when working with file inputs or File objects
 *
 * @param files - Array of File objects
 * @returns Array of ZipFileEntry objects
 *
 * @example
 * ```ts
 * const fileInput = document.querySelector("input[type='file']");
 * const files = Array.from(fileInput.files);
 * const entries = filesToZipEntries(files);
 * await createAndDownloadZip(entries);
 * ```
 */
declare function filesToZipEntries(files: File[]): ZipFileEntry[];
/**
 * Creates a ZIP from File objects directly
 * Convenience function that combines filesToZipEntries and createZip
 *
 * @param files - Array of File objects
 * @param options - Optional configuration for the ZIP creation
 * @returns Promise resolving to a Blob containing the ZIP data
 */
declare function createZipFromFiles(files: File[], options?: ZipOptions): Promise<Blob>;

export { type ConvertOptions, ImageConverter, type ImageFormat, type ZipFileEntry, type ZipOptions, createAndDownloadZip, createZip, createZipFromFiles, downloadZip, filesToZipEntries };
