import { useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { getFileInfo } from "@/shared/services/pdf";
import { usePdfToImageContext } from "../context";
import { DropZone } from "@/shared/components/common/drop-zone";

export function PdfDropZone() {
  const { setFile, setError } = usePdfToImageContext();
  const handleFiles = async (files: File) => {
    const file = files;
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      const info = await getFileInfo(file);
      setFile(info);
      setError(null);
    } catch (err) {
      setError("Failed to load PDF file.");
      console.error(err);
    }
  };

  return (
    <DropZone onDrop={handleFiles} accept="application/pdf">
      <DropZone.Icon />
      <DropZone.Title>Drop PDF here or click to select</DropZone.Title>
      <DropZone.Description>Supports standard PDF documents</DropZone.Description>
      <DropZone.Button>Select PDF</DropZone.Button>
    </DropZone>
  );
}
