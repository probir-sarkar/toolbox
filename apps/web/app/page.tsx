import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { ToolsSection } from "@/components/home/tools-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10 selection:text-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[50%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <ToolsSection />
    </div>
  );
}
