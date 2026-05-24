
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneSkeletonProps {
  className?: string;
}

export function DropZoneSkeleton({ className }: DropZoneSkeletonProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 px-6 py-12 text-center animate-pulse",
        className
      )}
    >
      <div className="w-12 h-12 mb-4 opacity-30">
        <Upload className="w-full h-full text-muted-foreground" />
      </div>
      <div className="h-6 w-48 bg-muted rounded mb-2"></div>
      <div className="h-4 w-64 bg-muted rounded mb-6"></div>
      <div className="h-10 w-32 bg-muted rounded"></div>
    </div>
  );
}
