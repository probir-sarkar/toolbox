"use client";

import { useEffect, useState } from "react";
import { Image } from "lucide-react";
import { ConverterFile } from "../image-converter.store";
import { cn } from "@/lib/utils";

interface FileThumbnailProps {
  file: ConverterFile;
  width?: string;
  height?: string;
  className?: string;
}

export function FileThumbnail({ file, width = "48px", height = "48px", className }: FileThumbnailProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const isImage = file.file.type.startsWith("image/");

  useEffect(() => {
    if (!isImage) return;

    const url = URL.createObjectURL(file.file);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file.file, isImage]);

  return (
    <div
      className={cn("relative overflow-hidden bg-slate-100 rounded-lg flex items-center justify-center", className)}
      style={{ width, height }}
    >
      {isImage && preview ? (
        <img className="w-full h-full object-cover" src={preview} alt={file.file.name} />
      ) : (
        <Image className="w-1/2 h-1/2 text-slate-400" strokeWidth={1.5} />
      )}
    </div>
  );
}
