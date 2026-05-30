/**
 * Download Service
 *
 * Provides utilities for triggering browser downloads of various content types.
 */

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

/**
 * Triggers a browser download for a given Blob.
 * Variant with delayed URL cleanup.
 * @param blob The Blob to download
 * @param filename The filename to save as
 */
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
