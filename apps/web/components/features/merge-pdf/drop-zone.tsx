"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMergePdfStore } from "./store";

export function MergePdfDropZone() {
  const addFiles = useMergePdfStore((state) => state.addFiles);
  const setError = useMergePdfStore((state) => state.setError);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }

    if (pdfFiles.length !== files.length) {
      setError("Some files were skipped because they are not PDFs.");
      // We still add the valid ones
    }

    addFiles(pdfFiles);
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
    // Reset input so same files can be selected again if needed (though unlikely for merge)
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
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      <Upload className="w-12 h-12 text-orange-600 mb-4 opacity-70" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Drop PDFs here or click to select</h3>
      <p className="text-sm text-muted-foreground mb-6">Select multiple PDF files to merge</p>
      <Button variant="outline">Select PDFs</Button>
    </div>
  );
}
