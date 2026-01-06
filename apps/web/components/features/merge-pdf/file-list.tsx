"use client";

import { useMergePdfStore, PdfFile } from "./store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, X, FileText } from "lucide-react";
import prettyBytes from "pretty-bytes";

function SortableItem({ file }: { file: PdfFile }) {
  const removeFile = useMergePdfStore((state) => state.removeFile);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none select-none mb-3">
      <Card className="flex-row items-center p-3 gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:text-foreground text-muted-foreground/50 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
          <FileText className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1 flex items-center gap-2">
          <span className="truncate text-sm font-medium">{file.name}</span>
          <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline-block">
            ({prettyBytes(file.size)})
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => removeFile(file.id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove file</span>
        </Button>
      </Card>
    </div>
  );
}

export function MergeFileList() {
  const files = useMergePdfStore((state) => state.files);
  const setFiles = useMergePdfStore((state) => state.setFiles);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);

      setFiles(arrayMove(files, oldIndex, newIndex));
    }
  }

  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Files to Merge ({files.length})</h3>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={files.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="py-2">
            {files.map((file) => (
              <SortableItem key={file.id} file={file} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
