"use client";

import * as React from "react";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DragDropZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesAdded: (files: File[]) => void;
  accept?: string;
}

export function DragDropZone({ onFilesAdded, accept = "image/*", className, ...props }: DragDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragCounter = React.useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith(accept.replace("/*", "/")));

    if (files.length) onFilesAdded(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesAdded(Array.from(e.target.files));
  };

  return (
    <div
      {...props}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 px-6 py-12 text-center transition-colors hover:border-primary/50 hover:bg-muted/50",
        className
      )}
    >
      <input ref={inputRef} type="file" multiple accept={accept} onChange={handleFileInputChange} className="hidden" />

      <Upload className="w-12 h-12 text-blue-600 mb-4 opacity-70" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Drop images here or click to select</h3>
      <p className="text-sm text-slate-500 mb-6">Supports JPG, PNG, GIF, WebP, SVG and more</p>
      <Button onClick={() => inputRef.current?.click()}>Select Images</Button>
    </div>
  );
}
