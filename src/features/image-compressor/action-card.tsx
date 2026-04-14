import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { useImageCompressorStore } from "./store";

export function ImageCompressorActionCard() {
  const files = useImageCompressorStore((state) => state.files);
  const settings = useImageCompressorStore((state) => state.settings);
  const isCompressing = useImageCompressorStore((state) => state.isCompressing);
  const setIsCompressing = useImageCompressorStore((state) => state.setIsCompressing);
  const setError = useImageCompressorStore((state) => state.setError);
  const updateCompressedSize = useImageCompressorStore((state) => state.updateCompressedSize);

  const [success, setSuccess] = useState(false);

  const handleCompress = async () => {
    if (files.length === 0) {
      setError("Please select at least one image to compress.");
      return;
    }

    setIsCompressing(true);
    setError(null);
    setSuccess(false);

    try {
      // Dynamic import for browser-image-compression
      const imageCompression = await import('browser-image-compression');

      for (const imageFile of files) {
        const options = {
          maxSizeMB: settings.targetSize ? settings.targetSize / 1024 : 10,
          maxWidthOrHeight: settings.maxWidth || settings.maxHeight || undefined,
          useWebWorker: true,
          fileType: settings.outputFormat === 'original' ? imageFile.file.type : `image/${settings.outputFormat}`,
          initialQuality: settings.quality,
        };

        const compressedFile = await imageCompression.default(imageFile.file, options);

        // Update compressed size
        updateCompressedSize(imageFile.id, compressedFile.size);

        // Download the compressed image
        const url = URL.createObjectURL(compressedFile);
        const link = document.createElement('a');
        link.href = url;
        const ext = compressedFile.type.split('/')[1];
        link.download = `${imageFile.file.name.split('.')[0]}_compressed.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("An error occurred while compressing images. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Compress Images</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          Compress {files.length} image{files.length !== 1 ? 's' : ''} to reduce file size while maintaining quality.
        </p>
        {files.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Target quality: {Math.round(settings.quality * 100)}%
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleCompress}
          disabled={files.length === 0 || isCompressing}
        >
          {isCompressing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compressing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Compress & Download
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}