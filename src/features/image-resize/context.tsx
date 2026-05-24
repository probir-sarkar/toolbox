import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { ImageFile, ResizeSettings } from "./types";
import { DEFAULT_RESIZE_SETTINGS } from "./constants";
import { createImageFile, revokeImageFilePreview } from "./services/image-resize";
import { useProcessingState } from "@/shared/hooks";

interface ImageResizeContextValue {
  files: ImageFile[];
  settings: ResizeSettings;
  isResizing: boolean;
  error: string | null;
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateSettings: (settings: Partial<ResizeSettings>) => void;
  setIsResizing: (isResizing: boolean) => void;
  setError: (error: string | null) => void;
}

const ImageResizeContext = createContext<ImageResizeContextValue | null>(null);

export function ImageResizeProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ResizeSettings>(DEFAULT_RESIZE_SETTINGS);
  const processingState = useProcessingState();

  const addFiles = useCallback(async (newFiles: File[]) => {
    const processedFiles: ImageFile[] = [];

    for (const file of newFiles) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const imageFile = await createImageFile(file);
        processedFiles.push(imageFile);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
      }
    }

    setFiles((prev) => [...prev, ...processedFiles]);
    processingState.setError(null);
  }, [processingState]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        revokeImageFilePreview(file);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach((f) => revokeImageFilePreview(f));
    setFiles([]);
  }, [files]);

  const updateSettings = useCallback((newSettings: Partial<ResizeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const setError = useCallback((error: string | null) => {
    processingState.setError(error);
  }, [processingState]);

  const value: ImageResizeContextValue = {
    files,
    settings,
    isResizing: processingState.isProcessing,
    error: processingState.error,
    addFiles,
    removeFile,
    clearFiles,
    updateSettings,
    setIsResizing: processingState.setIsProcessing,
    setError,
  };

  return (
    <ImageResizeContext.Provider value={value}>
      {children}
    </ImageResizeContext.Provider>
  );
}

export function useImageResizeContext(): ImageResizeContextValue {
  const context = useContext(ImageResizeContext);
  if (!context) {
    throw new Error("useImageResizeContext must be used within ImageResizeProvider");
  }
  return context;
}
