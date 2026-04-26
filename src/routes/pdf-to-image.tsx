import { createFileRoute, ClientOnly } from '@tanstack/react-router'

import { PageHeader } from "@/components/common/page-header"
import { ConversionSettings } from "@/components/features/pdf-to-image/conversion-settings"
import { FAQ } from "@/components/features/pdf-to-image/faq"
import { HowItWorks } from "@/components/common/how-it-works"
import { PdfDropZone } from "@/components/features/pdf-to-image/pdf-drop-zone"
import { PdfFileList } from "@/components/features/pdf-to-image/pdf-file-list"
import { ActionCard } from "@/components/features/pdf-to-image/action-card"

export const Route = createFileRoute('/pdf-to-image')({
  component: PdfToImagePage,
  head: () => ({
    meta: [
      {
        title: "PDF to Image Converter - Free & Online | Toolbox",
      },
      {
        name: "description",
        content: "Convert PDF pages to high-quality images (JPG, PNG) for free. Works offline, no uploads. Fast, secure, and completely private PDF to image conversion.",
      },
      {
        property: "og:title",
        content: "PDF to Image Converter - Free & Online",
      },
      {
        property: "og:description",
        content: "Convert PDF pages to high-quality images. Works offline, no uploads. Fast and secure.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/pdf-to-image"
      }
    ]
  }),
})

function PdfToImagePage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Convert PDF to Image"
          subtitle="Convert PDF pages to high-quality images with no uploads. Works offline, fast, and secure."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <ClientOnly fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
              <PdfDropZone />
              <PdfFileList />
            </ClientOnly>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <ClientOnly fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
              <ConversionSettings />
              <ActionCard />
            </ClientOnly>
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
