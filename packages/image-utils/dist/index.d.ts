type ImageFormat = "jpeg" | "png" | "webp";
interface ConvertOptions {
    quality?: number;
}
declare class PhotonImageConverter {
    private readonly image;
    private destroyed;
    private constructor();
    static fromBlob(blob: Blob): Promise<PhotonImageConverter>;
    convertToFormat(format: ImageFormat, options?: ConvertOptions): Uint8Array;
    destroy(): void;
}

export { type ConvertOptions, type ImageFormat, PhotonImageConverter };
