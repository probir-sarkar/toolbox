"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getFileInfo } from "@/utils/pdf";
import { usePdfToImageStore } from "./store";

export function PdfDropZone() {
  const setFile = usePdfToImageStore((state) => state.setFile);
  const setError = usePdfToImageStore((state) => state.setError);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      const info = await getFileInfo(file);
      setFile(info);
      setError(null);
    } catch (err) {
      setError("Failed to load PDF file.");
      console.error(err);
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
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    handleFiles(Array.from(e.target.files));
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
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <Upload className="w-12 h-12 text-red-600 mb-4 opacity-70" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Drop PDF here or click to select
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Supports standard PDF documents
      </p>
      <Button variant="outline">Select PDF</Button>
    </div>
  );
}
