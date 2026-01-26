"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { FileText, Loader2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useImageToPdfStore, type PdfPageSize, type PdfOrientation } from "../image-to-pdf.store";

export function PdfInteractionPanel() {
  const { images, settings, updateSettings, isGenerating, setGenerating } = useImageToPdfStore();
  const [progress, setProgress] = useState(0);

  const handleConvert = async () => {
    if (images.length === 0) return;

    setGenerating(true);
    setProgress(0);

    try {
      // Wait a tick to let UI update
      await new Promise((r) => setTimeout(r, 100));

      const doc = new jsPDF({
        orientation: settings.orientation === "auto" ? "portrait" : settings.orientation,
        unit: "mm",
        format: settings.pageSize === "original" ? "a4" : settings.pageSize // Default to A4 if original for now
      });

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imgData = image.previewUrl;

        // Page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Margins
        const margin = settings.margin;
        const uploadableWidth = pageWidth - margin * 2;
        const uploadableHeight = pageHeight - margin * 2;

        // Image dimensions
        const imgWidth = image.width || 1;
        const imgHeight = image.height || 1;
        const imgRatio = imgWidth / imgHeight;

        let finalWidth = uploadableWidth;
        let finalHeight = uploadableWidth / imgRatio;

        if (finalHeight > uploadableHeight) {
          finalHeight = uploadableHeight;
          finalWidth = uploadableHeight * imgRatio;
        }

        // Centering
        const x = margin + (uploadableWidth - finalWidth) / 2;
        const y = margin + (uploadableHeight - finalHeight) / 2;

        if (i > 0) {
          doc.addPage();
        }

        // Load image
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          if (img.complete) resolve(true);
          else img.onload = () => resolve(true);
        });

        doc.addImage(img, "JPEG", x, y, finalWidth, finalHeight);

        setProgress(Math.round(((i + 1) / images.length) * 100));
      }

      doc.save(`${settings.filename || "document"}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed", error);
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Card className="h-fit sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          PDF Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="filename">Filename</Label>
          <div className="flex items-center gap-2">
            <Input
              id="filename"
              value={settings.filename}
              onChange={(e) => updateSettings({ filename: e.target.value })}
              placeholder="document"
            />
            <span className="text-sm text-muted-foreground">.pdf</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSize">Page Size</Label>
          <Select
            value={settings.pageSize}
            onValueChange={(v: PdfPageSize | null) => v && updateSettings({ pageSize: v })}
          >
            <SelectTrigger id="pageSize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
              <SelectItem value="letter">Letter (216 x 279 mm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="orientation">Orientation</Label>
          <Select
            value={settings.orientation}
            onValueChange={(v: PdfOrientation | null) => v && updateSettings({ orientation: v })}
          >
            <SelectTrigger id="orientation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto (Best Fit)</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Margin ({settings.margin} mm)</Label>
          </div>
          <Slider
            value={[settings.margin]}
            max={50}
            step={1}
            onValueChange={(v: number | readonly number[]) => {
              const val = Array.isArray(v) ? v[0] : v;
              updateSettings({ margin: val });
            }}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Button className="w-full" size="lg" onClick={handleConvert} disabled={images.length === 0 || isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting {progress}%
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Convert to PDF
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {images.length} image{images.length !== 1 && "s"} ready to process
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
