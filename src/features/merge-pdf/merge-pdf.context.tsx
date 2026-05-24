import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface MergePdfContextValue {
  files: PdfFile[];
  mergedFileName: string;
  isMerging: boolean;
  error: string | null;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  setFiles: (files: PdfFile[]) => void;
  setMergedFileName: (name: string) => void;
  setIsMerging: (isMerging: boolean) => void;
  setError: (error: string | null) => void;
}

const MergePdfContext = createContext<MergePdfContextValue | null>(null);

export function MergePdfProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [mergedFileName, setMergedFileName] = useState("merged-document.pdf");
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const uniqueFiles = newFiles.filter(
        (newFile) => !prev.some((f) => f.name === newFile.name && f.size === newFile.size)
      );

      return [
        ...prev,
        ...uniqueFiles.map((file) => ({
          id: uuidv4(),
          file,
          name: file.name,
          size: file.size
        }))
      ];
    });
    setError(null);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const setFilesHandler = useCallback((files: PdfFile[]) => {
    setFiles(files);
  }, []);

  const value = {
    files,
    mergedFileName,
    isMerging,
    error,
    addFiles,
    removeFile,
    setFiles: setFilesHandler,
    setMergedFileName,
    setIsMerging,
    setError
  };

  return (
    <MergePdfContext.Provider value={value}>
      {children}
    </MergePdfContext.Provider>
  );
}

export function useMergePdfContext(): MergePdfContextValue {
  const context = useContext(MergePdfContext);
  if (!context) {
    throw new Error("useMergePdfContext must be used within MergePdfProvider");
  }
  return context;
}
