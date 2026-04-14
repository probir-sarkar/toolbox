import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { TrustBar } from "@/components/common/trust-bar"
import { HowItWorks } from "@/components/common/how-it-works"
import { QRGenerator, QRGeneratorFaq } from "@/features/qr-generator/qr-generator"

const QRGeneratorComponent = lazy(() => import("@/features/qr-generator/qr-generator").then(mod => ({ default: mod.QRGenerator })))

export const Route = createFileRoute('/qr-generator')({
  component: QRGeneratorPage,
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "QR Code Generator - Create Custom QR Codes Free | Toolbox",
      },
      {
        name: "description",
        content: "Generate custom QR codes for URLs, text, WiFi, and contacts. Customizable colors, sizes, and error correction. 100% free, private, and works offline.",
      },
      {
        property: "og:title",
        content: "QR Code Generator - Free Online",
      },
      {
        property: "og:description",
        content: "Generate custom QR codes. 100% free and works offline.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/qr-generator"
      }
    ]
  }),
})

function QRGeneratorPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              QR Code Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Create custom QR codes for URLs, text, WiFi credentials, and contact information. Customize colors, sizes, and error correction levels. 100% free and private.
            </p>
          </div>
          <TrustBar />
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-32">Loading...</div>}>
          <QRGenerator />
        </Suspense>

        <section className="mb-24">
          <HowItWorks
            steps={[
              {
                title: "Choose Content Type",
                description: "Select URL, text, WiFi, or contact information for your QR code."
              },
              {
                title: "Customize Appearance",
                description: "Set the size, colors, and error correction level for your needs."
              },
              {
                title: "Generate & Download",
                description: "Click generate to create your QR code, then download it in high quality."
              }
            ]}
            description="Create professional QR codes in three simple steps. Fast, secure, and purely client-side."
          />
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <QRGeneratorFaq />
        </section>
      </div>
    </main>
  )
}