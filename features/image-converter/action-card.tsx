"use client";

import { ActionCard as ReusableActionCard } from "@/components/common/action-card";
import { Sparkles } from "lucide-react";
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
        <ReusableActionCard
            isProcessing={isProcessing}
            progress={overallProgress}
            onConvert={handleConvert}
            onDownload={handleDownloadZip}
            canConvert={!isProcessing && hasPending}
            canDownload={hasCompleted && !isProcessing}
            isDownloading={isDownloadingZip}
            convertLabel="Convert Images"
            downloadLabel="Download All (ZIP)"
            statusMessage={
                hasCompleted && !hasPending
                    ? "Ready to download"
                    : "Ready to convert"
            }
            className="bg-linear-to-br from-blue-600 to-cyan-700"
            buttonClassName="text-blue-600 hover:bg-blue-50"
            progressClassName="bg-blue-800"
            statusTextClassName="text-blue-100"
            ConvertIcon={Sparkles}
        />
    );
}
