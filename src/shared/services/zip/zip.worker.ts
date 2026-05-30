import JSZip from "jszip";
import { expose } from "comlink";

export async function createZip(files: Record<string, Blob | string | ArrayBuffer | Uint8Array>): Promise<Blob> {
  const zip = new JSZip();

  Object.entries(files).forEach(([filename, content]) => {
    zip.file(filename, content);
  });

  return zip.generateAsync({ type: "blob" });
}

expose({ createZip });

export type ZipWorkerApi = {
  createZip: typeof createZip;
};
