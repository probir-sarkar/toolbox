import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalWidth: number;
  originalHeight: number;
}

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  unit: 'px' | '%' | 'cm' | 'in';
  quality: number;
  outputFormat: 'original' | 'jpeg' | 'png' | 'webp';
}

interface ImageResizeStore {
  files: ImageFile[];
  settings: ResizeSettings;
  isResizing: boolean;
  error: string | null;

  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateSettings: (settings: Partial<ResizeSettings>) => void;
  setIsResizing: (isResizing: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultSettings: ResizeSettings = {
  width: 1920,
  height: 1080,
  maintainAspectRatio: true,
  unit: 'px',
  quality: 0.9,
  outputFormat: 'original',
};

export const useImageResizeStore = create<ImageResizeStore>()(
  immer((set) => ({
    files: [],
    settings: defaultSettings,
    isResizing: false,
    error: null,

    addFiles: (newFiles) =>
      set((state) => {
        const processFile = async (file: File): Promise<ImageFile | null> => {
          if (!file.type.startsWith('image/')) return null;

          const preview = URL.createObjectURL(file);
          const img = new Image();
          img.src = preview;

          await new Promise((resolve) => {
            img.onload = resolve;
          });

          return {
            id: `${file.name}-${file.size}-${Date.now()}`,
            file,
            preview,
            originalWidth: img.width,
            originalHeight: img.height,
          };
        };

        newFiles.forEach((file) => {
          const processedFile = processFile(file);
          processedFile.then((imageFile) => {
            if (imageFile) {
              set((state) => {
                state.files.push(imageFile);
              });
            }
          });
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

    setIsResizing: (isResizing) =>
      set((state) => {
        state.isResizing = isResizing;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  }))
);