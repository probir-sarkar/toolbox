"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSplitPdfStore } from "./store";
import { PDFDocument } from "pdf-lib";

export function SplitPdfDropZone() {
  const setFile = useSplitPdfStore((state) => state.setFile);
  const setError = useSplitPdfStore((state) => state.setError);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      if (pdfDoc.isEncrypted) {
        // pdf-lib handles some encryption but if it throws or returns 0 pages...
        // Actually load() throws if encrypted and no password.
      }

      setFile(file, pageCount);
    } catch (err) {
      console.error(err);
      setError("Failed to load PDF. It might be password protected or corrupted.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    handleFile(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 px-6 py-12 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input ref={inputRef} type="file" accept="application/pdf" onChange={handleFileInputChange} className="hidden" />

      <Upload className="w-12 h-12 text-orange-600 mb-4 opacity-70" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Drop PDF here or click to select</h3>
      <p className="text-sm text-muted-foreground mb-6">Select a PDF file to split or extract pages from</p>
      <Button variant="outline">Select PDF</Button>
    </div>
  );
}
