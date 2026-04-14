import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useImageCompressorStore } from "./store";

export function ImageCompressorFileList() {
  const files = useImageCompressorStore((state) => state.files);
  const removeFile = useImageCompressorStore((state) => state.removeFile);

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
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground truncate">{file.file.name}</p>
                {file.compressionRatio !== undefined && file.compressionRatio > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    -{file.compressionRatio.toFixed(1)}%
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Original: {(file.originalSize / 1024).toFixed(1)} KB</span>
                {file.compressedSize !== undefined && (
                  <>
                    <span>→</span>
                    <span className="text-primary font-medium">
                      {(file.compressedSize / 1024).toFixed(1)} KB
                    </span>
                  </>
                )}
              </div>
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