import type { ResizeSettings, ResizeUnit, OutputFormat } from "../types";

export const DEFAULT_RESIZE_SETTINGS: ResizeSettings = {
  width: 1920,
  height: 1080,
  maintainAspectRatio: true,
  unit: 'px',
  quality: 0.9,
  outputFormat: 'original',
};

export const RESIZE_UNITS: { value: ResizeUnit; label: string }[] = [
  { value: 'px', label: 'Pixels (px)' },
  { value: '%', label: 'Percentage (%)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'in', label: 'Inches (in)' },
];

export const OUTPUT_FORMATS: { value: OutputFormat; label: string }[] = [
  { value: 'original', label: 'Original Format' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WebP' },
];

export const COMMON_DIMENSIONS = [
  { label: '1920×1080 (Full HD)', width: 1920, height: 1080 },
  { label: '1280×720 (HD)', width: 1280, height: 720 },
  { label: '3840×2160 (4K)', width: 3840, height: 2160 },
  { label: '1080×1080 (Instagram)', width: 1080, height: 1080 },
  { label: '800×600 (SVGA)', width: 800, height: 600 },
];
