"use client";

import { ActionCard } from "@/components/features/pdf-to-image/action-card";
import { ConversionSettings } from "@/components/features/pdf-to-image/conversion-settings";
import { FAQ } from "@/components/features/pdf-to-image/faq";
import { HowItWorks } from "@/components/features/pdf-to-image/how-it-works";
import { PdfDropZone } from "@/components/features/pdf-to-image/pdf-drop-zone";
import { PdfFileList } from "@/components/features/pdf-to-image/pdf-file-list";
import { TrustBar } from "@/components/features/pdf-to-image/trust-bar";
import { useEffect } from "react";
import { initPdfWorker } from "@toolbox/pdf-utils";

export default function PdfToImagePage() {

  useEffect(() => {
    initPdfWorker();
  }, []);

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance">
              Convert PDF to Image
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
              Convert PDF pages to high-quality images with no uploads. Works offline, fast, and secure.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <PdfDropZone />
            <PdfFileList />
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <ConversionSettings />
            <ActionCard />
          </div>
        </div>

        <section className="mb-24">
          <HowItWorks />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <FAQ />
        </section>
      </div>
    </main>
  );
}
