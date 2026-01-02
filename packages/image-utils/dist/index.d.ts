type ImageFormat = "jpeg" | "png" | "webp";
declare class PhotonImageConverter {
    private readonly image;
    private constructor();
    static fromBlob(blob: Blob): PhotonImageConverter;
    /**
     * Converts the image to the specified format.
     * If the format is JPEG, the quality can be specified in the options.
     * If no quality is specified, the default quality is 0.92.
     * If the format is PNG or WebP, the quality cannot be specified.
     * @param {ImageFormat} format The format to convert to.
     * @param {{ quality?: number }} options The options for the conversion.
     * @returns {Uint8Array} A promise that resolves with the converted image as a blob.
     */
    convertToFormat(format: ImageFormat, options?: {
        quality?: number;
    }): Uint8Array;
}

export { type ImageFormat, PhotonImageConverter };
