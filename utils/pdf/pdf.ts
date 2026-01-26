"use client";

let workerReady = false;
let pdfjsLibModule: typeof import("pdfjs-dist") | null = null;

async function getPdfjsLib() {
  if (!pdfjsLibModule) {
    pdfjsLibModule = await import("pdfjs-dist");
  }
  return pdfjsLibModule;
}

async function initWorkerOnce() {
  if (workerReady) return;
  workerReady = true;

  const pdfjsLib = await getPdfjsLib();
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
}

export async function getPdfjsLibWithWorker() {
  await initWorkerOnce();
  return getPdfjsLib();
}
