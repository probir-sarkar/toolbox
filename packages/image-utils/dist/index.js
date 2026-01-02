// src/photon-image-converter.ts
import { PhotonImage } from "@silvia-odwyer/photon";
var PhotonImageConverter = class _PhotonImageConverter {
  constructor(image) {
    this.image = image;
  }
  static fromBlob(blob) {
    return new _PhotonImageConverter(PhotonImage.new_from_blob(blob));
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
  convertToFormat(format, options) {
    switch (format) {
      case "jpeg":
        return this.image.get_bytes_jpeg(options?.quality || 0.92);
      case "png":
        return this.image.get_bytes();
      case "webp":
        return this.image.get_bytes_webp();
    }
  }
};
export {
  PhotonImageConverter
};
//# sourceMappingURL=index.js.map