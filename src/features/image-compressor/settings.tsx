import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useImageCompressorStore } from "./store";

export function ImageCompressorSettings() {
  const settings = useImageCompressorStore((state) => state.settings);
  const updateSettings = useImageCompressorStore((state) => state.updateSettings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compression Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quality">Quality: {Math.round(settings.quality * 100)}%</Label>
            <Slider
              id="quality"
              defaultValue={[settings.quality * 100]}
              onValueChange={(value) => updateSettings({ quality: (value[0] ?? 0) / 100 })}
              min={1}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Lower quality = smaller file size but reduced image quality
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Output Format</Label>
            <Select value={settings.outputFormat} onValueChange={(value: any) => updateSettings({ outputFormat: value })}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original Format</SelectItem>
                <SelectItem value="jpeg">JPEG (Best compression)</SelectItem>
                <SelectItem value="webp">WebP (Modern format)</SelectItem>
                <SelectItem value="png">PNG (Lossless)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxWidth">Max Width (optional)</Label>
            <Input
              id="maxWidth"
              type="number"
              value={settings.maxWidth || ''}
              onChange={(e) => updateSettings({ maxWidth: parseInt(e.target.value) || undefined })}
              min={1}
              placeholder="No limit"
            />
            <p className="text-xs text-muted-foreground">
              Resize larger images to reduce file size further
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxHeight">Max Height (optional)</Label>
            <Input
              id="maxHeight"
              type="number"
              value={settings.maxHeight || ''}
              onChange={(e) => updateSettings({ maxHeight: parseInt(e.target.value) || undefined })}
              min={1}
              placeholder="No limit"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetSize">Target Size (KB) - optional</Label>
            <Input
              id="targetSize"
              type="number"
              value={settings.targetSize || ''}
              onChange={(e) => updateSettings({ targetSize: parseInt(e.target.value) || undefined })}
              min={1}
              placeholder="Auto compression"
            />
            <p className="text-xs text-muted-foreground">
              Automatically adjust quality to meet target file size
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}