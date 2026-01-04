"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ALL_TOOLS } from "@/config/tools";

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
    <section className="container mx-auto px-6 pb-24 relative z-10">
      {/* Controls */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center bg-muted/40 border border-border/50 rounded-full px-5 h-12 shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:border-primary transition-all">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search for tools..."
            className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border/50 hover:bg-muted"
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
            className={cn("group block outline-none", tool.disabled && "pointer-events-none opacity-80")}
          >
            <Card className="h-full bg-card hover:bg-accent/5 transition-all duration-300 border-border/40 hover:border-border/80 p-4 flex flex-col gap-4 group-hover:-translate-y-1 group-hover:shadow-lg group-focus:ring-2 ring-primary/20">
              <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl transition-colors", tool.color)}>
                  <tool.icon className="w-5 h-5" />
                </div>
                {tool.disabled && (
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
