import { createFileRoute } from '@tanstack/react-router'
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { FAQSection } from "@/components/common/faq-section"
import { ImageResize } from "@/features/image-resize/image-resize"

const imageResizeFaqItems = [
  {
    question: "Will I lose image quality when resizing?",
    answer: "Resizing to larger dimensions may reduce quality, but our tool uses high-quality algorithms to minimize degradation. When resizing to smaller dimensions, quality loss is minimal. You can control the output quality using the quality slider."
  },
  {
    question: "What formats are supported?",
    answer: "We support all major image formats including JPG, PNG, WebP, GIF, BMP, and more. You can also convert between formats during the resize process."
  },
  {
    question: "Can I batch resize multiple images?",
    answer: "Yes! You can upload multiple images and they will all be resized to the same dimensions. Each image will be downloaded individually after processing."
  },
  {
    question: "What does 'maintain aspect ratio' mean?",
    answer: "When enabled, the tool will automatically calculate the height or width to preserve the original proportions of your image. This prevents distortion and stretching. For example, a 1920×1080 image resized to 1280px wide will automatically become 1280×720."
  }
];

export const Route = createFileRoute('/image-resize')({
  component: ImageResizePage,
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

        <ImageResize />

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
          <FAQSection items={imageResizeFaqItems} title="Frequently Asked Questions" />
        </section>
      </div>
    </main>
  )
}