import { ReactNode } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils";

export interface FileItemBaseProps {
  id: string;
  name: string;
  size?: number;
  preview?: string;
  onRemove: (id: string) => void;

  // Optional custom renderers
  icon?: ReactNode;
  info?: ReactNode;
  actions?: ReactNode;

  // Styling
  className?: string;
}

export function FileItemBase({
  id,
  name,
  size,
  preview,
  onRemove,
  icon,
  info,
  actions,
  className,
}: FileItemBaseProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center gap-4">
        {preview && (
          <img
            src={preview}
            alt={name}
            className="w-16 h-16 object-cover rounded-md shrink-0"
          />
        )}
        {!preview && icon && <div className="shrink-0">{icon}</div>}

        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{name}</p>
          {size !== undefined && (
            <p className="text-sm text-muted-foreground">{formatSize(size)}</p>
          )}
          {info}
        </div>

        {actions || (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </Button>
        )}
      </div>
    </Card>
  );
}
