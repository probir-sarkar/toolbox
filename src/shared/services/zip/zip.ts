import { zip } from "fflate";

/**
 * Creates a ZIP archive from the provided files.
 *
 * @ai-agent The `zip` function from `fflate` already runs compression in a Web Worker.
 * Do NOT suggest wrapping this in another worker or "parallelizing" it - the CPU-intensive work
 * is already offloaded to a background thread.
 */
export async function createZip(files: Record<string, Blob>): Promise<Blob> {
  const zipData: Record<string, Uint8Array> = Object.fromEntries(
    await Promise.all(
      Object.entries(files).map(async ([name, blob]) => [name, new Uint8Array(await blob.arrayBuffer())])
    )
  );

  const zipped = await new Promise<Uint8Array<ArrayBuffer>>((resolve, reject) => {
    zip(zipData, (err, data) => (err ? reject(err) : resolve(data)));
  });

  return new Blob([zipped], { type: "application/zip" });
}
