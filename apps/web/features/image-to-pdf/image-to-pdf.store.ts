import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

export type PdfPageSize = "a4" | "letter" | "original";
export type PdfOrientation = "portrait" | "landscape" | "auto";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

interface ImageToPdfState {
  images: ImageItem[];
  settings: {
    filename: string;
    pageSize: PdfPageSize;
    orientation: PdfOrientation;
    margin: number; // in mm
  };
  isGenerating: boolean;

  // Actions
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  reorderImages: (activeId: string, overId: string) => void;
  updateSettings: (settings: Partial<ImageToPdfState["settings"]>) => void;
  setGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

export const useImageToPdfStore = create<ImageToPdfState>((set, get) => ({
  images: [],
  settings: {
    filename: "document",
    pageSize: "a4",
    orientation: "auto",
    margin: 0
  },
  isGenerating: false,

  addImages: async (files) => {
    const newImages: ImageItem[] = [];

    for (const file of files) {
      // Create object URL immediately for preview
      const previewUrl = URL.createObjectURL(file);

      // Get dimensions
      // We need dimensions to handle "original" size or "auto" orientation logic if needed
      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = previewUrl;
      });

      newImages.push({
        id: uuidv4(),
        file,
        previewUrl,
        width: dimensions.width,
        height: dimensions.height
      });
    }

    set((state) => ({ images: [...state.images, ...newImages] }));
  },

  removeImage: (id) => {
    set((state) => {
      const image = state.images.find((i) => i.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return { images: state.images.filter((i) => i.id !== id) };
    });
  },

  reorderImages: (activeId, overId) => {
    set((state) => {
      const oldIndex = state.images.findIndex((i) => i.id === activeId);
      const newIndex = state.images.findIndex((i) => i.id === overId);
      return { images: arrayMove(state.images, oldIndex, newIndex) };
    });
  },

  updateSettings: (newSettings) => {
    set((state) => ({ settings: { ...state.settings, ...newSettings } }));
  },

  setGenerating: (isGenerating) => {
    set({ isGenerating });
  },

  reset: () => {
    const state = get();
    state.images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    set({
      images: [],
      isGenerating: false,
      settings: {
        filename: "document",
        pageSize: "a4",
        orientation: "auto",
        margin: 0
      }
    });
  }
}));
