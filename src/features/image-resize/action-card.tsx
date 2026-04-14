import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { useImageResizeStore } from "./store";

export function ImageResizeActionCard() {
  const files = useImageResizeStore((state) => state.files);
  const settings = useImageResizeStore((state) => state.settings);
  const isResizing = useImageResizeStore((state) => state.isResizing);
  const setIsResizing = useImageResizeStore((state) => state.setIsResizing);
  const setError = useImageResizeStore((state) => state.setError);

  const [success, setSuccess] = useState(false);

  const handleResize = async () => {
    if (files.length === 0) {
      setError("Please select at least one image to resize.");
      return;
    }

    setIsResizing(true);
    setError(null);
    setSuccess(false);

    try {
      // Dynamic import for browser-image-compression
      const imageCompression = await import('browser-image-compression');

      for (const imageFile of files) {
        // Calculate target dimensions
        let targetWidth = settings.width;
        let targetHeight = settings.height;

        if (settings.maintainAspectRatio) {
          const aspectRatio = imageFile.originalWidth / imageFile.originalHeight;
          if (targetWidth && !targetHeight) {
            targetHeight = Math.round(targetWidth / aspectRatio);
          } else if (targetHeight && !targetWidth) {
            targetWidth = Math.round(targetHeight * aspectRatio);
          } else if (targetWidth && targetHeight) {
            const targetAspectRatio = targetWidth / targetHeight;
            if (aspectRatio > targetAspectRatio) {
              targetHeight = Math.round(targetWidth / aspectRatio);
            } else {
              targetWidth = Math.round(targetHeight * aspectRatio);
            }
          }
        }

        // Use canvas to resize the image
        const img = new Image();
        img.src = imageFile.preview;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to blob
        let outputType = imageFile.file.type;
        if (settings.outputFormat !== 'original') {
          outputType = `image/${settings.outputFormat}`;
        }

        canvas.toBlob((blob) => {
          if (!blob) throw new Error('Failed to create blob');

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const ext = outputType.split('/')[1];
          link.download = `${imageFile.file.name.split('.')[0]}_resized.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, outputType, settings.quality);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("An error occurred while resizing images. Please try again.");
    } finally {
      setIsResizing(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Resize Images</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          Resize {files.length} image{files.length !== 1 ? 's' : ''} to {settings.width}×{settings.height}{settings.unit}.
        </p>
        {files.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {settings.maintainAspectRatio ? 'Aspect ratio will be maintained' : 'Custom dimensions'}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleResize}
          disabled={files.length === 0 || isResizing}
        >
          {isResizing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resizing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Resize & Download
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}