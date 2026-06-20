import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { arrayMove, move } from "@dnd-kit/helpers";

export type PdfPageSize = "a4" | "letter" | "original";
export type PdfOrientation = "portrait" | "landscape" | "auto";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

interface ImageToPdfContextValue {
  images: ImageItem[];
  settings: {
    filename: string;
    pageSize: PdfPageSize;
    orientation: PdfOrientation;
    margin: number;
  };
  isGenerating: boolean;
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  reorderImages: (activeId: string, overId: string) => void;
  updateSettings: (settings: Partial<ImageToPdfContextValue["settings"]>) => void;
  setGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

const ImageToPdfContext = createContext<ImageToPdfContextValue | null>(null);

export function ImageToPdfProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState({
    filename: "document",
    pageSize: "a4" as PdfPageSize,
    orientation: "auto" as PdfOrientation,
    margin: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
  }, [images]);

  const addImages = useCallback(async (files: File[]) => {
    const newImages: ImageItem[] = [];

    for (const file of files) {
      const previewUrl = URL.createObjectURL(file);

      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = previewUrl;
      });

      newImages.push({
        id: crypto.randomUUID(),
        file,
        previewUrl,
        width: dimensions.width,
        height: dimensions.height
      });
    }

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((i) => i.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const reorderImages = useCallback((activeId: string, overId: string) => {
    setImages((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === activeId);
      const newIndex = prev.findIndex((i) => i.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<ImageToPdfContextValue["settings"]>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const reset = useCallback(() => {
    images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setImages([]);
    setIsGenerating(false);
    setSettings({
      filename: "document",
      pageSize: "a4",
      orientation: "auto",
      margin: 0
    });
  }, [images]);

  const value = {
    images,
    settings,
    isGenerating,
    addImages,
    removeImage,
    reorderImages,
    updateSettings,
    setGenerating: setIsGenerating,
    reset
  };

  return (
    <ImageToPdfContext.Provider value={value}>
      {children}
    </ImageToPdfContext.Provider>
  );
}

export function useImageToPdfContext(): ImageToPdfContextValue {
  const context = useContext(ImageToPdfContext);
  if (!context) {
    throw new Error("useImageToPdfContext must be used within ImageToPdfProvider");
  }
  return context;
}
