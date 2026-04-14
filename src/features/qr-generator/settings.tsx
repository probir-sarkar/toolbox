import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQRGeneratorStore } from "./store";

export function QRGeneratorSettings() {
  const settings = useQRGeneratorStore((state) => state.settings);
  const updateSettings = useQRGeneratorStore((state) => state.updateSettings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="size">Size: {settings.size}px</Label>
            <Slider
              id="size"
              defaultValue={[settings.size]}
              onValueChange={(value) => updateSettings({ size: (Array.isArray(value) ? value[0] : value) ?? 300 })}
              min={200}
              max={600}
              step={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">QR Code Color</Label>
            <Select
              value={settings.color}
              onValueChange={(value: any) => updateSettings({ color: value })}
            >
              <SelectTrigger id="color">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.color === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="customColor">Custom Color</Label>
              <div className="flex gap-2">
                <Input
                  id="customColor"
                  type="color"
                  value={settings.customColor || '#000000'}
                  onChange={(e) => updateSettings({ customColor: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={settings.customColor || '#000000'}
                  onChange={(e) => updateSettings({ customColor: e.target.value })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bgColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="bgColor"
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="error">Error Correction Level</Label>
            <Select
              value={settings.errorCorrectionLevel}
              onValueChange={(value: any) => updateSettings({ errorCorrectionLevel: value })}
            >
              <SelectTrigger id="error">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Higher error correction allows QR codes to be read even if damaged.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}