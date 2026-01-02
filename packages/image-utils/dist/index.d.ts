type ImageFormat = "jpeg" | "png" | "webp";
interface ConvertOptions {
    quality?: number;
}
declare class ImageConverter {
    private bitmap;
    private constructor();
    static fromBlob(blob: Blob): Promise<ImageConverter>;
    convert(format: ImageFormat, options?: ConvertOptions): Promise<Uint8Array>;
    destroy(): void;
}

export { type ConvertOptions, ImageConverter, type ImageFormat };
