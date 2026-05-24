import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";

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

interface ImageResizeContextValue {
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

const ImageResizeContext = createContext<ImageResizeContextValue | null>(null);

export function ImageResizeProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ResizeSettings>(defaultSettings);
  const [isResizing, setIsResizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const addFiles = useCallback(async (newFiles: File[]) => {
    const processedFiles: ImageFile[] = [];

    for (const file of newFiles) {
      if (!file.type.startsWith('image/')) continue;

      const preview = URL.createObjectURL(file);
      const img = new Image();
      img.src = preview;

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      processedFiles.push({
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        preview,
        originalWidth: img.width,
        originalHeight: img.height,
      });
    }

    setFiles((prev) => [...prev, ...processedFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index !== -1) {
        URL.revokeObjectURL(prev[index].preview);
        return prev.filter((f) => f.id !== id);
      }
      return prev;
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
  }, [files]);

  const updateSettings = useCallback((newSettings: Partial<ResizeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const value = {
    files,
    settings,
    isResizing,
    error,
    addFiles,
    removeFile,
    clearFiles,
    updateSettings,
    setIsResizing,
    setError
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
