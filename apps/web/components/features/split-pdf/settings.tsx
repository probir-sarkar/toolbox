"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSplitPdfStore, SplitMode } from "./store";

export function SplitSettings() {
  const file = useSplitPdfStore((state) => state.file);
  const splitMode = useSplitPdfStore((state) => state.splitMode);
  const setSplitMode = useSplitPdfStore((state) => state.setSplitMode);
  const pageRange = useSplitPdfStore((state) => state.pageRange);
  const setPageRange = useSplitPdfStore((state) => state.setPageRange);
  const pageCount = useSplitPdfStore((state) => state.pageCount);

  if (!file) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Split Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={splitMode} onValueChange={(val) => setSplitMode(val as SplitMode)} className="grid gap-4">
          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem value="extract" id="extract" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="extract" className="font-medium cursor-pointer">
                Extract pages
              </Label>
              <p className="text-sm text-muted-foreground">Create a new PDF containing only the selected pages.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem value="split-all" id="split-all" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="split-all" className="font-medium cursor-pointer">
                Split all pages
              </Label>
              <p className="text-sm text-muted-foreground">
                Save every page as a separate PDF file (downloaded as a ZIP).
              </p>
            </div>
          </div>
        </RadioGroup>

        {splitMode === "extract" && (
          <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
            <Label htmlFor="range">Page Range</Label>
            <Input
              id="range"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder={`e.g. 1-3, 5, 8-${Math.min(10, pageCount)}`}
            />
            <p className="text-xs text-muted-foreground">
              Enter page numbers and/or ranges separated by commas.
              <br />
              Total pages: <strong>{pageCount}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
