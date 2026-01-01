// src/index.ts
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
var workerInitialized = false;
function initPdfWorker(workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  workerInitialized = true;
}
function getBaseName(file) {
  const name = file.name.replace(/\.[^/.]+$/, "");
  return name || "document";
}
async function pdfToImagesBrowser(file, options = {}) {
  const {
    format = "image/png",
    scale = 2,
    startPage = 1,
    endPage,
    quality = 0.92
    // default JPEG quality
  } = options;
  const baseName = getBaseName(file);
  const fileData = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;
  const results = [];
  const lastPage = endPage && endPage <= pdf.numPages ? endPage : pdf.numPages;
  for (let pageNum = startPage; pageNum <= lastPage; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    const blob = await new Promise(
      (resolve) => canvas.toBlob(
        (b) => resolve(b),
        format,
        format === "image/jpeg" ? quality : void 0
      )
    );
    const url = URL.createObjectURL(blob);
    results.push({
      page: pageNum,
      blob,
      filename: `${baseName}-page-${pageNum}.${format === "image/png" ? "png" : "jpg"}`,
      baseName,
      width: canvas.width,
      height: canvas.height,
      url
    });
  }
  return results;
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
async function downloadAll(images) {
  if (!images.length) return;
  const baseName = images[0].baseName || "document";
  if (images.length === 1) {
    triggerDownload(images[0].blob, images[0].filename);
  } else {
    const zip = new JSZip();
    const folder = zip.folder(baseName);
    images.forEach((img) => folder.file(img.filename, img.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, `${baseName}-images.zip`);
  }
}
async function getFileInfo(file) {
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
    file
  };
}
export {
  downloadAll,
  getFileInfo,
  initPdfWorker,
  pdfToImagesBrowser,
  triggerDownload
};
//# sourceMappingURL=index.js.map