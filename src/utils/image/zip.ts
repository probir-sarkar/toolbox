import JSZip from "jszip";

/**
 * Represents a file to be added to a ZIP archive
 */
export interface ZipFileEntry {
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
export interface ZipOptions {
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
export async function createZip(
  files: ZipFileEntry[],
  options: ZipOptions = {}
): Promise<Blob> {
  const {
    filename = "archive",
    compressionLevel = 6,
    onProgress
  } = options;

  const zip = new JSZip();
  const totalFiles = files.length;

  // Add all files to the ZIP
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    zip.file(file.name, file.content, { compression: "DEFLATE", compressionOptions: { level: compressionLevel } });

    // Report progress (0-50% for adding files, 50-100% for generation)
    onProgress?.(Math.round((i / totalFiles) * 50));
  }

  // Generate the ZIP file
  onProgress?.(50);
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: compressionLevel }
  }, (metadata) => {
    // metadata.percent goes from 0 to 100 during generation
    // We want to map this to 50-100% of total progress
    const totalProgress = 50 + Math.round(metadata.percent / 2);
    onProgress?.(totalProgress);
  });

  onProgress?.(100);
  return zipBlob;
}

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
export function downloadZip(zipBlob: Blob, filename: string): void {
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");

  // Ensure .zip extension
  const finalFilename = filename.endsWith(".zip") ? filename : `${filename}.zip`;

  a.href = url;
  a.download = finalFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
export async function createAndDownloadZip(
  files: ZipFileEntry[],
  options: ZipOptions = {}
): Promise<void> {
  const zipBlob = await createZip(files, options);
  downloadZip(zipBlob, options.filename || "archive");
}

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
export function filesToZipEntries(files: File[]): ZipFileEntry[] {
  return files.map((file) => ({
    name: file.name,
    content: file
  }));
}

/**
 * Creates a ZIP from File objects directly
 * Convenience function that combines filesToZipEntries and createZip
 *
 * @param files - Array of File objects
 * @param options - Optional configuration for the ZIP creation
 * @returns Promise resolving to a Blob containing the ZIP data
 */
export async function createZipFromFiles(
  files: File[],
  options: ZipOptions = {}
): Promise<Blob> {
  const entries = filesToZipEntries(files);
  return createZip(entries, options);
}
