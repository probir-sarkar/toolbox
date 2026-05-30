import { createContext, useContext, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

import type {
  DropzoneContextValue,
  DropzoneRootProps,
  DropzoneIconProps,
  DropzoneButtonProps
} from "./drop-zone.types";

const DropzoneContext = createContext<DropzoneContextValue | null>(null);

export function isAccepted(file: File, accept?: string): boolean {
  if (!accept?.trim()) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  // When file.type is empty (common for custom formats on some platforms),
  // and accept contains only MIME patterns (no extensions), the file is rejected.
  // Extension patterns are checked first and work regardless of MIME type.
  // If accept is MIME-only and type is empty, we reject to avoid passing through
  // files that don't match the intended MIME constraints.
  return accept
    .split(",")
    .map((pattern) => pattern.trim().toLowerCase())
    .some((pattern) => {
      // Check extension patterns first (they work regardless of MIME type)
      if (pattern.startsWith(".")) {
        return fileName.endsWith(pattern);
      }

      // If file type is empty and this is a MIME pattern, skip it
      // (extension patterns above are the fallback for empty types)
      if (!fileType) {
        return false;
      }

      if (pattern.endsWith("/*")) {
        return fileType.startsWith(pattern.slice(0, -1));
      }

      return fileType === pattern;
    });
}

export const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);
  if (!context) throw new Error("Must be used within DropZone");
  return context;
};

export function DropZone({
  children,
  onDrop,
  accept,
  disabled = false,
  multiple = false,
  className
}: DropzoneRootProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    if (!onDrop || disabled || !files || files.length === 0) return;
    if (multiple) {
      await (onDrop as (files: File[]) => void | Promise<void>)(files);
    } else {
      await (onDrop as (file: File) => void | Promise<void>)(files[0]);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files).filter((f) => isAccepted(f, accept));
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files?.length) return;
    const files = Array.from(e.target.files).filter((f) => isAccepted(f, accept));
    handleFiles(files);
    e.target.value = "";
  };

  const trigger = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      trigger();
    }
  };

  return (
    <DropzoneContext.Provider
      value={{
        isDragActive,
        disabled,
        accept,
        trigger,
        inputRef
      }}
    >
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onClick={trigger}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 px-6 py-12 text-center transition-colors",
          "hover:border-primary/50 hover:bg-muted/50",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          isDragActive && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />

        {children}
      </div>
    </DropzoneContext.Provider>
  );
}

// Icon component
DropZone.Icon = function DropZoneIcon({ icon: Icon = Upload, className, ...props }: DropzoneIconProps) {
  const { isDragActive } = useDropzoneContext();

  return (
    <Icon
      className={cn(
        "mb-4 transition-all",
        isDragActive ? "text-primary scale-110" : "text-muted-foreground opacity-70",
        className
      )}
      {...props}
    />
  );
};

// Title component
DropZone.Title = function DropZoneTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("text-lg font-semibold text-foreground mb-2", className)}>{children}</h3>;
};

// Description component
DropZone.Description = function DropZoneDescription({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cn("text-sm text-muted-foreground mb-6", className)}>{children}</p>;
};

// Button component
DropZone.Button = function DropZoneButton({
  children,
  variant = "outline",
  size = "default",
  className,
  onClick
}: DropzoneButtonProps) {
  const { trigger, disabled } = useDropzoneContext();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        trigger();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
};
