"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useImageConverterStore } from "./image-converter.store";

export function ImageDropZone() {
    const addFiles = useImageConverterStore((state) => state.addFiles);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: File[]) => {
        // Filter for images just in case
        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        if (imageFiles.length > 0) {
            addFiles(imageFiles);
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
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
            />

            <Upload className="w-12 h-12 text-blue-600 mb-4 opacity-70" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Drop images here or click to select
            </h3>
            <p className="text-sm text-slate-500 mb-6">
                Supports JPG, PNG, WebP, AVIF, and more
            </p>
            <Button variant="outline">Select Images</Button>
        </div>
    );
}
