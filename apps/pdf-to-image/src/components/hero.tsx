import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Private PDF to Image converter, right in your browser
        </h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground md:text-base">
          Convert PDF pages to high-quality images with no uploads. Works offline, fast, and free. Trusted by
          privacy-conscious teams and individuals.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="#converter">Convert a PDF</a>
          </Button>
          <Button asChild variant="outline" className="hidden md:block">
            <a href="#how-it-works" aria-label="Learn how conversion works">
              Learn how it works
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
