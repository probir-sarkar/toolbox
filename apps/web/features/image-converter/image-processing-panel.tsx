"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader, AlertCircle } from "lucide-react";
import { useImageConverterStore } from "./image-converter.store";

export function ImageProcessingPanel() {
  const files = useImageConverterStore((state) => state.files);

  const completedCount = files.filter((f) => f.status === "completed").length;
  const processingCount = files.filter((f) => f.status === "processing").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const totalCount = files.length;

  const overallProgress = (completedCount / totalCount) * 100;

  return (
    <Card className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 sticky top-8">
      <div className="flex items-start gap-4">
        <Loader className="w-6 h-6 text-green-600 mt-1 animate-spin" />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-2">Converting images</h3>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm text-slate-500">
                  {completedCount} of {totalCount} converted
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
            {errorCount > 0 && (
              <p className="text-xs text-red-600">{errorCount} file(s) failed to convert</p>
            )}
            {processingCount > 0 && (
              <p className="text-xs text-slate-600">Processing {processingCount} file(s)...</p>
            )}
          </div>
        </div>
      </div>

      {/* Processing Items */}
      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {files.slice(0, 5).map((file) => (
          <div key={file.id} className="flex items-center gap-2 text-sm bg-white p-2 rounded">
            {file.status === "processing" && (
              <Loader className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            )}
            {file.status === "completed" && (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            )}
            {file.status === "error" && (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            {file.status === "pending" && (
              <Loader className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span className="text-slate-700 truncate flex-1">{file.file.name}</span>
            {file.status === "processing" && file.progress !== undefined && (
              <span className="text-xs text-slate-500">{file.progress}%</span>
            )}
          </div>
        ))}
        {files.length > 5 && <p className="text-xs text-slate-500 p-2">+{files.length - 5} more...</p>}
      </div>
    </Card>
  );
}
