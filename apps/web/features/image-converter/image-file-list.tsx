"use client";
import { clsx } from "clsx";
import { Fragment, useContext, useEffect, useState } from "react";
import prettyBytes from "pretty-bytes";
import { UppyContext } from "@uppy/react";
import Thumbnail from "@/components/common/uppy/thumbnail";
import { Meta, UppyFile } from "@uppy/core";

export default function ImageFilesList() {
  const [files, setFiles] = useState<UppyFile<Meta, Record<string, never>>[]>(() => []);
  const { uppy } = useContext(UppyContext);
  useEffect(() => {
    if (!uppy) return;
    const syncFiles = () => {
      setFiles(uppy.getFiles() || []);
    };
    uppy?.on("state-update", syncFiles);
    return () => {
      uppy?.off("state-update", syncFiles);
    };
  }, [uppy]);

  return (
    <ul data-uppy-element="files-list" className="uppy-reset my-4">
      {files.map((file) => (
        <li key={file.id}>
          <Fragment>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <Thumbnail width="32px" height="32px" file={file} images={true} />
              </div>

              <p className="truncate">{file.name}</p>
              <p className="text-gray-500 tabular-nums min-w-18 text-right ml-auto">{prettyBytes(file.size || 0)}</p>

              <Fragment>
                <button
                  type="button"
                  className="flex rounded text-blue-500 hover:text-blue-700 bg-transparent transition-colors"
                  onClick={() => {
                    uppy?.removeFile(file.id);
                  }}
                >
                  remove
                </button>
              </Fragment>
            </div>
            <progress
              max="100"
              className={clsx(
                "w-full h-0.5 appearance-none bg-gray-100 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-gray-100 block my-2",
                {
                  "[&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500":
                    file.progress?.uploadComplete,
                  "[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500": file.error,
                  "[&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500":
                    !file.progress?.uploadComplete && !file.error
                }
              )}
              value={file.progress?.percentage || 0}
            />
          </Fragment>
        </li>
      ))}
    </ul>
  );
}
