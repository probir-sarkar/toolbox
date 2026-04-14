import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { TrustBar } from "@/components/common/trust-bar";
import { HowItWorks } from "@/components/common/how-it-works";

const MergePdfDropZone = lazy(() => import("@/components/features/merge-pdf/drop-zone").then(mod => ({ default: mod.MergePdfDropZone })));
const MergeFileList = lazy(() => import("@/components/features/merge-pdf/file-list").then(mod => ({ default: mod.MergeFileList })));
const MergeSettings = lazy(() => import("@/components/features/merge-pdf/settings").then(mod => ({ default: mod.MergeSettings })));
const MergeActionCard = lazy(() => import("@/components/features/merge-pdf/action-card").then(mod => ({ default: mod.MergeActionCard })));
const MergeFaq = lazy(() => import("@/components/features/merge-pdf/faq").then(mod => ({ default: mod.MergeFaq })));
const MergeError = lazy(() => import("@/components/features/merge-pdf/error-display").then(mod => ({ default: mod.MergeError })));

export const Route = createFileRoute("/merge-pdf")({
  component: MergePdfPage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Merge PDF Files - Free Online PDF Combiner | Toolbox"
      },
      {
        name: "description",
        content:
          "Combine multiple PDF files into one document for free. Fast, secure, and works offline. No uploads, no registration. Merge PDFs in seconds."
      },
      {
        property: "og:title",
        content: "Merge PDF Files - Free Online"
      },
      {
        property: "og:description",
        content: "Combine multiple PDFs into one. Fast, secure, and works offline."
      }
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/merge-pdf"
      }
    ]
  })
});

function MergePdfPage() {
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
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <MergeError />
              <MergePdfDropZone />
              <MergeFileList />
            </Suspense>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <MergeSettings />
              <MergeActionCard />
            </Suspense>
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
          <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
            <MergeFaq />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
