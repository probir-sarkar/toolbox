import { createFileRoute } from '@tanstack/react-router'
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { FAQSection } from "@/components/common/faq-section"
import { ImageCompressor } from "@/features/image-compressor/image-compressor"

const imageCompressorFaqItems = [
  {
    question: "How much can I reduce the file size?",
    answer: "The compression ratio depends on the image content and quality settings. Typically, you can reduce file sizes by 50-80% with minimal visible quality loss. Photos with lots of detail compress better than simple graphics."
  },
  {
    question: "Will compression affect image quality?",
    answer: "There's always a trade-off between file size and quality. Our tool uses high-quality compression algorithms to minimize quality loss. You can preview the compression ratio and adjust quality settings to find the right balance."
  },
  {
    question: "What format should I choose?",
    answer: "JPEG offers the best compression for photos. WebP provides even better compression with good quality but may not be supported by older browsers. PNG is lossless but results in larger files. Choose based on your use case."
  },
  {
    question: "Can I batch compress multiple images?",
    answer: "Yes! Upload multiple images and they'll all be compressed using the same settings. Each image will be downloaded individually after compression."
  }
];

export const Route = createFileRoute('/image-compressor')({
  component: ImageCompressorPage,
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

        <ImageCompressor />

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
          <FAQSection items={imageCompressorFaqItems} title="Frequently Asked Questions" />
        </section>
      </div>
    </main>
  )
}