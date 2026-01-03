"use client";

import { ImageConversionSettings } from "@/features/image-converter/conversion-settings";
import { ImageDropZone } from "@/features/image-converter/image-drop-zone";
import { FileList } from "@/features/image-converter/file-list";
import { ActionCard } from "@/features/image-converter/action-card";
import { FAQ } from "@/features/image-converter/faq";
import { HowItWorks } from "@/components/common/how-it-works";
import { TrustBar } from "@/components/common/trust-bar";

export default function ImageConverterPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Image Converter & Optimizer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Convert, resize, and compress images in bulk. 100% free, private, and runs entirely in your browser.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <ImageDropZone />
            <FileList />
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <ImageConversionSettings />
            <ActionCard />
          </div>
        </div>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Add your Images",
                description: "Drag & drop your photos. We support JPG, PNG, WebP, and more."
              },
              {
                title: "Choose Settings",
                description: "Select your target format, quality, and optimization preferences."
              },
              {
                title: "Convert & Save",
                description: "Images are processed locally. Download them individually or as a ZIP."
              }
            ]}
            description="Optimize and transform your images in three simple steps. Fast, secure, and purely client-side."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <FAQ />
        </section>
      </div>
    </main>
  );
}

