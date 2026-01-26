"use client";

import { TrustBar } from "@/components/common/trust-bar";
import { HowItWorks } from "@/components/common/how-it-works";
import { MergePdfDropZone } from "@/components/features/merge-pdf/drop-zone";
import { MergeFileList } from "@/components/features/merge-pdf/file-list";
import { MergeSettings } from "@/components/features/merge-pdf/settings";
import { MergeActionCard } from "@/components/features/merge-pdf/action-card";
import { MergeFaq } from "@/components/features/merge-pdf/faq";

import { MergeError } from "@/components/features/merge-pdf/error-display";

export default function MergePdfPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Merge PDF Files
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Combine multiple PDFs into a single document. Fast, secure, and fully offline.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <MergeError />
            <MergePdfDropZone />
            <MergeFileList />
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <MergeSettings />
            <MergeActionCard />
          </div>
        </div>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Select PDFs",
                description: "Drop your PDF files here. You can select multiple files at once."
              },
              {
                title: "Arrange & Sort",
                description: "Drag and drop the files in the list to set the order of the merged document."
              },
              {
                title: "Merge & Download",
                description: "Click Merge to combine them instantly. Your new PDF is ready to download."
              }
            ]}
            description="Our merge tool is designed for speed and privacy. No uploads, just instant merging."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <MergeFaq />
        </section>
      </div>
    </main>
  );
}
