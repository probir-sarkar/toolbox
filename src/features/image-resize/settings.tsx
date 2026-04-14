import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useImageResizeStore } from "./store";

export function ImageResizeSettings() {
  const settings = useImageResizeStore((state) => state.settings);
  const updateSettings = useImageResizeStore((state) => state.updateSettings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resize Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
            <Switch
              id="aspect-ratio"
              checked={settings.maintainAspectRatio}
              onCheckedChange={(checked) => updateSettings({ maintainAspectRatio: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={settings.unit} onValueChange={(value: any) => updateSettings({ unit: value })}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="px">Pixels (px)</SelectItem>
                <SelectItem value="%">Percentage (%)</SelectItem>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="in">Inches (in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={settings.width}
              onChange={(e) => updateSettings({ width: parseInt(e.target.value) || 0 })}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={settings.height}
              onChange={(e) => updateSettings({ height: parseInt(e.target.value) || 0 })}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Quality: {Math.round(settings.quality * 100)}%</Label>
            <Slider
              id="quality"
              defaultValue={[settings.quality * 100]}
              onValueChange={(value) => updateSettings({ quality: ((Array.isArray(value) ? value[0] : value) ?? 0) / 100 })}
              min={1}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Output Format</Label>
            <Select value={settings.outputFormat} onValueChange={(value: any) => updateSettings({ outputFormat: value })}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original Format</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}