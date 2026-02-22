import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"

import { ConversionSettings } from "@/components/features/pdf-to-image/conversion-settings"
import { FAQ } from "@/components/features/pdf-to-image/faq"
import { HowItWorks } from "@/components/common/how-it-works"

const PdfDropZone = lazy(
  () => import("@/components/features/pdf-to-image/pdf-drop-zone").then((mod) => ({ default: mod.PdfDropZone }))
)
const PdfFileList = lazy(
  () => import("@/components/features/pdf-to-image/pdf-file-list").then((mod) => ({ default: mod.PdfFileList }))
)
const ActionCard = lazy(
  () => import("@/components/features/pdf-to-image/action-card").then((mod) => ({ default: mod.ActionCard }))
)

import { TrustBar } from "@/components/common/trust-bar"

export const Route = createFileRoute('/pdf-to-image')({
  component: PdfToImagePage,
  ssr: false,
})

function PdfToImagePage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Convert PDF to Image
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Convert PDF pages to high-quality images with no uploads. Works offline, fast, and secure.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div>Loading...</div>}>
              <PdfDropZone />
              <PdfFileList />
            </Suspense>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <ConversionSettings />
            <Suspense fallback={<div>Loading...</div>}>
              <ActionCard />
            </Suspense>
          </div>
        </div>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Add your PDF",
                description: "Choose any PDF from your device. Files never leave your browser."
              },
              {
                title: "Render pages",
                description: "We process each page locally using safe, standards-based rendering."
              },
              {
                title: "Save images",
                description: "Export pages individually or all at once. Great for sharing or archives."
              }
            ]}
            description="Simple, predictable steps anyone can follow. No accounts, no uploads, no learning curve."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <FAQ />
        </section>
      </div>
    </main>
  )
}
