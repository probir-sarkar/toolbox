import { LucideProps } from "lucide-react";
import { ComponentProps, type RefObject } from "react";
import { Button } from "../ui/button";

type SingleDropzoneProps = {
  multiple?: false;
  onDrop?: (file: File) => void | Promise<void>;
};

type MultipleDropzoneProps = {
  multiple: true;
  onDrop?: (files: File[]) => void | Promise<void>;
};
export type DropzoneRootProps = {
  children?: React.ReactNode;
  accept?: string;
  disabled?: boolean;
  className?: string;
} & (SingleDropzoneProps | MultipleDropzoneProps);

export interface DropzoneContextValue {
  isDragActive: boolean;
  disabled: boolean;
  accept: string | undefined;
  trigger: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

// Sub-component types
export interface DropzoneIconProps extends LucideProps {
  icon?: React.FC<LucideProps>;
}

export interface DropzoneTextProps {
  className?: string;
  children: React.ReactNode;
}

export type DropzoneButtonProps = ComponentProps<typeof Button>;

export interface DropzoneTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface DropzoneFileInfoProps {
  file: File;
  className?: string;
}
