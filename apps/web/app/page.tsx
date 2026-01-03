import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Image as ImageIcon, Sparkles, MoveRight, Layers, Hammer, Palette, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const tools = [
    {
      title: "PDF to Image",
      description: "Convert PDF pages to high-quality images securely in your browser.",
      icon: <FileText className="w-8 h-8 text-white" />,
      href: "/pdf-to-image",
      color: "from-primary to-teal-400",
      active: true,
      badge: "Popular"
    },
    {
      title: "Image Converter",
      description: "Batch convert and optimize images with zero quality loss.",
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      href: "/image-converter",
      color: "from-blue-500 to-cyan-500",
      active: true,
      badge: "New"
    },
    {
      title: "PDF Suite",
      description: "Comprehensive PDF tools including merge, split, and edit.",
      icon: <Hammer className="w-8 h-8 text-white" />,
      href: "/pdf-tools",
      color: "from-slate-700 to-slate-900",
      active: false,
      badge: null
    },
    {
      title: "Image Studio",
      description: "Advanced image manipulation and AI enhancement tools.",
      icon: <Palette className="w-8 h-8 text-white" />,
      href: "/image-tools",
      color: "from-purple-500 to-indigo-600",
      active: false,
      badge: null
    }
  ];

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
            A privacy-focused collection of free, powerful utilities.
            Process files locally in your browser with zero upload wait times.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
              className="group block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-50"></div>
              <Card className="relative h-full overflow-hidden bg-card border-border/50 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6">

                {tool.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-medium border-0 shadow-sm z-10">
                    {tool.badge}
                  </Badge>
                )}
                {!tool.active && (
                  <Badge variant="secondary" className="absolute top-4 right-4 bg-muted text-muted-foreground font-medium z-10">
                    Coming Soon
                  </Badge>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className={`flex items-center font-semibold text-sm ${tool.active ? 'text-primary' : 'text-muted-foreground'} mt-auto`}>
                  {tool.active ? 'Open Tool' : 'Notify Me'}
                  <MoveRight className={`ml-2 w-4 h-4 transition-transform ${tool.active ? 'group-hover:translate-x-1' : ''}`} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}