"use client";

import { Download, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePdfToImageStore } from "./store";
import { pdfToImagesBrowser, downloadAll } from "@toolbox/pdf-utils";
import { Progress } from "@/components/ui/progress";

export function ActionCard() {
  const file = usePdfToImageStore((state) => state.file);
  const format = usePdfToImageStore((state) => state.format);
  const quality = usePdfToImageStore((state) => state.quality);
  const scale = usePdfToImageStore((state) => state.scale);
  const startPage = usePdfToImageStore((state) => state.startPage);
  const endPage = usePdfToImageStore((state) => state.endPage);
  
  const isConverting = usePdfToImageStore((state) => state.isConverting);
  const setIsConverting = usePdfToImageStore((state) => state.setIsConverting);
  const setImages = usePdfToImageStore((state) => state.setImages);
  const progress = usePdfToImageStore((state) => state.progress);
  const setProgress = usePdfToImageStore((state) => state.setProgress);
  const images = usePdfToImageStore((state) => state.images);

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setProgress(0);
    setImages([]);

    try {
      // Note: pdfToImagesBrowser currently doesn't expose a progress callback in the signature 
      // I saw in the original file, but if it did, we'd hook it up here.
      // Assuming it's a simple promise for now as per original code.
      const result = await pdfToImagesBrowser(file.file, {
        format: format === "png" ? "image/png" : "image/jpeg",
        scale,
        startPage,
        endPage,
        quality,
      });
      
      setImages(result);
      setProgress(100);
    } catch (error) {
      console.error(error);
      // Handle error state if needed
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    downloadAll(images);
  };

  if (!file && images.length === 0) return null;

  return (
    <Card className="p-6 bg-linear-to-br from-red-600 to-rose-700 border-0 sticky top-8 text-white">
      {!isConverting && images.length === 0 && (
        <Button
          onClick={handleConvert}
          disabled={!file}
          className="w-full bg-white text-red-600 hover:bg-rose-50 font-semibold h-12 mb-3 shadow-none border-0"
        >
          <Loader2 className="w-4 h-4 mr-2 animate-spin hidden" />
          Convert to Images
        </Button>
      )}

      {isConverting && (
        <div className="space-y-4 mb-4">
          <div className="flex justify-between text-sm font-medium">
            <span>Converting...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-red-800" />
        </div>
      )}

      {images.length > 0 && (
        <>
          <div className="text-center mb-4 text-rose-100 text-sm">
            Converted {images.length} pages successfully.
          </div>
          <Button
            onClick={handleDownload}
            className="w-full bg-white text-red-600 hover:bg-rose-50 font-semibold h-12 mb-3 shadow-none border-0"
          >
            <Package className="w-4 h-4 mr-2" />
            Download ZIP
          </Button>
        </>
      )}

      <p className="text-xs text-rose-100 text-center opacity-80">
        {images.length > 0
          ? "Ready to download"
          : file
          ? "Ready to convert PDF"
          : "Add a PDF to start"}
      </p>
    </Card>
  );
}
