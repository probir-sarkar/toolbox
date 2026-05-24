import type { CompressionSettings } from "../types";

export const DEFAULT_COMPRESSION_SETTINGS: CompressionSettings = {
  quality: 0.8,
  outputFormat: 'original',
};

export const OUTPUT_FORMATS = [
  { value: 'original', label: 'Original Format' },
  { value: 'jpeg', label: 'JPEG (Best compression)' },
  { value: 'webp', label: 'WebP (Modern format)' },
  { value: 'png', label: 'PNG (Lossless)' },
] as const;

export const QUALITY_RANGE = { min: 1, max: 100, step: 1 };
