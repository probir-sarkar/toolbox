"use client";

import { Loader2, LucideIcon, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ActionCardProps {
    isProcessing: boolean;
    progress: number;
    onConvert: () => void;
    onDownload: () => void;
    canConvert: boolean;
    canDownload: boolean;
    isDownloading?: boolean;

    convertLabel?: string;
    downloadLabel?: string;
    statusMessage: React.ReactNode;

    // Style props
    className?: string; // For the outer card
    buttonClassName?: string; // For the buttons (text color, hover state)
    progressClassName?: string; // For the progress bar indicator
    statusTextClassName?: string; // For the minimal text at the bottom

    // Icons
    ConvertIcon?: LucideIcon;
    DownloadIcon?: LucideIcon;
}

export function ActionCard({
    isProcessing,
    progress,
    onConvert,
    onDownload,
    canConvert,
    canDownload,
    isDownloading = false,

    convertLabel = "Convert",
    downloadLabel = "Download",
    statusMessage,

    className,
    buttonClassName,
    progressClassName,
    statusTextClassName,

    ConvertIcon = Sparkles,
    DownloadIcon = Package,
}: ActionCardProps) {
    return (
        <Card className={cn("p-6 border-0 sticky top-8 text-white shadow-lg", className)}>
            {!isProcessing && canConvert && (
                <Button
                    onClick={onConvert}
                    disabled={!canConvert}
                    className={cn(
                        "w-full bg-white font-semibold h-12 mb-3 shadow-none border-0 transition-colors",
                        // Default fallback if no specific color class provided, though meant to be overridden
                        !buttonClassName && "text-slate-900",
                        buttonClassName
                    )}
                >
                    <ConvertIcon className="w-4 h-4 mr-2" />
                    {convertLabel}
                </Button>
            )}

            {isProcessing && (
                <div className="space-y-4 mb-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Converting...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className={cn("h-2", progressClassName)} />
                </div>
            )}

            {!isProcessing && canDownload && (
                <Button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className={cn(
                        "w-full bg-white font-semibold h-12 mb-3 shadow-none border-0",
                        buttonClassName
                    )}
                >
                    {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <DownloadIcon className="w-4 h-4 mr-2" />}
                    {downloadLabel}
                </Button>
            )}

            <p className={cn("text-xs text-center opacity-80", statusTextClassName)}>
                {statusMessage}
            </p>
        </Card>
    );
}
