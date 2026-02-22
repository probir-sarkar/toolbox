import { createFileRoute } from '@tanstack/react-router'
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { SplitPdfDropZone } from "@/components/features/split-pdf/drop-zone"
import { SplitFileDetails } from "@/components/features/split-pdf/file-details"
import { SplitSettings } from "@/components/features/split-pdf/settings"
import { SplitActionCard } from "@/components/features/split-pdf/action-card"
import { SplitFaq } from "@/components/features/split-pdf/faq"
import { SplitError } from "@/components/features/split-pdf/error-display"
import { useSplitPdfStore } from "@/components/features/split-pdf/store"

export const Route = createFileRoute('/split-pdf')({
  component: SplitPdfPage,
  ssr: false,
})

function SplitPdfPage() {
  const file = useSplitPdfStore((state) => state.file)

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Split PDF File
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Extract specific pages or split your PDF into separate documents.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & Details */}
          <div className="lg:col-span-2 space-y-6">
            <SplitError />
            {!file ? <SplitPdfDropZone /> : <SplitFileDetails />}
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <SplitSettings />
            <SplitActionCard />
          </div>
        </div>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Upload PDF",
                description: "Select the PDF file you want to split or extract pages from."
              },
              {
                title: "Choose Mode",
                description: "Select 'Extract pages' to create a new PDF or 'Split all pages' to separate them."
              },
              {
                title: "Process & Save",
                description: "Click the button to process your file and download the result instantly."
              }
            ]}
            description="Splitting PDFs shouldn't be complicated. We make it simple and secure."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <SplitFaq />
        </section>
      </div>
    </main>
  )
}
