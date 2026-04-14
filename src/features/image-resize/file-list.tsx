import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useImageResizeStore } from "./store";

export function ImageResizeFileList() {
  const files = useImageResizeStore((state) => state.files);
  const removeFile = useImageResizeStore((state) => state.removeFile);

  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file.id} className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={file.preview}
              alt={file.file.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{file.file.name}</p>
              <p className="text-sm text-muted-foreground">
                {file.originalWidth} × {file.originalHeight}px • {(file.file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFile(file.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}