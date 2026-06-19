import type { PdfFile } from "../types";
import { arrayMove } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { GripVertical, X, FileText } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { useMergePdfContext } from "../context";

function SortableItem({ file }: { file: PdfFile }) {
  const { removeFile } = useMergePdfContext();

  const sortable = useSortable({ id: file.id });

  return (
    <div ref={sortable.ref} className={sortable.isDragging ? "opacity-50" : ""}>
      <div className="touch-none select-none mb-3 cursor-grab active:cursor-grabbing">
        <Card className="flex-row items-center p-3 gap-3">
          <div className="hover:text-foreground text-muted-foreground/50">
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
    </div>
  );
}

export function MergeFileList() {
  const { files, setFiles } = useMergePdfContext();

  function handleDragEnd(event: unknown) {
    const { operation, canceled } = event as {
      operation: { source: { id: string }; target?: { id: string } };
      canceled: boolean;
    };

    if (canceled) return;

    const { source, target } = operation;

    if (target && source.id !== target.id) {
      const oldIndex = files.findIndex((f) => f.id === source.id);
      const newIndex = files.findIndex((f) => f.id === target.id);

      setFiles(arrayMove(files, oldIndex, newIndex));
    }
  }

  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Files to Merge ({files.length})</h3>
      </div>

      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="py-2">
          {files.map((file) => (
            <SortableItem key={file.id} file={file} />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
