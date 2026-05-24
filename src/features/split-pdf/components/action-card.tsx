import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useSplitPdfContext } from "../context";
import { Loader2, Download, Scissors } from "lucide-react";
import { createZip, downloadBlob } from "@/shared/services/file";

export function SplitActionCard() {
  const { fileData, settings, isProcessing, setIsProcessing, setError } = useSplitPdfContext();

  const [success, setSuccess] = useState(false);

  const parsePageRange = (range: string, max: number): number[] => {
    const pages = new Set<number>();
    const parts = range.split(",");

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= max) pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const num = Number(trimmed);
        if (!isNaN(num) && num >= 1 && num <= max) {
          pages.add(num - 1); // 0-indexed
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!fileData) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      // Dynamic import to reduce initial bundle size
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await fileData.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const originalName = fileData.fileName;

      if (settings.splitMode === "extract") {
        const indices = parsePageRange(settings.pageRange, fileData.pageCount);

        if (indices.length === 0) {
          setError("Invalid page range. Please select at least one valid page.");
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, indices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        downloadBlob(new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }), `${originalName}-extracted.pdf`);
      } else if (settings.splitMode === "split-all") {
        const files: Record<string, Uint8Array> = {};

        for (let i = 0; i < fileData.pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();

          files[`${originalName}-page-${i + 1}.pdf`] = pdfBytes;
        }

        const zipBlob = await createZip(files);
        downloadBlob(zipBlob, `${originalName}-split.zip`);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!fileData) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Process PDF</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          {settings.splitMode === "extract"
            ? "Extract selected pages into a new PDF."
            : "Split every page into a separate PDF file (downloaded as ZIP)."}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleSplit}
          disabled={isProcessing || (settings.splitMode === "extract" && !settings.pageRange)}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {settings.splitMode === "extract" ? <Download className="mr-2 h-4 w-4" /> : <Scissors className="mr-2 h-4 w-4" />}
              {settings.splitMode === "extract" ? "Download PDF" : "Split & Download ZIP"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
