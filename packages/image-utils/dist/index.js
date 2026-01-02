// src/image-converter.ts
var ImageConverter = class _ImageConverter {
  constructor(bitmap) {
    this.bitmap = bitmap;
  }
  static async fromBlob(blob) {
    const bitmap = await createImageBitmap(blob);
    return new _ImageConverter(bitmap);
  }
  async convert(format, options) {
    if (!this.bitmap) {
      throw new Error("ImageConverter already destroyed");
    }
    const canvas = document.createElement("canvas");
    canvas.width = this.bitmap.width;
    canvas.height = this.bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(this.bitmap, 0, 0);
    const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
    const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), mime, options?.quality));
    return new Uint8Array(await blob.arrayBuffer());
  }
  destroy() {
    this.bitmap?.close();
    this.bitmap = null;
  }
};

// src/zip.ts
import JSZip from "jszip";
async function createZip(files, options = {}) {
  const {
    filename = "archive",
    compressionLevel = 6,
    onProgress
  } = options;
  const zip = new JSZip();
  const totalFiles = files.length;
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    zip.file(file.name, file.content, { compression: "DEFLATE", compressionOptions: { level: compressionLevel } });
    onProgress?.(Math.round(i / totalFiles * 50));
  }
  onProgress?.(50);
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: compressionLevel }
  }, (metadata) => {
    const totalProgress = 50 + Math.round(metadata.percent / 2);
    onProgress?.(totalProgress);
  });
  onProgress?.(100);
  return zipBlob;
}
function downloadZip(zipBlob, filename) {
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  const finalFilename = filename.endsWith(".zip") ? filename : `${filename}.zip`;
  a.href = url;
  a.download = finalFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
async function createAndDownloadZip(files, options = {}) {
  const zipBlob = await createZip(files, options);
  downloadZip(zipBlob, options.filename || "archive");
}
function filesToZipEntries(files) {
  return files.map((file) => ({
    name: file.name,
    content: file
  }));
}
async function createZipFromFiles(files, options = {}) {
  const entries = filesToZipEntries(files);
  return createZip(entries, options);
}
export {
  ImageConverter,
  createAndDownloadZip,
  createZip,
  createZipFromFiles,
  downloadZip,
  filesToZipEntries
};
//# sourceMappingURL=index.js.map