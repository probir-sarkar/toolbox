import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { HowItWorks } from "@/components/common/how-it-works"
import { TrustBar } from "@/components/common/trust-bar"

const ImageConversionSettings = lazy(() => import("@/features/image-converter/conversion-settings").then(mod => ({ default: mod.ImageConversionSettings })))
const ImageDropZone = lazy(() => import("@/features/image-converter/image-drop-zone").then(mod => ({ default: mod.ImageDropZone })))
const FileList = lazy(() => import("@/features/image-converter/file-list").then(mod => ({ default: mod.FileList })))
const ActionCard = lazy(() => import("@/features/image-converter/action-card").then(mod => ({ default: mod.ActionCard })))
const FAQ = lazy(() => import("@/features/image-converter/faq").then(mod => ({ default: mod.FAQ })))

export const Route = createFileRoute('/image-converter')({
  component: ImageConverterPage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Image Converter & Optimizer - Convert & Compress Images Free | Toolbox",
      },
      {
        name: "description",
        content: "Convert, resize, and compress images in bulk. Support for JPG, PNG, WebP, and more. 100% free, private, and works offline.",
      },
      {
        property: "og:title",
        content: "Image Converter & Optimizer - Free",
      },
      {
        property: "og:description",
        content: "Convert, resize, and compress images. 100% free and works offline.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/image-converter"
      }
    ]
  }),
})

function ImageConverterPage() {
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
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <ImageDropZone />
              <FileList />
            </Suspense>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
              <ImageConversionSettings />
              <ActionCard />
            </Suspense>
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
          <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
            <FAQ />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
