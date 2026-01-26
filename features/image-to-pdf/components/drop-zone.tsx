"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useImageToPdfStore } from "../image-to-pdf.store";

export function DropZone() {
  const addImages = useImageToPdfStore((state) => state.addImages);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      await addImages(imageFiles);
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
      <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleFileInputChange} className="hidden" />

      <Upload className="w-12 h-12 text-primary mb-4 opacity-70 group-hover:scale-110 transition-transform" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Drop images here or click to select</h3>
      <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG, WebP</p>
      <Button variant="outline">Select Images</Button>
    </div>
  );
}
