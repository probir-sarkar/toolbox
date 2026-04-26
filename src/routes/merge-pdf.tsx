import { createFileRoute } from "@tanstack/react-router";
import { TrustBar } from "@/components/common/trust-bar";
import { HowItWorks } from "@/components/common/how-it-works";
import { FAQSection } from "@/components/common/faq-section";
import { MergePdfDropZone } from "@/components/features/merge-pdf/drop-zone";
import { MergeFileList } from "@/components/features/merge-pdf/file-list";
import { MergeSettings } from "@/components/features/merge-pdf/settings";
import { MergeActionCard } from "@/components/features/merge-pdf/action-card";
import { MergeError } from "@/components/features/merge-pdf/error-display";

const mergePdfFaqItems = [
  {
    question: "Is there a file size limit?",
    answer: "No, you can merge PDFs of any size. The processing happens locally on your device, so the only limit is your available memory."
  },
  {
    question: "Can I merge password-protected PDFs?",
    answer: "You can merge password-protected PDFs if you know the password. However, the merged PDF will not retain the password protection."
  },
  {
    question: "What happens to the original PDFs?",
    answer: "Your original PDF files are never modified or uploaded. The merging process creates a new PDF file, leaving your originals intact."
  },
  {
    question: "Can I reorder the PDFs before merging?",
    answer: "Yes, you can drag and drop the files in the list to set the order they will appear in the merged PDF."
  }
];

export const Route = createFileRoute("/merge-pdf")({
  component: MergePdfPage,
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
          <FAQSection items={mergePdfFaqItems} title="Frequently Asked Questions" />
        </section>
      </div>
    </main>
  );
}
