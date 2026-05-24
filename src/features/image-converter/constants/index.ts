import type { ImageConverterSettings } from "../types";

export const DEFAULT_IMAGE_CONVERTER_SETTINGS: ImageConverterSettings = {
  selectedFormat: "webp",
  quality: 85,
  autoOptimize: true,
  removeMetadata: true,
} as const;

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
