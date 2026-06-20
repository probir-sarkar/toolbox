
import { useSortable } from "@dnd-kit/react/sortable";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils";
import type { ImageItem } from "../types";

interface SortableImageItemProps {
  image: ImageItem;
  index: number;
  onRemove: (id: string) => void;
}

export function SortableImageItem({ image, index, onRemove }: SortableImageItemProps) {
  const sortable = useSortable({ id: image.id, index });

  return (
    <Card
      ref={sortable.ref}
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all hover:ring-2 hover:ring-primary/50 cursor-grab active:cursor-grabbing",
        sortable.isDragging && "shadow-xl border-primary/50 rotate-1 bg-background opacity-90 z-50",
        "touch-none"
      )}
    >

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
      <div className="aspect-3/4 w-full bg-muted">
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
