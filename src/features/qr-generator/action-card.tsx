import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, RefreshCw } from "lucide-react";
import { useQRGeneratorStore } from "./store";

export function QRGeneratorActionCard() {
  const qrCodeUrl = useQRGeneratorStore((state) => state.qrCodeUrl);
  const isGenerating = useQRGeneratorStore((state) => state.isGenerating);
  const error = useQRGeneratorStore((state) => state.error);
  const settings = useQRGeneratorStore((state) => state.settings);
  const generateQRCode = useQRGeneratorStore((state) => state.generateQRCode);
  const reset = useQRGeneratorStore((state) => state.reset);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = () => {
    generateQRCode();
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {qrCodeUrl && (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-lg border-2 border-border">
              <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                style={{ width: `${Math.min(settings.size, 300)}px`, height: `${Math.min(settings.size, 300)}px` }}
                className="block"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Your QR code is ready! Click download to save it.
            </p>
          </div>
        )}

        {!qrCodeUrl && !isGenerating && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Enter your content and click generate to create your QR code.
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Generating QR code...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                {qrCodeUrl ? 'Regenerate' : 'Generate'}
              </>
            )}
          </Button>

          {qrCodeUrl && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {qrCodeUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="w-full"
          >
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}