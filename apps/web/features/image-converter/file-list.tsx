"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { useImageConverterStore } from "./image-converter.store";
import { FileThumbnail } from "./utils/file-thumbnail";

export function FileList() {
  const files = useImageConverterStore((state) => state.files);
  const removeFile = useImageConverterStore((state) => state.removeFile);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file.id} size="sm">
          <div className="flex items-center gap-3 p-3">
            <FileThumbnail file={file} />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{file.file.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {prettyBytes(file.file.size)}
                </Badge>
                {file.status === "completed" && (
                  <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
                    Converted
                  </Badge>
                )}
                {file.status === "processing" && (
                  <Badge variant="outline" className="text-xs">
                    Processing...
                  </Badge>
                )}
                {file.status === "error" && (
                  <Badge variant="destructive" className="text-xs">
                    Error
                  </Badge>
                )}
              </div>
            </div>

            <Button variant="ghost" size="icon-sm" onClick={() => removeFile(file.id)} className="shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {file.status === "processing" && file.progress !== undefined && (
            <div className="px-3 pb-3">
              <progress
                value={file.progress}
                max="100"
                className="w-full h-1 appearance-none bg-slate-100 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500"
              />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
