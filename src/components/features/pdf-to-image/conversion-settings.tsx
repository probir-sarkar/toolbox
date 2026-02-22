"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePdfToImageStore } from "./store";

export function ConversionSettings() {
  const format = usePdfToImageStore((state) => state.format);
  const setFormat = usePdfToImageStore((state) => state.setFormat);
  const quality = usePdfToImageStore((state) => state.quality);
  const setQuality = usePdfToImageStore((state) => state.setQuality);
  const scale = usePdfToImageStore((state) => state.scale);
  const setScale = usePdfToImageStore((state) => state.setScale);
  const startPage = usePdfToImageStore((state) => state.startPage);
  const setStartPage = usePdfToImageStore((state) => state.setStartPage);
  const endPage = usePdfToImageStore((state) => state.endPage);
  const setEndPage = usePdfToImageStore((state) => state.setEndPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format */}
        <div className="space-y-2">
          <Label>Output Format</Label>
          <Select
            value={format}
            onValueChange={(v) => setFormat(v as "png" | "jpeg")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG (Lossless)</SelectItem>
              <SelectItem value="jpeg">JPEG (Smaller)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quality (JPEG only) */}
        {format === "jpeg" && (
          <div className="space-y-2">
            <div className="flex justify-between mb-4">
              <Label>Quality</Label>
              <span className="text-sm text-muted-foreground">{quality}%</span>
            </div>
            <Slider
              min={50}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(vals) => {
                const val = Array.isArray(vals) ? vals[0] : vals;
                setQuality(val);
              }}
              className="w-full"
            />
          </div>
        )}

        {/* Scale */}
        <div className="space-y-2">
          <Label>Resolution / Scale</Label>
            <Select
            value={String(scale)}
            onValueChange={(v) => v && setScale(Number.parseFloat(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Standard (1x)</SelectItem>
              <SelectItem value="1.5">High (1.5x)</SelectItem>
              <SelectItem value="2">Very High (2x)</SelectItem>
              <SelectItem value="3">Ultra (3x)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Higher scale means sharper text but larger files.
          </p>
        </div>

        {/* Pages */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Page</Label>
            <Input
              type="number"
              min={1}
              value={startPage}
              onChange={(e) => setStartPage(Math.max(1, Number.parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="space-y-2">
            <Label>End Page</Label>
            <Input
              type="number"
              min={1}
              placeholder="All"
              value={endPage ?? ""}
              onChange={(e) =>
                setEndPage(e.target.value ? Number.parseInt(e.target.value) : null)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
