
import { cn } from "@/lib/utils";

interface ActionCardSkeletonProps {
  variant?: "default" | "card";
  className?: string;
}

export function ActionCardSkeleton({ variant = "default", className }: ActionCardSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="p-6 pt-0 flex-1 space-y-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="flex items-center p-6 pt-0">
          <div className="h-12 w-full bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Default gradient variant
  return (
    <div
      className={cn(
        "p-6 rounded-lg shadow-lg animate-pulse bg-gradient-to-br from-muted to-muted/50",
        className
      )}
    >
      <div className="space-y-4">
        <div className="h-12 w-full bg-background/50 rounded"></div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-background/50 rounded"></div>
            <div className="h-4 w-8 bg-background/50 rounded"></div>
          </div>
          <div className="h-2 w-full bg-background/30 rounded"></div>
        </div>
        <div className="h-12 w-full bg-background/50 rounded"></div>
        <div className="h-3 w-3/4 mx-auto bg-background/30 rounded"></div>
      </div>
    </div>
  );
}
