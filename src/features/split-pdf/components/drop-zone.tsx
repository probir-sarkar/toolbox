import { FileText } from "lucide-react";
import { useSplitPdfContext } from "../context";
import { DropZone } from "@/shared/components/common/drop-zone";
import { loadPdfFile } from "../services/split-pdf";

export function SplitPdfDropZone() {
  const { setFile, setError } = useSplitPdfContext();

  const handleFile = async (file: File) => {
    try {
      const fileInfo = await loadPdfFile(file);
      setFile(fileInfo.file, fileInfo.pageCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load PDF.");
    }
  };

  return (
    <DropZone onDrop={handleFile} accept="application/pdf">
      <DropZone.Icon icon={FileText} className="text-orange-600" />
      <DropZone.Title>Drop PDF here or click to select</DropZone.Title>
      <DropZone.Description>Select a PDF file to split or extract pages from</DropZone.Description>
      <DropZone.Button>Select PDF</DropZone.Button>
    </DropZone>
  );
}
