import { createFileRoute } from '@tanstack/react-router'
import { ImageToPdf } from "@/features/image-to-pdf/image-to-pdf"
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { FAQSection } from "@/components/common/faq-section"

const imageToPdfFaqItems = [
  {
    question: "Is it safe? Are my images uploaded?",
    answer: "Yes, it is 100% safe. Your images are processed entirely within your browser. They are never uploaded to any server, ensuring complete privacy."
  },
  {
    question: "What image formats are supported?",
    answer: "We support common image formats including JPG, PNG, and WebP."
  },
  {
    question: "Can I reorder the pages?",
    answer: "Yes! Once you upload your images, you can simply drag and drop them to arrange the order of pages in your PDF."
  },
  {
    question: "Does it limit the number of images?",
    answer: "There is no hard limit on the number of images. However, processing a very large number of high-resolution images might be limited by your device's memory."
  }
];

export const Route = createFileRoute('/image-to-pdf')({
  component: ImageToPdfPage,
  head: () => ({
    meta: [
      {
        title: "Image to PDF Converter - Convert Images to PDF Free | Toolbox",
      },
      {
        name: "description",
        content: "Convert images (JPG, PNG, WebP) to PDF documents. Sortable pages, custom settings, 100% offline. Free and secure image to PDF converter.",
      },
      {
        property: "og:title",
        content: "Image to PDF Converter - Free",
      },
      {
        property: "og:description",
        content: "Convert images to PDF documents. Custom settings, 100% offline.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/image-to-pdf"
      }
    ]
  }),
})

function ImageToPdfPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Image to PDF Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Turn your images into a single PDF document. Sortable pages, custom settings, and 100% offline.
            </p>
          </div>
          <TrustBar />
        </div>

        <div className="mb-24">
          <ImageToPdf />
        </div>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Upload Images",
                description: "Drag & drop your images. We support JPG, PNG, and WebP."
              },
              {
                title: "Arrange Pages",
                description: "Drag images to reorder them. This order will be used in the PDF."
              },
              {
                title: "Download PDF",
                description: "Customize settings like page size and orientation, then download."
              }
            ]}
            description="Create professional PDFs from your images in seconds."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <FAQSection items={imageToPdfFaqItems} title="Frequently Asked Questions" />
        </section>
      </div>
    </main>
  )
}
