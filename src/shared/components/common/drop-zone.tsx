import { createContext, useContext, useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

import type {
  DropzoneContextValue,
  DropzoneRootProps,
  DropzoneIconProps,
  DropzoneButtonProps
} from "./drop-zone.types";

const DropzoneContext = createContext<DropzoneContextValue | null>(null);

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
      await (onDrop as (files: File[]) => void | Promise<void>)?.(files);
    } else {
      await (onDrop as (file: File) => void | Promise<void>)?.(files[0]);
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
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files?.length) return;
    handleFiles(Array.from(e.target.files));
  };

  const trigger = () => {
    if (!disabled) inputRef.current?.click();
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
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 px-6 py-12 text-center transition-colors",
          "hover:border-primary/50 hover:bg-muted/50",
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
        isDragActive ? "text-primary scale-110" : "text-red-600 opacity-70",
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
  className
}: DropzoneButtonProps) {
  return (
    <Button variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
};
