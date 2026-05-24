
import { cn } from "@/lib/utils";

interface SettingsSkeletonProps {
  className?: string;
}

export function SettingsSkeleton({ className }: SettingsSkeletonProps) {
  return (
    <div className={cn("space-y-6 p-6 border rounded-lg", className)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
          <div className="h-2 w-full bg-muted rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
