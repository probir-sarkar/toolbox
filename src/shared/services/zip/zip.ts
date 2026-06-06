import { zip } from "fflate";

export async function createZip(files: Record<string, Blob>): Promise<Blob> {
  const zipData: Record<string, Uint8Array> = {};

  // 1. Read all blobs concurrently using Promise.all
  await Promise.all(
    Object.entries(files).map(async ([filename, blob]) => {
      zipData[filename] = new Uint8Array(await blob.arrayBuffer());
    })
  );

  const zipped = await new Promise<Uint8Array<ArrayBuffer>>((resolve, reject) => {
    zip(zipData, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
  return new Blob([zipped], { type: "application/zip" });
}
