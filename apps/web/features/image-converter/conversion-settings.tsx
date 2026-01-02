"use client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { FORMATS, ImageFormat, useImageConverterStore } from "./image-converter.store";

export function ImageConversionSettings() {
  const quality = useImageConverterStore((state) => state.quality);
  const selectedFormat = useImageConverterStore((state) => state.selectedFormat);
  const autoOptimize = useImageConverterStore((state) => state.autoOptimize);
  const removeMetadata = useImageConverterStore((state) => state.removeMetadata);
  const setQuality = useImageConverterStore((state) => state.setQuality);
  const setFormat = useImageConverterStore((state) => state.setFormat);
  const setAutoOptimize = useImageConverterStore((state) => state.setAutoOptimize);
  const setRemoveMetadata = useImageConverterStore((state) => state.setRemoveMetadata);
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border border-slate-200 space-y-6">
      {/* Format Selection */}
      <div>
        <Label className="text-slate-900 font-semibold mb-4 block">Output Format</Label>
        <RadioGroup value={selectedFormat} onValueChange={(format) => setFormat(format as ImageFormat)}>
          <div className="space-y-3">
            {FORMATS.map((format) => (
              <div
                key={format.value}
                className="flex items-center p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <RadioGroupItem value={format.value} id={format.value} />
                <Label htmlFor={format.value} className="flex-1 ml-3 cursor-pointer">
                  <div className="font-medium text-slate-900">{format.label}</div>
                  <div className="text-xs text-slate-500">{format.desc}</div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Quality Slider */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-slate-900 font-semibold">Quality</Label>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{quality}%</span>
        </div>
        <Slider
          value={[quality]}
          onValueChange={(val) => setQuality(Array.isArray(val) ? val[0] : val)}
          max={100}
          min={1}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-slate-500 mt-3">Lower quality = smaller file size. Recommended: 75-85%</p>
      </div>

      {/* Options */}
      <div className="pt-6 border-t border-slate-200">
        <div className="space-y-3">
          <label className="flex items-center p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={autoOptimize}
              onChange={(e) => setAutoOptimize(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="ml-3 text-sm font-medium text-slate-900">Auto-optimize</span>
          </label>
          <label className="flex items-center p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={removeMetadata}
              onChange={(e) => setRemoveMetadata(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="ml-3 text-sm font-medium text-slate-900">Remove metadata</span>
          </label>
        </div>
      </div>
    </Card>
  );
}
