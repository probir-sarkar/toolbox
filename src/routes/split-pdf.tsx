import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { useSplitPdfStore } from "@/components/features/split-pdf/store"

const SplitPdfDropZone = lazy(() => import("@/components/features/split-pdf/drop-zone").then(mod => ({ default: mod.SplitPdfDropZone })))
const SplitFileDetails = lazy(() => import("@/components/features/split-pdf/file-details").then(mod => ({ default: mod.SplitFileDetails })))
const SplitSettings = lazy(() => import("@/components/features/split-pdf/settings").then(mod => ({ default: mod.SplitSettings })))
const SplitActionCard = lazy(() => import("@/components/features/split-pdf/action-card").then(mod => ({ default: mod.SplitActionCard })))
const SplitFaq = lazy(() => import("@/components/features/split-pdf/faq").then(mod => ({ default: mod.SplitFaq })))
const SplitError = lazy(() => import("@/components/features/split-pdf/error-display").then(mod => ({ default: mod.SplitError })))

export const Route = createFileRoute('/split-pdf')({
  component: SplitPdfPage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Split PDF File - Extract Pages Free Online | Toolbox",
      },
      {
        name: "description",
        content: "Split PDF files and extract pages for free. Works offline, no uploads. Separate PDF into individual pages or extract specific pages.",
      },
      {
        property: "og:title",
        content: "Split PDF File - Extract Pages Free",
      },
      {
        property: "og:description",
        content: "Split PDF files and extract pages. Works offline, no uploads.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/split-pdf"
      }
    ]
  }),
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
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <SplitError />
              {!file ? <SplitPdfDropZone /> : <SplitFileDetails />}
            </Suspense>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <SplitSettings />
              <SplitActionCard />
            </Suspense>
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
          <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
            <SplitFaq />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
