
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { usePdfToImageContext } from "../context";

export function ConversionSettings() {
  const { settings, updateSettings } = usePdfToImageContext();

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
            value={settings.format}
            onValueChange={(v) => updateSettings({ format: v as "png" | "jpeg" })}
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
        {settings.format === "jpeg" && (
          <div className="space-y-2">
            <div className="flex justify-between mb-4">
              <Label>Quality</Label>
              <span className="text-sm text-muted-foreground">{settings.quality}%</span>
            </div>
            <Slider
              min={50}
              max={100}
              step={1}
              value={[settings.quality]}
              onValueChange={(vals) => {
                const val = Array.isArray(vals) ? vals[0] : vals;
                updateSettings({ quality: val });
              }}
              className="w-full"
            />
          </div>
        )}

        {/* Scale */}
        <div className="space-y-2">
          <Label>Resolution / Scale</Label>
            <Select
            value={String(settings.scale)}
            onValueChange={(v) => v && updateSettings({ scale: Number.parseFloat(v) })}
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
              value={settings.startPage}
              onChange={(e) => updateSettings({ startPage: Math.max(1, Number.parseInt(e.target.value) || 1) })}
            />
          </div>
          <div className="space-y-2">
            <Label>End Page</Label>
            <Input
              type="number"
              min={1}
              placeholder="All"
              value={settings.endPage ?? ""}
              onChange={(e) =>
                updateSettings({ endPage: e.target.value ? Number.parseInt(e.target.value) : null })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
