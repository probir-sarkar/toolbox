import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useSplitPdfContext } from "../context";
import type { SplitMode } from "../types";
import { Info } from "lucide-react";

export function SplitSettings() {
  const { fileData, settings, updateSettings, selectedPages } = useSplitPdfContext();

  if (!fileData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Split Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={settings.splitMode}
          onValueChange={(val) => updateSettings({ splitMode: val as SplitMode })}
          className="grid gap-4"
        >
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

        {settings.splitMode === "extract" && (
          <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
            <Label htmlFor="range">Page Range</Label>
            <Input
              id="range"
              value={settings.pageRange}
              readOnly
              placeholder={`e.g. 1-3, 5, 8-${Math.min(10, fileData.pageCount)}`}
              className="bg-muted/50"
            />
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3 mt-0.5 shrink-0" />
              <p>
                Auto-generated from selected pages.
                Total pages: <strong>{fileData.pageCount}</strong> • Selected: <strong>{selectedPages.length}</strong>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
