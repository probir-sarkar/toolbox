"use client";

import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePdfToImageStore } from "./store";

export function PdfFileList() {
  const file = usePdfToImageStore((state) => state.file);
  const reset = usePdfToImageStore((state) => state.reset);

  if (!file) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Selected File</h3>
      <Card className="relative flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium text-slate-900">{file.name}</p>
          <p className="text-sm text-slate-500">
            {formatBytes(Number(file.size))} • {file.pages} pages
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-destructive"
          onClick={reset}
        >
          <X className="h-5 w-5" />
        </Button>
      </Card>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
