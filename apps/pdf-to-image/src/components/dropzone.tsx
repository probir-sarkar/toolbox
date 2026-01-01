"use client";

import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onFiles: (files: FileList | File[]) => void;
};

export default function Dropzone({ onFiles }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);
      if (e.dataTransfer?.files?.length) {
        onFiles(e.dataTransfer.files);
      }
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      className={cn(
        "rounded-md border p-8 transition",
        isOver ? "border-primary/60 bg-primary/5" : "border-muted bg-card"
      )}
      role="region"
      aria-label="Upload PDF area"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-sm text-muted-foreground">
          Drag and drop your PDF here, or
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={() => inputRef.current?.click()}
            aria-label="Choose PDF"
          >
            Choose PDF
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) {
                onFiles(e.target.files);
                e.target.value = "";
              }
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          100% local — no uploads, works offline.
        </p>
      </div>
    </div>
  );
}
