"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader } from "lucide-react";
import { useImageConverterStore } from "./image-converter.store";

export function ImageProcessingPanel() {
  const filesCount = useImageConverterStore((state) => state.files.length);
  return (
    <Card className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 sticky top-8">
      <div className="flex items-start gap-4">
        <Loader className="w-6 h-6 text-green-600 mt-1 animate-spin" />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-2">Converting images</h3>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Processing</span>
                <span className="text-sm text-slate-500">2 of {filesCount}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-500"
                  style={{ width: `${(2 / filesCount) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-600">Estimated time: 12 seconds</p>
          </div>
        </div>
      </div>

      {/* Processing Items */}
      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {Array.from({ length: Math.min(filesCount, 5) }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 text-sm bg-white p-2 rounded">
            {i < 2 ? (
              <Loader className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            )}
            <span className="text-slate-700 truncate">image-{i + 1}.jpg</span>
          </div>
        ))}
        {filesCount > 5 && <p className="text-xs text-slate-500 p-2">+{filesCount - 5} more...</p>}
      </div>
    </Card>
  );
}
