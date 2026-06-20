import * as React from "react";
import { Upload, LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components/ui/button";

export interface DropZoneBaseProps {
  onFilesAdded: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;

  // Content customization
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: LucideIcon;

  // Validation
  validateFile?: (file: File) => boolean;
  onValidationError?: (error: string) => void;

  // Styling
  className?: string;
  iconClassName?: string;
}

export function DropZoneBase({
  onFilesAdded,
  accept = "image/*",
  multiple = true,
  disabled = false,
  title = "Drop files here or click to select",
  description,
  buttonText = "Select Files",
  icon: Icon = Upload,
  validateFile,
  onValidationError,
  className,
  iconClassName,
}: DropZoneBaseProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);

    if (validateFile) {
      const validFiles: File[] = [];
      for (const file of files) {
        if (validateFile(file)) {
          validFiles.push(file);
        } else {
          onValidationError?.(`Invalid file: ${file.name}`);
        }
      }
      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    } else {
      onFilesAdded(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || disabled) return;

    const files = Array.from(e.target.files);

    if (validateFile) {
      const validFiles: File[] = [];
      for (const file of files) {
        if (validateFile(file)) {
          validFiles.push(file);
        } else {
          onValidationError?.(`Invalid file: ${file.name}`);
        }
      }
      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    } else {
      onFilesAdded(files);
    }

    // Reset input so same files can be selected again
    e.target.value = "";
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        "border-border hover:border-primary/50 hover:bg-muted/50",
        isDragging && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      <div className={cn("p-4 bg-primary/10 rounded-full mb-4", iconClassName)}>
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-6">{description}</p>}
      <Button variant="outline" disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  );
}
