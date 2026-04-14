import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Link, Wifi, User, Type } from "lucide-react";
import { useQRGeneratorStore } from "./store";

export function QRGeneratorInput() {
  const contentType = useQRGeneratorStore((state) => state.contentType);
  const content = useQRGeneratorStore((state) => state.content);
  const wifiConfig = useQRGeneratorStore((state) => state.wifiConfig);
  const vcardConfig = useQRGeneratorStore((state) => state.vcardConfig);
  const setContentType = useQRGeneratorStore((state) => state.setContentType);
  const setContent = useQRGeneratorStore((state) => state.setContent);
  const setWifiConfig = useQRGeneratorStore((state) => state.setWifiConfig);
  const setVcardConfig = useQRGeneratorStore((state) => state.setVcardConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={contentType} onValueChange={(value: any) => setContentType(value)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="wifi">WiFi</TabsTrigger>
            <TabsTrigger value="vcard">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-5 h-5 text-primary" />
              <Label htmlFor="url">Website URL</Label>
            </div>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Enter any website URL. We'll automatically add https:// if needed.
            </p>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <Label htmlFor="text">Text Content</Label>
            </div>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Any text you want to encode in the QR code.
            </p>
          </TabsContent>

          <TabsContent value="wifi" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="w-5 h-5 text-primary" />
              <Label>WiFi Network</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssid">Network Name (SSID)</Label>
              <Input
                id="ssid"
                placeholder="MyWiFi"
                value={wifiConfig.ssid}
                onChange={(e) => setWifiConfig({ ssid: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="WiFi password"
                value={wifiConfig.password}
                onChange={(e) => setWifiConfig({ password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select
                value={wifiConfig.encryption}
                onValueChange={(value: any) => setWifiConfig({ encryption: value })}
              >
                <SelectTrigger id="encryption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="hidden">Hidden Network</Label>
              <Switch
                id="hidden"
                checked={wifiConfig.hidden}
                onCheckedChange={(checked) => setWifiConfig({ hidden: checked })}
              />
            </div>
          </TabsContent>

          <TabsContent value="vcard" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <Label>Contact Information</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={vcardConfig.firstName}
                  onChange={(e) => setVcardConfig({ firstName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={vcardConfig.lastName}
                  onChange={(e) => setVcardConfig({ lastName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  value={vcardConfig.phone}
                  onChange={(e) => setVcardConfig({ phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={vcardConfig.email}
                  onChange={(e) => setVcardConfig({ email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Company Name"
                value={vcardConfig.organization}
                onChange={(e) => setVcardConfig({ organization: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={vcardConfig.website}
                onChange={(e) => setVcardConfig({ website: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}