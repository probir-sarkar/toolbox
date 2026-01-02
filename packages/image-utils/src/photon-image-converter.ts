// Core Photon types + named exports
import { PhotonImage } from "@silvia-odwyer/photon";

export type ImageFormat = "jpeg" | "png" | "webp";

export class PhotonImageConverter {
  private readonly image: PhotonImage;

  private constructor(image: PhotonImage) {
    this.image = image;
  }

  static fromBlob(blob: Blob) {
    return new PhotonImageConverter(PhotonImage.new_from_blob(blob));
  }

  /**
   * Converts the image to the specified format.
   * If the format is JPEG, the quality can be specified in the options.
   * If no quality is specified, the default quality is 0.92.
   * If the format is PNG or WebP, the quality cannot be specified.
   * @param {ImageFormat} format The format to convert to.
   * @param {{ quality?: number }} options The options for the conversion.
   * @returns {Uint8Array} A promise that resolves with the converted image as a blob.
   */
  convertToFormat(format: ImageFormat, options?: { quality?: number }): Uint8Array {
    switch (format) {
      case "jpeg":
        return this.image.get_bytes_jpeg(options?.quality || 0.92);
      case "png":
        return this.image.get_bytes();
      case "webp":
        return this.image.get_bytes_webp();
    }
  }
}
