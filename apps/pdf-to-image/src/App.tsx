import { Suspense } from "react";
import { Github } from "lucide-react";
import PdfToImage from "@/components/pdf-to-image";
import { Button } from "@/components/ui/button";
import { TrustBar } from "@/components/trust-bar";
import { HowItWorks } from "@/components/how-it-works";
import { FAQ } from "@/components/faq";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight">
                Open PDF → Image
              </span>
              <span className="sr-only">Home</span>
            </a>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden md:block">
                <a href="#how-it-works">How it works</a>
              </Button>
              <Button asChild variant="default">
                <a
                  href="https://github.com/probir-sarkar/pdf-to-image"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub repository"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section id="converter" className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 text-center space-y-4">
          <h2 className="text-balance text-4xl font-semibold tracking-tight">
            Convert your PDF
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Convert PDF pages to high-quality images with no uploads. Works
            offline, fast, and free. Trusted by privacy-conscious teams and
            individuals.
          </p>
          <TrustBar className="  mx-auto" />
        </div>
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading…</div>
          }
        >
          <PdfToImage />
        </Suspense>
      </section>

      <section id="how-it-works" className="mx-auto max-w-5xl px-4 pb-8">
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <FAQ />
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
          <p className="text-pretty">
            Built for privacy. 100% offline, no tracking, MIT Licensed.{" "}
            <a
              className="underline hover:text-foreground"
              href="https://github.com/probir-sarkar/pdf-to-image"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
