import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { ImageResize, ImageResizeFaq } from "@/features/image-resize/image-resize"

const ImageResizeComponent = lazy(() => import("@/features/image-resize/image-resize").then(mod => ({ default: mod.ImageResize })))

export const Route = createFileRoute('/image-resize')({
  component: ImageResizePage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Image Resizer - Resize Images Online Free | Toolbox",
      },
      {
        name: "description",
        content: "Resize images to any dimension online for free. Maintain aspect ratio, batch processing, multiple formats. 100% free, private, and works offline.",
      },
      {
        property: "og:title",
        content: "Image Resizer - Resize Images Free",
      },
      {
        property: "og:description",
        content: "Resize images to any dimension. 100% free and works offline.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/image-resize"
      }
    ]
  }),
})

function ImageResizePage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Image Resizer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Resize images to any dimension with precision. Maintain aspect ratio, batch process multiple images, and convert formats. 100% free and private.
            </p>
          </div>
          <TrustBar />
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
          <ImageResize />
        </Suspense>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Upload Images",
                description: "Drag & drop your photos. We support JPG, PNG, WebP, and more."
              },
              {
                title: "Set Dimensions",
                description: "Choose your target width, height, and quality. Maintain aspect ratio if needed."
              },
              {
                title: "Resize & Download",
                description: "Images are processed locally. Download them instantly in your preferred format."
              }
            ]}
            description="Resize your images in three simple steps. Fast, secure, and purely client-side."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <ImageResizeFaq />
        </section>
      </div>
    </main>
  )
}