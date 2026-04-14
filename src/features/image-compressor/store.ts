import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
}

interface CompressionSettings {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  outputFormat: 'original' | 'jpeg' | 'png' | 'webp';
  targetSize?: number; // in KB
}

interface ImageCompressorStore {
  files: ImageFile[];
  settings: CompressionSettings;
  isCompressing: boolean;
  error: string | null;

  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateSettings: (settings: Partial<CompressionSettings>) => void;
  setIsCompressing: (isCompressing: boolean) => void;
  setError: (error: string | null) => void;
  updateCompressedSize: (id: string, size: number) => void;
}

const defaultSettings: CompressionSettings = {
  quality: 0.8,
  outputFormat: 'original',
};

export const useImageCompressorStore = create<ImageCompressorStore>()(
  immer((set) => ({
    files: [],
    settings: defaultSettings,
    isCompressing: false,
    error: null,

    addFiles: (newFiles) =>
      set((state) => {
        newFiles.forEach((file) => {
          if (!file.type.startsWith('image/')) return;

          const preview = URL.createObjectURL(file);
          const imageFile: ImageFile = {
            id: `${file.name}-${file.size}-${Date.now()}`,
            file,
            preview,
            originalSize: file.size,
          };
          state.files.push(imageFile);
        });
      }),

    removeFile: (id) =>
      set((state) => {
        const index = state.files.findIndex((f) => f.id === id);
        if (index !== -1) {
          URL.revokeObjectURL(state.files[index].preview);
          state.files.splice(index, 1);
        }
      }),

    clearFiles: () =>
      set((state) => {
        state.files.forEach((f) => URL.revokeObjectURL(f.preview));
        state.files = [];
      }),

    updateSettings: (newSettings) =>
      set((state) => {
        Object.assign(state.settings, newSettings);
      }),

    setIsCompressing: (isCompressing) =>
      set((state) => {
        state.isCompressing = isCompressing;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    updateCompressedSize: (id, size) =>
      set((state) => {
        const file = state.files.find((f) => f.id === id);
        if (file) {
          file.compressedSize = size;
          file.compressionRatio = ((file.originalSize - size) / file.originalSize) * 100;
        }
      }),
  }))
);