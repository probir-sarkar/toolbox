export type ImageFormat = "jpeg" | "png" | "webp";

export interface ConvertOptions {
  quality?: number; // 0–1 (jpeg/webp)
}

export class ImageConverter {
  private bitmap: ImageBitmap | null;

  private constructor(bitmap: ImageBitmap) {
    this.bitmap = bitmap;
  }

  static async fromBlob(blob: Blob): Promise<ImageConverter> {
    const bitmap = await createImageBitmap(blob);
    return new ImageConverter(bitmap);
  }

  async convert(format: ImageFormat, options?: ConvertOptions): Promise<Uint8Array> {
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

    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), mime, options?.quality));

    return new Uint8Array(await blob.arrayBuffer());
  }

  destroy(): void {
    this.bitmap?.close();
    this.bitmap = null;
  }
}
