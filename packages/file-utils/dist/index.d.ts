/**
 * Creates a ZIP file from a record of filenames and contents.
 * @param files Record where key is filename and value is content (Blob, string, etc.)
 * @returns Promise resolving to the ZIP file as a Blob
 */
declare function createZip(files: Record<string, Blob | string | ArrayBuffer | Uint8Array>): Promise<Blob>;
/**
 * Triggers a browser download for a given Blob.
 * @param blob The Blob to download
 * @param filename The filename to save as
 */
declare function downloadBlob(blob: Blob, filename: string): void;

export { createZip, downloadBlob };
