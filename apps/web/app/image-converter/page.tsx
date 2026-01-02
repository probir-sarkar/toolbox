"use client";

import { ImageConversionSettings } from "@/features/image-converter/conversion-settings";
import { DragDropZone } from "@/components/common/drag-drop-zone";
import { FileList } from "@/features/image-converter/file-list";
import { useImageConverterStore } from "@/features/image-converter/image-converter.store";
import { ImageProcessingPanel } from "@/features/image-converter/image-processing-panel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { convertImages, downloadFile, type ConversionOptions } from "@/features/image-converter/utils/image-converter";

function ImageConverterPage() {
  const addFiles = useImageConverterStore((state) => state.addFiles);
  const files = useImageConverterStore((state) => state.files);
  const isProcessing = useImageConverterStore((state) => state.isProcessing);
  const setIsProcessing = useImageConverterStore((state) => state.setIsProcessing);
  const updateFileStatus = useImageConverterStore((state) => state.updateFileStatus);
  const updateFileResult = useImageConverterStore((state) => state.updateFileResult);
  const selectedFormat = useImageConverterStore((state) => state.selectedFormat);
  const quality = useImageConverterStore((state) => state.quality);
  const autoOptimize = useImageConverterStore((state) => state.autoOptimize);
  const removeMetadata = useImageConverterStore((state) => state.removeMetadata);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    const options: ConversionOptions = {
      format: selectedFormat,
      quality,
      autoOptimize,
      removeMetadata
    };

    try {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const fileData = files[i];

        // Skip already completed files
        if (fileData.status === "completed") continue;

        updateFileStatus(fileData.id, "processing", 0);

        try {
          const result = await convertImages(
            [fileData.file],
            options,
            (_fileIndex, progress) => {
              updateFileStatus(fileData.id, "processing", progress);
            }
          );

          if (result[0]) {
            updateFileResult(fileData.id, result[0]);
            updateFileStatus(fileData.id, "completed", 100);

            // Auto-download the converted file
            downloadFile(result[0].compressedFile, fileData.file.name);
          }
        } catch (error) {
          console.error(`Error converting ${fileData.file.name}:`, error);
          updateFileStatus(fileData.id, "error");
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Image Converter</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert and optimize multiple images instantly. Drag, drop, and transform your images in bulk with powerful
            settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Settings */}
          <div className="lg:col-span-2 space-y-6">
            <DragDropZone onFilesAdded={addFiles} />
            <FileList />
          </div>

          {/* Right Column - Conversion Settings */}
          <div className="space-y-6">
            <ImageConversionSettings />

            {isProcessing && <ImageProcessingPanel />}
            {!isProcessing && (
              <Card className="p-6 bg-linear-to-br from-blue-600 to-blue-700 border-0 sticky top-8">
                <Button
                  onClick={handleConvert}
                  disabled={files.length === 0}
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold h-12 mb-3 transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Convert All Images
                </Button>
                <p className="text-xs text-blue-100 text-center">
                  {files.length === 0
                    ? "Add images to get started"
                    : `Ready to convert ${files.length} image${files.length !== 1 ? "s" : ""}`}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "Super Fast",
              desc: "Process multiple images simultaneously in seconds"
            },
            {
              icon: "🔒",
              title: "Secure",
              desc: "All conversions happen locally in your browser"
            },
            {
              icon: "✨",
              title: "High Quality",
              desc: "Preserve image quality while reducing file size"
            }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3 opacity-70">{item.icon}</div>
              <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ImageConverterPage;
