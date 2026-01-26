"use client";

import { useImageToPdfStore } from "./image-to-pdf.store";
import { DropZone } from "./components/drop-zone";
import { SortableImageList } from "./components/sortable-image-list";
import { PdfInteractionPanel } from "./components/pdf-interaction-panel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function ImageToPdf() {
  const { images, reset } = useImageToPdfStore();

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Upload Area */}
        <DropZone />

        {/* File List */}
        {images.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Images</h2>
              <Button variant="destructive" size="sm" onClick={reset} className="h-8 text-xs">
                <Trash2 className="mr-2 h-3 w-3" />
                Clear All
              </Button>
            </div>
            <SortableImageList />
          </div>
        )}
      </div>

      {/* Sidebar / Settings */}
      <div className="lg:col-span-1">
        <PdfInteractionPanel />
      </div>
    </div>
  );
}
