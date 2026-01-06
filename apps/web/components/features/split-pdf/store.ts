import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type SplitMode = "extract" | "split-all";

interface SplitPdfState {
  file: File | null;
  pageCount: number;
  fileName: string;
  fileSize: number;
  splitMode: SplitMode;
  pageRange: string; // e.g. "1-5, 8, 11-13"
  isProcessing: boolean;
  error: string | null;

  setFile: (file: File | null, pageCount: number) => void;
  setSplitMode: (mode: SplitMode) => void;
  setPageRange: (range: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useSplitPdfStore = create<SplitPdfState>()(
  immer((set) => ({
    file: null,
    pageCount: 0,
    fileName: "",
    fileSize: 0,
    splitMode: "extract",
    pageRange: "",
    isProcessing: false,
    error: null,

    setFile: (file, pageCount) =>
      set((state) => {
        state.file = file;
        state.pageCount = pageCount;
        if (file) {
          state.fileName = file.name;
          state.fileSize = file.size;
          // Default range: all pages? or empty?
          // Let's default to empty so user has to choose.
          state.pageRange = `1-${pageCount}`;
        } else {
          state.fileName = "";
          state.fileSize = 0;
          state.pageRange = "";
        }
        state.error = null;
      }),

    setSplitMode: (mode) =>
      set((state) => {
        state.splitMode = mode;
      }),

    setPageRange: (range) =>
      set((state) => {
        state.pageRange = range;
      }),

    setIsProcessing: (isProcessing) =>
      set((state) => {
        state.isProcessing = isProcessing;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    reset: () =>
      set((state) => {
        state.file = null;
        state.pageCount = 0;
        state.fileName = "";
        state.fileSize = 0;
        state.pageRange = "";
        state.isProcessing = false;
        state.error = null;
      })
  }))
);
