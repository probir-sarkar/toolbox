"use client";
import { useDropzone, useFileInput} from "@uppy/react";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  note?: string;
  noClick?: boolean;
};

export function Dropzone({ note, noClick }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({ noClick });

  return (
    <div data-uppy-element="dropzone" role="presentation">
      <input {...getInputProps()} tabIndex={-1} name="uppy-dropzone-file-input" className="hidden" />
      <div
        {...getRootProps()}
        tabIndex={0}
        className={cn(
          "border-2 border-dashed border-gray-300",
          "rounded-lg p-6 bg-gray-50",
          "transition-colors duration-200",
          {
            "cursor-pointer hover:bg-blue-50": !noClick
          }
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <p className="text-gray-600">Drop files here or click to add them</p>
        </div>
        {note ? <div className="text-sm text-gray-500">{note}</div> : null}
      </div>
    </div>
  );
}



type FileInputProps = {
	multiple?: boolean;
	accept?: string;
};

export function FileInput({ multiple, accept }: FileInputProps) {
	const { getButtonProps, getInputProps } = useFileInput({ multiple, accept });

	return (
		<div>
			<input {...getInputProps()} className="hidden" />
			<button {...getButtonProps()}>Add files</button>
		</div>
	);
}