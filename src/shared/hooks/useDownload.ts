import { useCallback } from "react";

export interface DownloadOptions {
  filename?: string;
  extension?: string;
  mimeType?: string;
}

export function useDownload() {
  const downloadFile = useCallback((blob: Blob, options: DownloadOptions = {}) => {
    const { filename = "download", extension, mimeType } = options;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const finalFilename = extension ? `${filename}.${extension}` : filename;
    link.download = finalFilename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const downloadFiles = useCallback(
    (blobs: Blob[], baseFilename: string, extension?: string) => {
      blobs.forEach((blob, index) => {
        const filename = extension ? `${baseFilename}_${index + 1}.${extension}` : `${baseFilename}_${index + 1}`;
        downloadFile(blob, { filename });
      });
    },
    [downloadFile]
  );

  return {
    downloadFile,
    downloadFiles,
  };
}
