import { createContext, useContext, ReactNode, useState, useCallback } from "react";

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

interface ImageCompressorContextValue {
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

const ImageCompressorContext = createContext<ImageCompressorContextValue | null>(null);

export function ImageCompressorProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>(defaultSettings);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    const imageFiles: ImageFile[] = [];

    newFiles.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const preview = URL.createObjectURL(file);
      const imageFile: ImageFile = {
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        preview,
        originalSize: file.size,
      };
      imageFiles.push(imageFile);
    });

    setFiles((prev) => [...prev, ...imageFiles]);
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

  const updateSettings = useCallback((newSettings: Partial<CompressionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const updateCompressedSize = useCallback((id: string, size: number) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              compressedSize: size,
              compressionRatio: ((f.originalSize - size) / f.originalSize) * 100,
            }
          : f
      )
    );
  }, []);

  const value = {
    files,
    settings,
    isCompressing,
    error,
    addFiles,
    removeFile,
    clearFiles,
    updateSettings,
    setIsCompressing,
    setError,
    updateCompressedSize
  };

  return (
    <ImageCompressorContext.Provider value={value}>
      {children}
    </ImageCompressorContext.Provider>
  );
}

export function useImageCompressorContext(): ImageCompressorContextValue {
  const context = useContext(ImageCompressorContext);
  if (!context) {
    throw new Error("useImageCompressorContext must be used within ImageCompressorProvider");
  }
  return context;
}
