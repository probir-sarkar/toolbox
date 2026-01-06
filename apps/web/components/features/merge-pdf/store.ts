import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface MergePdfState {
  files: PdfFile[];
  mergedFileName: string;
  isMerging: boolean;
  error: string | null;

  // Actions
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  setFiles: (files: PdfFile[]) => void; // For reordering
  setMergedFileName: (name: string) => void;
  setIsMerging: (isMerging: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMergePdfStore = create<MergePdfState>()(
  immer((set) => ({
    files: [],
    mergedFileName: "merged-document.pdf",
    isMerging: false,
    error: null,

    addFiles: (newFiles) =>
      set((state) => {
        const uniqueFiles = newFiles.filter(
          (newFile) => !state.files.some((f) => f.name === newFile.name && f.size === newFile.size)
        );

        state.files.push(
          ...uniqueFiles.map((file) => ({
            id: uuidv4(),
            file,
            name: file.name,
            size: file.size
          }))
        );
        state.error = null;
      }),

    removeFile: (id) =>
      set((state) => {
        state.files = state.files.filter((f) => f.id !== id);
      }),

    setFiles: (files) =>
      set((state) => {
        state.files = files;
      }),

    setMergedFileName: (name) =>
      set((state) => {
        state.mergedFileName = name;
      }),

    setIsMerging: (isMerging) =>
      set((state) => {
        state.isMerging = isMerging;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      })
  }))
);
