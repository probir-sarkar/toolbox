import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useSplitPdfContext } from "../context";
import type { SplitMode } from "../types";

export function SplitSettings() {
  const { fileData, settings, updateSettings } = useSplitPdfContext();

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
              onChange={(e) => updateSettings({ pageRange: e.target.value })}
              placeholder={`e.g. 1-3, 5, 8-${Math.min(10, fileData.pageCount)}`}
            />
            <p className="text-xs text-muted-foreground">
              Enter page numbers and/or ranges separated by commas.
              <br />
              Total pages: <strong>{fileData.pageCount}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
