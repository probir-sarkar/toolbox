"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ImageItem } from "../image-to-pdf.store";

interface SortableImageItemProps {
  image: ImageItem;
  index: number;
  onRemove: (id: string) => void;
}

export function SortableImageItem({ image, index, onRemove }: SortableImageItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto"
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all hover:ring-2 hover:ring-primary/50",
        isDragging && "shadow-xl border-primary/50 rotate-1 bg-background opacity-90 z-50",
        "touch-none"
      )}
    >
      {/* Drag Handle - Full Overlay */}
      <div {...attributes} {...listeners} className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing" />

      {/* Remove Button - Top Right (Above Drag Handle) */}
      <Button
        variant="destructive"
        size="icon"
        className="absolute right-1 top-1 z-20 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(image.id);
        }}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Page Badge */}
      <div className="absolute left-1 top-1 z-20 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div className="aspect-[3/4] w-full bg-muted">
        <img src={image.previewUrl} alt={image.file.name} className="h-full w-full object-contain p-2" />
      </div>

      {/* Footer Info */}
      <div className="border-t bg-muted/30 p-2">
        <p className="truncate text-xs font-medium" title={image.file.name}>
          {image.file.name}
        </p>
        <p className="text-[10px] text-muted-foreground">{Math.round(image.file.size / 1024)} KB</p>
      </div>
    </Card>
  );
}
