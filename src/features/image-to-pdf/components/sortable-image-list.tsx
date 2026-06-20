import { DragDropProvider } from "@dnd-kit/react";
import { useImageToPdfContext } from "../context";
import { SortableImageItem } from "./sortable-image-item";

export function SortableImageList() {
  const { images, removeImage, reorderImages } = useImageToPdfContext();

  const handleDragEnd = (event: unknown) => {
    const { operation, canceled } = event as {
      operation: { source: { id: string }; target?: { id: string } };
      canceled: boolean;
    };

    if (canceled) return;

    const { source, target } = operation;

    if (target && source.id !== target.id) {
      reorderImages(source.id, target.id);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Files to Convert ({images.length})
      </h2>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <SortableImageItem key={image.id} image={image} index={index} onRemove={removeImage} />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
