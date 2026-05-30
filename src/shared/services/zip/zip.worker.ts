import JSZip from "jszip";
import { expose } from "comlink";

export async function createZipWorker(files: Record<string, Blob>): Promise<Blob> {
  const zip = new JSZip();

  Object.entries(files).forEach(([filename, content]) => {
    zip.file(filename, content);
  });

  return zip.generateAsync({ type: "blob" });
}

expose({ createZipWorker });

export type ZipWorkerApi = {
  createZipWorker: typeof createZipWorker;
};
