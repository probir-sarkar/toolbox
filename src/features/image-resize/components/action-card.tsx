import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { useImageResizeContext } from "../context";
import { resizeImage, calculateTargetDimensions, downloadResult } from "../services/image-resize";

export function ImageResizeActionCard() {
  const { files, settings, isResizing, setIsResizing, setError } = useImageResizeContext();
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
      for (const imageFile of files) {
        const dimensions = calculateTargetDimensions(
          imageFile.originalWidth,
          imageFile.originalHeight,
          settings
        );

        let outputType = imageFile.file.type;
        if (settings.outputFormat !== 'original') {
          outputType = `image/${settings.outputFormat}`;
        }

        const result = await resizeImage(imageFile, {
          targetWidth: dimensions.width,
          targetHeight: dimensions.height,
          maintainAspectRatio: settings.maintainAspectRatio,
          quality: settings.quality,
          outputFormat: outputType,
        });

        downloadResult(result);
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
