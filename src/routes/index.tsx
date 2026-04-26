import { createFileRoute } from '@tanstack/react-router'
import { Sparkles, ExternalLink } from "lucide-react"
import { ToolsSection } from "@/components/home/tools-section"

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Toolbox - Free Online Tools for PDF, Images & Password Generation",
      },
      {
        name: "description",
        content: "Free, privacy-focused online tools. Merge, split, and convert PDFs. Convert, resize, and optimize images. Generate secure passwords. 100% offline, no uploads.",
      },
      {
        property: "og:title",
        content: "Toolbox - Free Online Tools",
      },
      {
        property: "og:description",
        content: "Free, privacy-focused online tools. Process files locally in your browser with zero uploads.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://toolbox.com/"
      }
    ]
  }),
})

function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10 selection:text-primary relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[50%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-6 md:pt-32 md:pb-8 px-6">
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Toolbox v1.0 is live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
            Supercharge your <br className="hidden md:block" /> workflow today.
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            A privacy-focused collection of free, powerful utilities. Process files locally in your browser with zero
            upload wait times.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <ToolsSection />

      {/* Recommended Partner Section */}
      <section className="max-w-4xl mx-auto mt-16 mb-8 px-4">
        <div className="relative bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8 border border-primary/20">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium w-fit">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                Recommended Partner
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Quiz Zone - Master Your Knowledge
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Explore thousands of curated quizzes across diverse topics. Challenge yourself with <span className="font-semibold text-foreground">new quizzes added daily</span> across <span className="font-semibold text-foreground">all categories</span>. Track your journey to mastery.
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Free Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>All Skill Levels</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Daily Updates</span>
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <a
                href="https://quizzy.probir.dev/"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg text-sm md:text-base"
              >
                Explore Quizzes
                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}