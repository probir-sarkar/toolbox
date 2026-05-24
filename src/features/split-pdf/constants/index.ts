import type { SplitPdfSettings } from "../types";

export const DEFAULT_SPLIT_PDF_SETTINGS: SplitPdfSettings = {
  splitMode: "extract",
  pageRange: "",
  outputFileName: "split-document",
};

export const ACCEPTED_FILE_TYPES = ["application/pdf"];
