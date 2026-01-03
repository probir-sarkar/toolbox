"use client";

import { Download, Package, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useImageConverterStore } from "./image-converter.store";
import { convertImages, type ConversionOptions, createZipArchive } from "./utils/image-converter";
import { useState } from "react";

export function ActionCard() {
    const files = useImageConverterStore((state) => state.files);
    const isProcessing = useImageConverterStore((state) => state.isProcessing);
    const setIsProcessing = useImageConverterStore((state) => state.setIsProcessing);
    const updateFileStatus = useImageConverterStore((state) => state.updateFileStatus);
    const updateFileResult = useImageConverterStore((state) => state.updateFileResult);

    const selectedFormat = useImageConverterStore((state) => state.selectedFormat);
    const quality = useImageConverterStore((state) => state.quality);
    const autoOptimize = useImageConverterStore((state) => state.autoOptimize);
    const removeMetadata = useImageConverterStore((state) => state.removeMetadata);

    const [overallProgress, setOverallProgress] = useState(0);
    const [isDownloadingZip, setIsDownloadingZip] = useState(false);

    const handleConvert = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setOverallProgress(0);

        const options: ConversionOptions = {
            format: selectedFormat,
            quality,
            autoOptimize,
            removeMetadata
        };

        try {
            const pendingFiles = files.filter(f => f.status !== "completed");
            const total = pendingFiles.length;
            let completed = 0;

            // Process sequentially to avoid freezing UI too much
            for (const fileData of pendingFiles) {
                updateFileStatus(fileData.id, "processing", 0);

                try {
                    const result = await convertImages([fileData.file], options, (_idx, progress) => {
                        // Individual file progress could serve interesting UI if we wanted
                    });

                    if (result[0]) {
                        updateFileResult(fileData.id, result[0]);
                        updateFileStatus(fileData.id, "completed", 100);
                    }
                } catch (error) {
                    console.error(`Error converting ${fileData.file.name}:`, error);
                    updateFileStatus(fileData.id, "error");
                }

                completed++;
                setOverallProgress(Math.round((completed / total) * 100));
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownloadZip = async () => {
        const completedFiles = files.filter((f) => f.status === "completed" && f.result);
        if (completedFiles.length === 0) return;

        setIsDownloadingZip(true);
        try {
            await createZipArchive(
                completedFiles.map((f) => ({
                    originalFile: f.file,
                    compressedFile: f.result!.compressedFile,
                    originalSize: f.result!.originalSize,
                    compressedSize: f.result!.compressedSize,
                    savings: f.result!.savings,
                    savingsPercent: f.result!.savingsPercent
                }))
            );
        } catch (error) {
            console.error("Error creating ZIP:", error);
        } finally {
            setIsDownloadingZip(false);
        }
    };

    const hasCompleted = files.some(f => f.status === "completed");
    const hasPending = files.some(f => f.status !== "completed");

    if (files.length === 0) return null;

    return (
        <Card className="p-6 bg-linear-to-br from-blue-600 to-cyan-700 border-0 sticky top-8 text-white">
            {!isProcessing && hasPending && (
                <Button
                    onClick={handleConvert}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold h-12 mb-3 shadow-none border-0"
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Convert Images
                </Button>
            )}

            {isProcessing && (
                <div className="space-y-4 mb-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Converting...</span>
                        <span>{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-2 bg-blue-800" />
                </div>
            )}

            {hasCompleted && !isProcessing && (
                <>
                    {!hasPending && (
                        <div className="text-center mb-4 text-blue-100 text-sm">
                            All conversions complete!
                        </div>
                    )}
                    <Button
                        onClick={handleDownloadZip}
                        disabled={isDownloadingZip}
                        className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold h-12 mb-3 shadow-none border-0"
                    >
                        {isDownloadingZip ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Package className="w-4 h-4 mr-2" />}
                        Download All (ZIP)
                    </Button>
                </>
            )}

            <p className="text-xs text-blue-100 text-center opacity-80">
                {hasCompleted && !hasPending
                    ? "Ready to download"
                    : files.length > 0
                        ? "Ready to convert"
                        : "Add images to start"}
            </p>
        </Card>
    );
}
