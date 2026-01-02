import type { PhotonImage } from "@silvia-odwyer/photon";
import { getPhotonRuntime } from "./photon-runtime";

export type ImageFormat = "jpeg" | "png" | "webp";

export interface ConvertOptions {
  quality?: number; // 1–100 (JPEG only)
}

export class PhotonImageConverter {
  private readonly image: PhotonImage;
  private destroyed = false;

  private constructor(image: PhotonImage) {
    this.image = image;
  }

  /* ───────────── FACTORY ───────────── */

  static async fromBlob(blob: Blob): Promise<PhotonImageConverter> {
    if (!blob || blob.size === 0) {
      throw new Error("Invalid or empty blob");
    }

    const photon = await getPhotonRuntime();

    // 🔑 Clone blob to avoid WASM panic
    const safeBlob = blob.slice(0, blob.size, blob.type);

    return new PhotonImageConverter(photon.PhotonImage.new_from_blob(safeBlob));
  }

  /* ───────────── CONVERT ───────────── */

  convertToFormat(format: ImageFormat, options?: ConvertOptions): Uint8Array {
    if (this.destroyed) {
      throw new Error("Converter already destroyed");
    }

    switch (format) {
      case "jpeg": {
        const quality = options?.quality ?? 100;

        return this.image.get_bytes_jpeg(50);
      }

      case "png":
        return this.image.get_bytes();

      case "webp":
        return this.image.get_bytes_webp();

      default: {
        // Exhaustive safety (future-proof)
        const _exhaustive: never = format;
        return _exhaustive;
      }
    }
  }

  /* ───────────── CLEANUP ───────────── */

  destroy(): void {
    if (this.destroyed) return;
    this.image.free();
    this.destroyed = true;
  }
}
