"use client";

import { ActionCard as ReusableActionCard } from "@/components/common/action-card";
import { usePdfToImageStore } from "./store";
import { pdfToImagesBrowser, downloadAll } from "@/utils/pdf";

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
    <ReusableActionCard
      isProcessing={isConverting}
      progress={progress}
      onConvert={handleConvert}
      onDownload={handleDownload}
      canConvert={!!file}
      canDownload={images.length > 0}
      convertLabel="Convert to Images"
      downloadLabel="Download ZIP"
      statusMessage={
        images.length > 0
          ? (
            <>
              <span className="block mb-1 opacity-90">Converted {images.length} pages successfully.</span>
              Ready to download
            </>
          )
          : file
            ? "Ready to convert PDF"
            : "Add a PDF to start"
      }
      className="bg-linear-to-br from-red-600 to-rose-700"
      buttonClassName="text-red-600 hover:bg-rose-50"
      progressClassName="bg-red-800"
      statusTextClassName="text-rose-100"
    />
  );
}
