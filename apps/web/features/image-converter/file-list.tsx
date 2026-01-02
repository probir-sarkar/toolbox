"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Download, ArrowDown, Trash2 } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { useImageConverterStore } from "./image-converter.store";
import { FileThumbnail } from "./utils/file-thumbnail";
import { downloadFile } from "./utils/image-converter";

export function FileList() {
  const files = useImageConverterStore((state) => state.files);
  const removeFile = useImageConverterStore((state) => state.removeFile);
  const clearFiles = useImageConverterStore((state) => state.clearFiles);
  const isProcessing = useImageConverterStore((state) => state.isProcessing);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-slate-700">
          {files.length} {files.length === 1 ? "file" : "files"}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFiles}
          disabled={isProcessing}
          className="text-slate-600 hover:text-slate-900 h-8"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>
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
                {file.status === "completed" && file.result && (
                  <>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <ArrowDown className="h-3 w-3 text-green-600" />
                      <span>{prettyBytes(file.result.compressedSize)}</span>
                    </div>
                    <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
                      {file.result.savingsPercent}
                    </Badge>
                  </>
                )}
                {file.status === "completed" && !file.result && (
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

            {file.status === "completed" && file.result && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => downloadFile(file.result!.compressedFile, file.file.name)}
                className="shrink-0"
                title="Download converted file"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
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
