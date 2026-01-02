"use client";

import { Dropzone } from "@/components/common/uppy/file-uploader";
import ImageFilesList from "@/features/image-converter/image-file-list";
import { ImageConverterProvider } from "@/features/image-converter/image-converter.context";
import { ImageConversionSettings } from "@/features/image-converter/conversion-settings";
import { DragDropZone } from "@/components/common/drag-drop-zone";

function ImageConverterContent() {
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
            <DragDropZone onFilesAdded={(files) => console.log(files)} />
            <ImageFilesList />
          </div>

          {/* Right Column - Conversion Settings */}
          <div className="space-y-6">
            <ImageConversionSettings />
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

const ImageConverterPage = () => {
  return (
    <ImageConverterProvider>
      <ImageConverterContent />
    </ImageConverterProvider>
  );
};

export default ImageConverterPage;
