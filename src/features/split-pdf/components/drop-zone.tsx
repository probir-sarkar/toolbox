
import { FileText } from "lucide-react";
import { useSplitPdfContext } from "../context";
import { DropZone } from "@/shared/components/common/drop-zone";
import { PDFDocument } from "pdf-lib";

export function SplitPdfDropZone() {
  const { setFile, setError } = useSplitPdfContext();

  const handleFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      if (pdfDoc.isEncrypted) {
        setError("This PDF is password protected and cannot be processed.");
        return;
      }

      if (pageCount === 0) {
        setError("This PDF has no pages.");
        return;
      }

      setFile(file, pageCount);
    } catch (err) {
      console.error(err);
      setError("Failed to load PDF. It might be password protected or corrupted.");
    }
  };

  const handleDrop = async (file: File) => {
    await handleFile(file);
  };

  return (
    <DropZone onDrop={handleDrop} accept="application/pdf">
      <DropZone.Icon icon={FileText} className="text-orange-600" />
      <DropZone.Title>Drop PDF here or click to select</DropZone.Title>
      <DropZone.Description>Select a PDF file to split or extract pages from</DropZone.Description>
      <DropZone.Button>Select PDF</DropZone.Button>
    </DropZone>
  );
}
