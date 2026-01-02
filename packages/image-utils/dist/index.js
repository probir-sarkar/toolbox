// src/photon-runtime.ts
function getPhotonRuntime() {
  if (typeof window === "undefined") {
    throw new Error("Photon can only run in the browser");
  }
  if (!window.__PHOTON_RUNTIME__) {
    window.__PHOTON_RUNTIME__ = (async () => {
      const photon = await import("@silvia-odwyer/photon");
      await photon.default();
      return photon;
    })();
  }
  return window.__PHOTON_RUNTIME__;
}

// src/photon-image-converter.ts
var PhotonImageConverter = class _PhotonImageConverter {
  constructor(image) {
    this.destroyed = false;
    this.image = image;
  }
  /* ───────────── FACTORY ───────────── */
  static async fromBlob(blob) {
    if (!blob || blob.size === 0) {
      throw new Error("Invalid or empty blob");
    }
    const photon = await getPhotonRuntime();
    const safeBlob = blob.slice(0, blob.size, blob.type);
    return new _PhotonImageConverter(photon.PhotonImage.new_from_blob(safeBlob));
  }
  /* ───────────── CONVERT ───────────── */
  convertToFormat(format, options) {
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
        const _exhaustive = format;
        return _exhaustive;
      }
    }
  }
  /* ───────────── CLEANUP ───────────── */
  destroy() {
    if (this.destroyed) return;
    this.image.free();
    this.destroyed = true;
  }
};
export {
  PhotonImageConverter
};
//# sourceMappingURL=index.js.map