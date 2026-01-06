import JSZip from "jszip";

/**
 * Creates a ZIP file from a record of filenames and contents.
 * @param files Record where key is filename and value is content (Blob, string, etc.)
 * @returns Promise resolving to the ZIP file as a Blob
 */
export async function createZip(files: Record<string, Blob | string | ArrayBuffer | Uint8Array>): Promise<Blob> {
  const zip = new JSZip();

  Object.entries(files).forEach(([filename, content]) => {
    zip.file(filename, content);
  });

  return await zip.generateAsync({ type: "blob" });
}

/**
 * Triggers a browser download for a given Blob.
 * @param blob The Blob to download
 * @param filename The filename to save as
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
