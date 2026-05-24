import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FileItemBase, FileItemBaseProps } from "./file-item-base";

export interface FileListBaseProps<T> {
  files: T[];
  onRemove: (id: string) => void;
  emptyMessage?: string;

  // Custom renderers
  renderFile?: (file: T, onRemove: (id: string) => void) => ReactNode;
  renderFileItem?: (props: FileItemBaseProps) => ReactNode;

  // Transform file to FileItemBaseProps
  toFileItemProps: (file: T) => FileItemBaseProps;

  // Styling
  className?: string;
  itemClassName?: string;
}

export function FileListBase<T>({
  files,
  onRemove,
  emptyMessage,
  renderFile,
  renderFileItem,
  toFileItemProps,
  className,
  itemClassName,
}: FileListBaseProps<T>) {
  if (files.length === 0) {
    if (emptyMessage) {
      return (
        <div className={className}>
          <p className="text-center text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {files.map((file) => {
        if (renderFile) {
          return <>{renderFile(file, onRemove)}</>;
        }

        const props = toFileItemProps(file);
        return (
          <FileItemBase
            key={props.id}
            {...props}
            onRemove={onRemove}
            className={itemClassName}
          />
        );
      })}
    </div>
  );
}

// Utility function to create a typed FileListBase
export function createFileListBase<T>(toFileItemProps: (file: T) => FileItemBaseProps) {
  return function TypedFileListBase(props: Omit<FileListBaseProps<T>, "toFileItemProps">) {
    return <FileListBase {...props} toFileItemProps={toFileItemProps} />;
  };
}
