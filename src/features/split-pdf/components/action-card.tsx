import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useSplitPdfContext } from "../context";
import { parsePageRange } from "../utils/page-range";
import { extractPages, splitAllPages } from "../services/split-pdf";
import { Loader2, Download, Scissors } from "lucide-react";
import { createZip } from "@/shared/services/zip";
import { downloadBlob } from "@/shared/services/download";

export function SplitActionCard() {
  const { fileData, settings, isProcessing, setIsProcessing, setError } = useSplitPdfContext();
  const [success, setSuccess] = useState(false);

  const handleSplit = async () => {
    if (!fileData) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      if (settings.splitMode === "extract") {
        const indices = parsePageRange(settings.pageRange, fileData.pageCount);

        if (indices.length === 0) {
          setError("Invalid page range. Please select at least one valid page.");
          setIsProcessing(false);
          return;
        }

        const blob = await extractPages(fileData.file, indices, fileData.fileName);
        downloadBlob(blob, `${fileData.fileName}-extracted.pdf`);
      } else {
        const files = await splitAllPages(fileData.file, fileData.pageCount, fileData.fileName);
        const zipBlob = await createZip(files);
        downloadBlob(zipBlob, `${fileData.fileName}-split.zip`);
      }

      setSuccess(true);
    } catch {
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
