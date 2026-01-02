import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const FORMATS = [
  { value: "webp", label: "WebP", desc: "Best compression & quality" },
  { value: "jpg", label: "JPEG", desc: "Universal format" },
  { value: "png", label: "PNG", desc: "Lossless format" },
  { value: "avif", label: "AVIF", desc: "Next-gen format" }
] as const;

export type ImageFormat = (typeof FORMATS)[number]["value"];

export type ImageConverterState = {
  selectedFormat: ImageFormat;
  quality: number;
  autoOptimize: boolean;
  removeMetadata: boolean;
};

type ImageConverterActions = {
  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setAutoOptimize: (enabled: boolean) => void;
  setRemoveMetadata: (enabled: boolean) => void;
};

export type ImageConverterStore = ImageConverterState & ImageConverterActions;

export const useImageConverterStore = create<ImageConverterStore>()(
  immer((set) => ({
    selectedFormat: "webp",
    quality: 85,
    autoOptimize: true,
    removeMetadata: true,
    setFormat: (format) =>
      set((state) => {
        state.selectedFormat = format;
      }),
    setQuality: (quality) =>
      set((state) => {
        state.quality = quality;
      }),
    setAutoOptimize: (enabled) =>
      set((state) => {
        state.autoOptimize = enabled;
      }),
    setRemoveMetadata: (enabled) =>
      set((state) => {
        state.removeMetadata = enabled;
      })
  }))
);
