"use client";

import { useState, useMemo } from "react";
import { Search, FileText, Image as ImageIcon, Hammer, Palette, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ALL_TOOLS = [
  {
    title: "PDF to Image",
    description: "Convert PDF pages to high-quality images.",
    icon: FileText,
    href: "/pdf-to-image",
    color: "bg-orange-500/10 text-orange-600",
    tags: ["PDF", "Image", "Popular"],
    active: true
  },
  {
    title: "Image to PDF",
    description: "Convert images to a single PDF document.",
    icon: FileText,
    href: "/image-to-pdf",
    color: "bg-red-500/10 text-red-600",
    tags: ["Image", "PDF", "Top"],
    active: true
  },
  {
    title: "Image Converter",
    description: "Batch convert image formats freely.",
    icon: ImageIcon,
    href: "/image-converter",
    color: "bg-blue-500/10 text-blue-600",
    tags: ["Image", "Optimization", "New"],
    active: true
  },
  {
    title: "PDF Suite",
    description: "Merge, split, and edit PDF documents.",
    icon: Hammer,
    href: "/pdf-tools",
    color: "bg-slate-500/10 text-slate-600",
    tags: ["PDF", "Utils"],
    active: false
  },
  {
    title: "Image Studio",
    description: "Advanced image manipulation tools.",
    icon: Palette,
    href: "/image-tools",
    color: "bg-purple-500/10 text-purple-600",
    tags: ["Image", "AI", "Editor"],
    active: false
  }
];

const FILTERS = ["All", "PDF", "Image", "Popular", "New"];

export function ToolsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = activeFilter === "All" || tool.tags.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <section className="container mx-auto px-6 pb-24">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            className="pl-9 bg-muted/50 border-input/50 focus:bg-background transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className={cn("group block outline-none", !tool.active && "pointer-events-none opacity-80")}
          >
            <Card className="h-full bg-card hover:bg-accent/5 transition-all duration-300 border-border/40 hover:border-border/80 p-4 flex flex-col gap-4 group-hover:-translate-y-1 group-hover:shadow-lg group-focus:ring-2 ring-primary/20">
              <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl transition-colors", tool.color)}>
                  <tool.icon className="w-5 h-5" />
                </div>
                {!tool.active && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-5 border-muted-foreground/30 text-muted-foreground"
                  >
                    Soon
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 flex items-center gap-2">
                  {tool.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{tool.description}</p>
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {tool.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-5 bg-muted/50 text-muted-foreground hover:bg-muted font-normal"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <Search className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </section>
  );
}
