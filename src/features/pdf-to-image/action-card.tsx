
import { ActionCard as ReusableActionCard } from "@/shared/components/layout/action-card";
import { usePdfToImageContext } from "./pdf-to-image.context";
import { pdfToImagesBrowser, downloadAll } from "@/shared/services/pdf";

export function ActionCard() {
  const { file, format, quality, scale, startPage, endPage, isConverting, setIsConverting, setImages, setProgress, progress, images } = usePdfToImageContext();

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
