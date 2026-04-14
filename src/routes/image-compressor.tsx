import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { ImageCompressor, ImageCompressorFaq } from "@/features/image-compressor/image-compressor"

const ImageCompressorComponent = lazy(() => import("@/features/image-compressor/image-compressor").then(mod => ({ default: mod.ImageCompressor })))

export const Route = createFileRoute('/image-compressor')({
  component: ImageCompressorPage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Image Compressor - Compress Images Online Free | Toolbox",
      },
      {
        name: "description",
        content: "Compress images to reduce file size while maintaining quality. Smart compression, batch processing, multiple formats. 100% free, private, and works offline.",
      },
      {
        property: "og:title",
        content: "Image Compressor - Free Online",
      },
      {
        property: "og:description",
        content: "Compress images to reduce file size. 100% free and works offline.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/image-compressor"
      }
    ]
  }),
})

function ImageCompressorPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Image Compressor
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Compress images to reduce file size while maintaining quality. Smart compression algorithms, batch processing, and format conversion. 100% free and private.
            </p>
          </div>
          <TrustBar />
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
          <ImageCompressor />
        </Suspense>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Upload Images",
                description: "Drag & drop your photos. We support JPG, PNG, WebP, and more."
              },
              {
                title: "Adjust Quality",
                description: "Set compression quality, max dimensions, and target file size."
              },
              {
                title: "Compress & Download",
                description: "Images are optimized locally. See compression ratios and download instantly."
              }
            ]}
            description="Optimize your images in three simple steps. Fast, secure, and purely client-side."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <ImageCompressorFaq />
        </section>
      </div>
    </main>
  )
}